import Stripe from "stripe";

const secretKey = process.env.STRIPE_SECRET_KEY;

if (!secretKey) {
  throw new Error("Stripe secret is not found");
}

const stripe = new Stripe(secretKey, { apiVersion: "2025-02-24.acacia" });

export default stripe;
