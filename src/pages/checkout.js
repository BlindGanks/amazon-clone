import { useSession } from "next-auth/react";
import Image from "next/image";
import { useSelector } from "react-redux";
import CheckoutProduct from "../components/CheckoutProduct";
import Header from "../components/Header";
import { selectItems, selectTotal } from "../slices/basketSlice";
import { loadStripe } from "@stripe/stripe-js";
const axios = require("axios");

function checkout() {
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);
  const currencyFormatter = require("currency-formatter");
  const { data: session } = useSession();
  const stripePromise = loadStripe(process.env.stripe_public_key);

  const createCheckoutSession = async () => {
    const stripe = await stripePromise;

    //call the backend to create a checkout session
    const checkoutSession = await axios.post("/api/create-checkout-session", {
      items,
      email: session.user.email,
    });
    //redirect user to stripe checkout
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    if (result.error) alert(result.error.message);
  };
  return (
    <div className="bg-gray-100">
      <Header />
      <main className="lg:flex max-w-screen-2xl mx-auto">
        {/*left */}
        <div className="flex-grow m-5 shadow-sm">
          <Image
            objectFit="contain"
            width={1020}
            height={250}
            src={
              "https://www.junglescout.com/wp-content/uploads/2020/05/Prime-day-banner.png"
            }
          />
          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">
              {items.length === 0
                ? "Your Amazon Basket is empty"
                : "Shopping Basket"}
            </h1>
            {items.map((item, i) => (
              <CheckoutProduct
                key={item.id}
                id={item.id}
                title={item.title}
                price={item.price}
                hasPrime={item.hasPrime}
                rating={item.rating}
                category={item.category}
                description={item.description}
                image={item.image}
              />
            ))}
          </div>
        </div>
        {/*right */}
        <div className="flex flex-col bg-white p-10 shadow-md">
          {items.length > 0 && (
            <>
              <h2 className="whitespace-nowrap">
                Subtotal {items.length} items:{" "}
                <span className="font-bold">
                  {currencyFormatter.format(total, { code: "USD" })}
                </span>
              </h2>
              <button
                role="link"
                onClick={createCheckoutSession}
                disabled={!session}
                className={`button mt-2 ${
                  !session &&
                  "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"
                }`}
              >
                {!session ? "Sign in to checkout" : "Proceed to checkout"}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default checkout;
