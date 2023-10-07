export async function stripeWebhook(req) {    const event = req.body;

    if (event.type === 'checkout.session.completed') {
        const paymentIntent = event.data.object;
        const user_id =paymentIntent.metadata.user_id;

        return user_id;
    }
}