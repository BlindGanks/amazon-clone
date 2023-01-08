import { FieldValue } from "firebase/firestore";
import { buffer } from "micro";
import admin from "../../libs/firebase/firebaseAdmin";

// establish connection to stripe
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

const fulfillOrder = async (session) => {
  const db = admin.firestore();
  const docRef = db
    .collection("users")
    .doc(session.metadata.email)
    .collection("orders")
    .doc(session.id);
  return docRef.set({
    amount: session.amount_total / 100,
    amount_shipping: session.total_details.amount_shipping / 100,
    images: JSON.parse(session.metadata.images),
    timestamp: FieldValue.serverTimestamp(),
  });
};
export default async (req, res) => {
  if (req.method === "POST") {
    if (!admin.apps) {
      res
        .status(500)
        .send({ success: false, error: "firebase sdk not Initialized" });
      return;
    }
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

    // handle the checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      // fulfill order...

      return fulfillOrder(session)
        .then(() => res.status(200))
        .catch((err) => res.status(400));
    }
  }
};

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
