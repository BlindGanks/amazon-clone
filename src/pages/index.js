import Head from "next/head";
import Banner from "../components/Banner";
import Header from "../components/Header";
import ProductFeed from "../components/ProductFeed";

export default function Home({ products }) {
  return (
    <div className="bg-gray-100 ">
      <Head>
        <title>Amazon Clone</title>
        <link
          rel="icon"
          href="https://i1.wp.com/business-ethics.com/wp-content/uploads/2015/11/Amazon-Logo_Feature.jpg?resize=400%2C430&ssl=1"
        />
      </Head>

      <Header />
      <main className="max-w-screen-2xl mx-auto">
        {/* banner*/}
        <Banner />
        {/* feed*/}
        <ProductFeed products={products} />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const products = await fetch("https://fakestoreapi.com/products").then(
    (res) => res.json()
  );

  return {
    props: {
      products,
    },
  };
}
