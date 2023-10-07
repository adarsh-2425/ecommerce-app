// stripe.service.ts

import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  public readonly stripe: Stripe;

  constructor() {
    // Initialize Stripe with your secret key
    this.stripe = new Stripe('your_secret_key_here', {
      apiVersion: "2023-08-16", // Use the API version you prefer
    });
  }

  // Add methods for handling Stripe functionality here
}
