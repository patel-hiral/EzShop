import React from "react";
import CartItem from "@/components/CartItem";
import { useSelector } from "react-redux";
function Cart() {

  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="flex gap-20 p-4">
      <div className="flex-1 p-2 border border-secondary rounded shadow">
        {cartItems.map((item) => {
          return <CartItem item={item} key={item.id} />;
        })}
      </div>
      <div className="w-96 ">
        <div className="border p-4 rounded shadow">
          <h1 className="text-xl pb-3 border-b border-secondary">
            Price Details
          </h1>
          <p className="text-sm py-2">
            {" "}
            <span className="text-green-700 font-semibold">
              $ {totalPrice}
            </span>{" "}
            ({cartItems.length} Items)
          </p>
        </div>
      </div>
    </div>
  );
}

export default Cart;
