import { Resend } from 'resend'
import { createClient } from '@supabase/supabase-js'
import ws from 'ws'

const SITE_URL = 'https://starlit-crepe-92496b.netlify.app'

export async function handler(event) {
  try {
    // Only POST
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: 'Method not allowed' })
      }
    }

    // ENV CHECKS
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

    // ✅ FIXED SUPABASE CLIENT (Node 20 + Netlify safe)
    const supabaseAdmin = createClient(SUPABASE_URL, SERVICE_ROLE, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false
      },
      realtime: {
        transport: ws
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

   const html = `
<div style="
  background:#ffffff;
  padding:40px 20px;
  font-family:Arial, Helvetica, sans-serif;
  color:#000000;
">

  <div style="
    max-width:600px;
    margin:0 auto;
  ">

    <h2 style="
      margin-top:0;
      color:#000000;
      font-size:28px;
      font-weight:700;
    ">
      Welcome to NADLAN
    </h2>

    <p style="
      font-size:16px;
      line-height:1.7;
      color:#000000;
    ">
      Hi ${fullName},
    </p>

    <p style="
      font-size:16px;
      line-height:1.7;
      color:#000000;
    ">
      Thank you for creating your NADLAN investment account.
      To activate your account and start building your real estate portfolio,
      please confirm your email address.
    </p>

    <p style="
      font-size:16px;
      line-height:1.7;
      color:#000000;
    ">
      <a
        href="${confirmationUrl}"
        style="
          color:#000000;
          text-decoration:underline;
          font-weight:600;
        "
      >
        Confirm Email Address
      </a>
    </p>

    <p style="
      color:#000000;
      line-height:1.7;
      margin-top:30px;
    ">
      Or copy and paste this link into your browser:
    </p>

    <div style="margin:30px 0;"> <a href="${confirmationUrl}" style=" background:linear-gradient(135deg,#C9A962,#B8954E); color:#0a0a0a; padding:14px 32px; text-decoration:none; border-radius:10px; font-weight:600; display:inline-block; font-size:15px; " > Confirm Email Address </a> </div>

    <p style="
      color:#000000;
      font-size:13px;
      margin-top:30px;
      line-height:1.6;
    ">
      This link expires in 24 hours. If you didn't create an account with
      NADLAN, you can safely ignore this email.
    </p>

    <hr style="
      border:none;
      border-top:1px solid #dddddd;
      margin:30px 0;
    ">

    <p style="
      color:#000000;
      font-size:12px;
      line-height:1.8;
      margin-bottom:0;
    ">
      <strong>
        NADLAN Investment Limited
      </strong>
      <br>
      Real Estate & Green Energy Investment Platform
      <br>
      📧 support@nadlan.com | 🌐 www.nadlan.com
    </p>

  </div>

</div>
`

    // 5. Send email
    const { error: emailError } = await resend.emails.send({
      from: 'NADLAN <no-reply@precifio.app>',
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