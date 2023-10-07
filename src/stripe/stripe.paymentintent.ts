const stripe = require('stripe')('sk_test_51NgIfeSEO7NjiusZ1PSCGKyDOKPV0IgRztKmEoOis0qyopSgPKFgKss6c5AcrkSgPYfdwhrNYgzIWJcA3dgX3h5I00Q2dsAjvs')

export async function createPaymentLink(cartId: string, totalAmount: number): Promise<string> {
  
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'inr',
            unit_amount: totalAmount * 100,
            product_data: {
              name: 'Checkout for Ecommerce app by Adam Tech'
            }
          },
          quantity: 1
        }
      ],
      metadata: {
        cartId: cartId
      },
      mode: 'payment',
      success_url: 'https://yourwebsite.com/success',
      cancel_url: 'https://yourwebsite.com/cancel'
    });
  
    return session.url;
  }