import express from "express";
import Stripe from "stripe";
import cors from 'cors'
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors())
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
app.use(express.json());

app.post("/create-checkout-session", async (req, res) => {
    try {
        const { items, totalPrice } = req.body;

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: items.map((item) => ({
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.title,
                        images: [item.image],
                    },
                    unit_amount: Math.round(item.price * 100), // Stripe uses cents
                },
                quantity: item.quantity,
            })),
            mode: "payment",
            success_url: "http://localhost:5173/success",
            cancel_url: "http://localhost:5173/cancel",
        });

        res.json({ id: session.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));
