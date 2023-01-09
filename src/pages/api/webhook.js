import { buffer } from "micro";
import { Timestamp } from "firebase-admin/firestore";
import adminFirestore from "../../libs/firebase/firebaseAdmin";

// establish connection to stripe
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

const fulfillOrder = async (session) => {
  const docRef = adminFirestore
    .collection("users")
    .doc(session.metadata.email)
    .collection("orders")
    .doc(session.id);
  try {
    const doc = await docRef.set({
      amount: session.amount_total / 100,
      amount_shipping: session.total_details.amount_shipping / 100,
      images: JSON.parse(session.metadata.images),
      timestamp: Timestamp.now(),
    });
    return { doc, error: null, fulfilled: true };
  } catch (err) {
    return { error: err.message, doc: null, fulfilled: false };
  }
};
export default async (req, res) => {
  if (req.method === "POST") {
    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toString();
    const sig = req.headers["stripe-signature"];

    let event;
    // verify that the event posted came from stripe
    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err) {
      console.log("ERROR", err.message);
      return res.status(400).send(`webhook error: ${err.message}`);
    }
    res.status(200).send("webhook call recaived, proceeds to fulfill order");
    // handle the checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      // fulfill order...

      const order = await fulfillOrder(session);
    }
  }
};

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
