import moment from "moment";
import React from "react";

function Order({ order }) {
  const { id, amount, amountShipping, images, items, timestamp } = order;
  const currencyFormatter = require("currency-formatter");

  return (
    <div className="relative border rounded-md">
      <div className="flex items-center space-x-10 p-5 bg-gray-100 text-sm text-gray600">
        <div>
          <p className="font-bold text-sm">ORDER PLACED</p>
          <p>{moment.unix(timestamp).format("DD MMM YYYY")}</p>
        </div>
        <div>
          <p className="text-xs font-bold">TOTAL</p>
          <p>
            {currencyFormatter.format(amount, { code: "USD" })} - Next Day
            Delivery{""}
            {currencyFormatter.format(amountShipping, { code: "USD" })}
          </p>
        </div>
        <p className="text-sm whitespace-nowrap sm:text-xl self-end flex-1 text-right text-blue-500">
          {items.length} items
        </p>
        <p className="absolute top-2 right-2 w-40 lg:w-72 truncate text-xs whitespace-nowrap">
          ORDER # {id}
        </p>
      </div>
      <div className="p-5 sm:p-10">
        <div className="flex space-x-6 overflow-x-auto">
          {images.map((img) => (
            <img src={img} className="h-20 object-contain sm:h-32" alt="" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Order;
