import { Resend } from 'resend'
import { createClient } from '@supabase/supabase-js'

const SITE_URL = 'https://starlit-crepe-92496b.netlify.app'

export async function handler(event, context) {

  console.log('SUPABASE_URL:', process.env.SUPABASE_URL)
console.log('SUPABASE_URL exists?', !!process.env.SUPABASE_URL)
console.log('SERVICE_ROLE exists?', !!process.env.SUPABASE_SERVICE_ROLE_KEY)
console.log('RESEND exists?', !!process.env.RESEND_API_KEY)

if (!process.env.SUPABASE_URL) {
  return {
    statusCode: 500,
    body: JSON.stringify({
      error: 'SUPABASE_URL missing'
    })
  }
}

if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  return {
    statusCode: 500,
    body: JSON.stringify({
      error: 'SUPABASE_SERVICE_ROLE_KEY missing'
    })
  }
}

if (!process.env.RESEND_API_KEY) {
  return {
    statusCode: 500,
    body: JSON.stringify({
      error: 'RESEND_API_KEY missing'
    })
  }
}

const resend = new Resend(process.env.RESEND_API_KEY)

const supabaseAdmin = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    realtime: {
      enabled: false
    }
  }
)

  // Allow only POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        error: 'Method not allowed'
      })
    }
  }

  try {

    const {
      email,
      password,
      fullName,
      username,
      type
    } = JSON.parse(event.body)

    // Ensure request type is signup
    if (type !== 'signup') {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          error: 'Only signup supported'
        })
      }
    }

    // 1. Create user in Supabase Auth
    const {
      data: authData,
      error: authError
    } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: false,
      user_metadata: {
        full_name: fullName,
        username
      }
    })

    if (authError) {
      throw authError
    }

    const userId = authData.user.id

    // 2. Create profile row
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .insert({
        id: userId,
        full_name: fullName,
        username,
        kyc_status: 'unverified'
      })

    if (profileError) {
      throw profileError
    }

    // 3. Generate confirmation link
    const {
      data: linkData,
      error: linkError
    } = await supabaseAdmin.auth.admin.generateLink({
      type: 'signup',
      email,
      options: {
        redirectTo: `${SITE_URL}/auth/confirm`
      }
    })

    if (linkError) {
      throw linkError
    }

    // Supabase generated action link
    const confirmationUrl =
      linkData.properties?.action_link

    if (!confirmationUrl) {
      throw new Error('Failed to generate confirmation link')
    }

    // 4. Email template
    const html = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Welcome to NADLAN</title>

<style>
body{
  margin:0;
  padding:0;
  background:#0a0a0a;
  font-family:'Segoe UI',system-ui,sans-serif;
}

.container{
  max-width:600px;
  margin:0 auto;
  padding:40px 24px;
  color:#e0e0e0;
}

h2{
  color:#C9A962;
  font-size:24px;
  margin-bottom:8px;
}

.subtitle{
  color:#888;
  font-size:14px;
  margin-bottom:24px;
}

p{
  line-height:1.6;
  color:#ccc;
}

.button-wrap{
  margin:30px 0;
  text-align:center;
}

.btn{
  background:linear-gradient(135deg,#C9A962,#B8954E);
  color:#0a0a0a;
  padding:14px 32px;
  text-decoration:none;
  border-radius:10px;
  font-weight:600;
  display:inline-block;
  font-size:15px;
}

.url-box{
  background:rgba(201,169,98,0.08);
  border:1px solid rgba(201,169,98,0.2);
  border-radius:8px;
  padding:12px;
  word-break:break-all;
  color:#C9A962;
  font-size:13px;
  margin:12px 0;
}

.footer{
  color:#666;
  font-size:12px;
  margin-top:40px;
  padding-top:24px;
  border-top:1px solid rgba(255,255,255,0.08);
}

.footer strong{
  color:#888;
}
</style>
</head>

<body>

<div class="container">

<h2>Welcome to NADLAN</h2>

<p class="subtitle">
Real Estate & Green Energy Investment Platform
</p>

<p>
Hi ${fullName || 'Investor'},
</p>

<p>
Thank you for creating your NADLAN investment account.
To activate your account and start building your
real estate portfolio, please confirm your email address.
</p>

<div class="button-wrap">
<a href="${confirmationUrl}" class="btn">
Confirm Email Address
</a>
</div>

<p style="font-size:13px;color:#888;">
Or copy and paste this link into your browser:
</p>

<div class="url-box">
${confirmationUrl}
</div>

<p style="color:#666;font-size:13px;margin-top:30px;">
This link expires in 24 hours.
If you didn't create an account with NADLAN,
you can safely ignore this email.
</p>

<div class="footer">
<strong>NADLAN Investment Limited</strong><br>
Real Estate & Green Energy Investment Platform
</div>

</div>

</body>
</html>
`.trim()

    // 5. Send email using Resend
    const { error: emailError } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Confirm your NADLAN account',
      html
    })

    if (emailError) {
      throw emailError
    }

    // Success response
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: true,
        userId
      })
    }

  } catch (err) {

    console.error('Signup error:', err)

    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        error: err.message || 'Something went wrong'
      })
    }
  }
}