import Product from "./Product";

function ProductFeed({ products }) {
  return (
    <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto">
      {products &&
        products
          .slice(0, 4)
          .map(({ title, image, price, id, description, category, rating }) => (
            <Product
              id={id}
              title={title}
              image={image}
              price={price}
              description={description}
              category={category}
              key={id}
              rating={rating}
            />
          ))}
      <img
        className="md:col-span-full"
        src="https://images-eu.ssl-images-amazon.com/images/G/02/SBP/2018/gateway/1110572_smb_gw_desktop_1500x300_lavolio_1x_uk._CB484123630_.jpg"
        alt=""
      />
      <div className="md:col-span-2">
        {products &&
          products
            .slice(4, 5)
            .map(
              ({ title, image, price, id, description, category, rating }) => (
                <Product
                  id={title}
                  title={title}
                  image={image}
                  price={price}
                  description={description}
                  category={category}
                  key={id}
                  rating={rating}
                />
              )
            )}
      </div>
      {products &&
        products
          .slice(5, products.length)
          .map(({ title, image, price, id, description, category, rating }) => (
            <Product
              id={title}
              title={title}
              image={image}
              price={price}
              description={description}
              category={category}
              key={id}
              rating={rating}
            />
          ))}
    </div>
  );
}

export default ProductFeed;
