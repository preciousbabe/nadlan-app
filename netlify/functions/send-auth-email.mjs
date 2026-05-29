import { Resend } from 'resend'
import { createClient } from '@supabase/supabase-js'

const SITE_URL = 'https://starlit-crepe-92496b.netlify.app'

export async function handler(event) {
  console.log('FUNCTION STARTED')

  try {
    // Only allow POST
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Method not allowed' })
      }
    }

    // Check env vars safely INSIDE handler
    if (!process.env.SUPABASE_URL) throw new Error('SUPABASE_URL missing')
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) throw new Error('SUPABASE_SERVICE_ROLE_KEY missing')
    if (!process.env.RESEND_API_KEY) throw new Error('RESEND_API_KEY missing')

    const resend = new Resend(process.env.RESEND_API_KEY)

    // 🔥 IMPORTANT: NO realtime, no extras
    const supabaseAdmin = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
          detectSessionInUrl: false
        }
      }
    )

    const {
      email,
      password,
      fullName,
      username,
      type
    } = JSON.parse(event.body)

    if (type !== 'signup') {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Only signup supported' })
      }
    }

    // 1. Create user
    const { data: authData, error: authError } =
      await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: false,
        user_metadata: {
          full_name: fullName,
          username
        }
      })

    if (authError) throw authError

    const userId = authData.user.id

    // 2. Create profile
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .insert({
        id: userId,
        full_name: fullName,
        username,
        kyc_status: 'unverified'
      })

    if (profileError) throw profileError

    // 3. Generate link
    const { data: linkData, error: linkError } =
      await supabaseAdmin.auth.admin.generateLink({
        type: 'signup',
        email,
        options: {
          redirectTo: `${SITE_URL}/auth/confirm`
        }
      })

    if (linkError) throw linkError

    const confirmationUrl = linkData?.properties?.action_link
    if (!confirmationUrl) throw new Error('No confirmation link generated')

    // 4. Email
    const html = `
      <h2>Welcome to NADLAN</h2>
      <p>Hi ${fullName || 'Investor'},</p>
      <p>Please confirm your account:</p>
      <a href="${confirmationUrl}">Confirm Email</a>
    `

    // 5. Send email
    const { error: emailError } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Confirm your NADLAN account',
      html
    })

    if (emailError) throw emailError

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        success: true,
        userId
      })
    }

  } catch (err) {
    console.error('FUNCTION ERROR:', err)

    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error: err.message || 'Something went wrong'
      })
    }
  }
}