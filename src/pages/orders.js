import { collection, getDocs, orderBy, query } from "firebase/firestore";
import moment from "moment";
import { getSession, useSession } from "next-auth/react";
import React from "react";
import db from "../../firebase";
import Header from "../components/Header";
import Order from "../components/Order";

function orders({ orders }) {
  const { data: session } = useSession();
  console.log(orders);
  return (
    <div className="">
      <Header />
      <main className="max-w-screen-lg mx-auto p-10">
        <h1 className="text-3xl border-b mb-2 pt-1 border-yellow-400">
          Your Orders
        </h1>
        {session ? (
          <h2>{orders.length} orders</h2>
        ) : (
          <h2>Please sign in to see your orders</h2>
        )}
        <div className="mt-5 space-y-4">
          {orders?.map((order) => (
            <Order key={order.id} order={order} />
          ))}
        </div>
      </main>
    </div>
  );
}

export default orders;

export async function getServerSideProps(context) {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

  // get the users logged in credentials
  const session = await getSession(context);
  if (!session) {
    return {
      props: {},
    };
  }

  const ordersRef = query(
    collection(db, `users/${session.user.email}/orders`),
    orderBy("timestamp", "desc")
  );
  const stripeOrders = await getDocs(ordersRef);

  const orders = await Promise.all(
    stripeOrders.docs.map(async (order) => ({
      id: order.id,
      amount: order.data().amount,
      amountShipping: order.data().amount_shipping,
      images: order.data().images,
      timestamp: moment(order.data().timestamp.toDate()).unix(),
      items: (
        await stripe.checkout.sessions.listLineItems(order.id, {
          limit: 100,
        })
      ).data,
    }))
  );
  return { props: { orders } };
}
