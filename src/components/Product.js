import Image from "next/image";
import { useState } from "react";
import { StarIcon } from "@heroicons/react/solid";
import { addToBasket } from "../slices/basketSlice";
import { useDispatch } from "react-redux";

function Product({ title, image, price, id, description, category, rating }) {
  const dispatch = useDispatch();
  const [hasPrime] = useState(Math.random() < 0.5);
  const currencyFormatter = require("currency-formatter");

  const addItemToBasket = () => {
    const product = {
      title,
      image,
      price,
      id,
      description,
      category,
      rating,
      hasPrime,
    };
    //sending product to basket slice
    dispatch(addToBasket(product));
  };
  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10">
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">
        {category}
      </p>
      <Image width={200} height={200} objectFit="contain" src={image} />
      <h4 className="my-3">{title}</h4>
      <div className="flex">
        {Array(Math.round(rating.rate))
          .fill()
          .map((_, i) => (
            <StarIcon className="h-5 text-yellow-500" />
          ))}
      </div>
      <p className="text-xs my-2 line-clamp-2">{description}</p>
      <div className="mb-5">
        {currencyFormatter.format(price, { code: "USD" })}
      </div>
      {hasPrime && (
        <div className="flex items-center space-x-2 -mt-5">
          <img
            className="w-12"
            src="https://whitebox.com/wp-content/uploads/2020/05/Prime-tag-.png"
            alt=""
          />
          <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
        </div>
      )}
      <button onClick={addItemToBasket} className="mt-auto button">
        Add to Basket
      </button>
    </div>
  );
}

export default Product;
