
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import Stripe from "https://esm.sh/stripe@12.18.0?target=deno"

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
    const STRIPE_SECRET_KEY = Deno.env.get('STRIPE_SECRET_KEY')
    if (!STRIPE_SECRET_KEY) {
      console.error('STRIPE_SECRET_KEY is not set in environment variables')
      throw new Error('Payment service is not configured properly. STRIPE_SECRET_KEY is missing.')
    }

    // Parse request body
    let requestData
    try {
      requestData = await req.json()
      console.log('Received payment request:', JSON.stringify(requestData))
    } catch (e) {
      console.error('Error parsing request JSON:', e)
      return new Response(
        JSON.stringify({ error: 'Invalid request body. Expected JSON.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    const { amount, currency, description, successUrl, cancelUrl, metadata, paymentType } = requestData

    // Validate required fields
    if (!amount || !currency || !successUrl || !cancelUrl) {
      console.error('Missing required fields:', { amount, currency, successUrl, cancelUrl })
      return new Response(
        JSON.stringify({ error: 'Missing required fields: amount, currency, successUrl, and cancelUrl are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    console.log(`Creating payment session for ${amount} ${currency} - ${description}`)

    // Initialize Stripe
    const stripe = new Stripe(STRIPE_SECRET_KEY, {
      apiVersion: '2022-11-15',
    })

    // Handle wallet payment (direct registration without Stripe)
    if (paymentType === 'wallet') {
      console.log("Processing wallet payment directly");
      
      // In a real app, you would deduct from user's wallet balance here
      // For this demo, we're just returning a success response
      
      return new Response(
        JSON.stringify({ 
          id: `wallet_payment_${Date.now()}`, 
          success: true,
          paymentType: 'wallet',
          message: 'Wallet payment processed successfully' 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }
    
    // Create a Stripe Checkout Session for card/external payments
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: currency,
            product_data: {
              name: description || 'Tournament Entry',
            },
            unit_amount: amount, // Amount in cents/paisa
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: metadata || {},
    })

    console.log("Payment session created successfully:", session.id)
    
    return new Response(
      JSON.stringify({ id: session.id, url: session.url }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error in create-payment function:', error)
    return new Response(
      JSON.stringify({ error: error.message || 'An unexpected error occurred' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
