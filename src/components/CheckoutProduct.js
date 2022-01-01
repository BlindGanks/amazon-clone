import { StarIcon } from "@heroicons/react/solid";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { addToBasket, removeFromBasket } from "../slices/basketSlice";

function CheckoutProduct({
  id,
  title,
  price,
  hasPrime,
  rating,
  category,
  description,
  image,
}) {
  const currencyFormatter = require("currency-formatter");
  const dispatch = useDispatch();

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
    //add item to basket slice
    dispatch(addToBasket(product));
  };
  const removeItemFromBasket = () => {
    //remove item from basket slice
    dispatch(removeFromBasket({ id }));
  };

  return (
    <div className="grid grid-cols-5">
      <Image src={image} height={200} width={200} objectFit="contain" />

      <div className="col-span-3 mx-5">
        <p>{title}</p>
        <div className="flex">
          {Array(Math.round(rating.rate))
            .fill()
            .map((_, i) => (
              <StarIcon key={i} className="h-5 text-yellow-500" />
            ))}
        </div>
        <p className="text-xs my-2 line-clamp-3">{description}</p>
        {currencyFormatter.format(price, { code: "USD" })}
        {hasPrime && (
          <div className="flex items-center space-x-2">
            <img
              loading="lazy"
              className="w-12"
              src="https://whitebox.com/wp-content/uploads/2020/05/Prime-tag-.png"
              alt=""
            />
            <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
          </div>
        )}
      </div>
      <div className="flex flex-col space-y-2 my-auto justify-self-end">
        <button onClick={addItemToBasket} className="button">
          Add to Basket
        </button>
        <button onClick={removeItemFromBasket} className="button">
          Remove from Basket
        </button>
      </div>
    </div>
  );
}

export default CheckoutProduct;
