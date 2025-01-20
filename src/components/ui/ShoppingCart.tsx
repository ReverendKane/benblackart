import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function ShoppingCart() {
  const [numItems, setNumItems] = useState(0);
  return (
    <div className="relative inline-block">
      <div className="relative flex items-center justify-center w-10 h-10">
        {/* Cart Icon as an Image */}
        <img
          src="/svg/shoppingCart.svg" // Replace this with the correct path to your cart image
          alt="Cart"
          className="w-8 h-8"
        />
        {numItems > 0 ? (
          <div
            id="itemCount"
            className="absolute -top-1 -right-2 w-5 h-5 bg-red-500 text-white text-xs font-bold flex items-center justify-center rounded-full border border-white"
          >
            {numItems}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
