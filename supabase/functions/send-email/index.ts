
import { serve } from "https://deno.land/std@0.190.0/http/server.ts"
import { Resend } from "npm:resend@2.0.0"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not set in the environment variables')
    }

    const resend = new Resend(RESEND_API_KEY)
    const { to, subject, templateName, templateData } = await req.json()

    if (!to || !subject || !templateName) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: to, subject, and templateName are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Email templates based on templateName
    let htmlContent = ''
    
    if (templateName === 'tournament-invite') {
      const { tournamentName, startDate, inviteLink } = templateData || {}
      htmlContent = `
        <h1>You're Invited to ${tournamentName || 'a Tournament'}!</h1>
        <p>You've been invited to participate in a gaming tournament.</p>
        <p><strong>Start Date:</strong> ${startDate || 'TBD'}</p>
        <p><a href="${inviteLink || '#'}">Click here to join the tournament</a></p>
        <p>Good luck!</p>
        <p>Battle Mitra Team</p>
      `
    } else if (templateName === 'match-reminder') {
      const { matchName, matchTime, opponentName } = templateData || {}
      htmlContent = `
        <h1>Your Match is Starting Soon!</h1>
        <p>This is a reminder for your upcoming match: ${matchName || 'Upcoming Match'}</p>
        <p><strong>Time:</strong> ${matchTime || 'Soon'}</p>
        <p><strong>Opponent:</strong> ${opponentName || 'TBD'}</p>
        <p>Good luck!</p>
        <p>Battle Mitra Team</p>
      `
    } else {
      // Default template
      htmlContent = `
        <h1>${subject}</h1>
        <p>${templateData?.message || 'Thank you for using Battle Mitra!'}</p>
        <p>Battle Mitra Team</p>
      `
    }

    const emailResponse = await resend.emails.send({
      from: 'Battle Mitra <no-reply@resend.dev>',
      to: [to],
      subject: subject,
      html: htmlContent,
    })

    console.log('Email sent successfully:', emailResponse)

    return new Response(
      JSON.stringify(emailResponse),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error in send-email function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
