import express from "express"
import { isAuthenticated } from "../middlewares/isAuthenticated";
import { createCheckoutSession, getOrders, stripeWebhook } from "../controller/order.controller";
const router = express.Router();
// http://localhost:8000/api/v1/order

router.route("/").get(isAuthenticated, getOrders);
router.route("/checkout/create-checkout-session").post(isAuthenticated, createCheckoutSession);
router.route("/webhook").post(express.raw({ type: 'application/json' }), stripeWebhook);

export default router;

// http://localhost:8000/api/v1/order/webhook
