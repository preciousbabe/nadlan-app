import { Resend } from 'resend'
import { createClient } from '@supabase/supabase-js'

const SITE_URL = 'https://starlit-crepe-92496b.netlify.app'

export async function handler(event) {
  try {
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: 'Method not allowed' })
      }
    }

    const SUPABASE_URL = process.env.SUPABASE_URL
    const SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY
    const RESEND_KEY = process.env.RESEND_API_KEY

    if (!SUPABASE_URL || !SERVICE_ROLE || !RESEND_KEY) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Missing environment variables' })
      }
    }

    const resend = new Resend(RESEND_KEY)

   const supabaseAdmin = createClient(SUPABASE_URL, SERVICE_ROLE, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false
  },
  realtime: {
    enabled: false   
  }
})

    const { email, password, fullName, username, type } =
      JSON.parse(event.body)

    if (type !== 'signup') {
      return {
        statusCode: 400,
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

    // 2. Create profile (SAFE UPSERT - NO DUPLICATES EVER)
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .upsert(
        {
          id: userId,
          full_name: fullName,
          username,
          kyc_status: 'unverified',
          profile_completed: false
        },
        {
          onConflict: 'id'
        }
      )

    if (profileError) throw profileError

    // 3. Generate confirmation link
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

    if (!confirmationUrl) {
      throw new Error('Missing confirmation URL')
    }

    // 4. Email HTML
    const html = `
      <h2>Welcome ${fullName}</h2>
      <p>Please confirm your email address to activate your account.</p>
      <a href="${confirmationUrl}">Confirm Account</a>
    `

    // 5. Send email
    const { error: emailError } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Confirm your account',
      html
    })

    if (emailError) throw emailError

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        userId
      })
    }

  } catch (err) {
    console.error('Function error:', err)

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: err.message
      })
    }
  }
}