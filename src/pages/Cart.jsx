import React from "react";
import CartItem from "@/components/CartItem";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
function Cart() {

  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  
  const discountedPrice = cartItems
    .reduce(
      (sum, item) =>
        sum + (item.price - item.discountPercentage * item.quantity) / 100,
      0
    )
    .toFixed(2);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const actualPrice = (totalPrice - discountedPrice).toFixed(2);

  function handleCheckOut() {
    navigate("/react-store/checkout");
  }

  if (cartItems.length === 0) {
    return (
      <div className="">
        <p className="text-gray-300 text-center text-lg">No items in cart.</p>
        <div className="w-fit mx-auto"><Button variant="link" className="text-center">
          <NavLink to="/products">Continue Shopping</NavLink>
        </Button></div>
      </div>
    );
  }

  return (
    <div className="flex-col md:flex-row flex gap-20 p-4">
      <div className="flex-1 p-2 border border-secondary rounded shadow">
        {cartItems.map((item) => {
          return <CartItem item={item} key={item.id} />;
        })}
      </div>

      <div className="w-full md:w-96 ">
        <div className="p-4 border border-secondary rounded shadow">
          <h1 className="text-base font-bold pb-3 border-b border-secondary uppercase">
            Price Details
          </h1>

          <p className="text-sm py-2 flex justify-between items-center">
            <span className="font-semibold">
              Price ({cartItems.length}{" "}
              {cartItems.length > 1 ? "Items" : "Item"})
            </span>
            <span className="font-semibold">
              $
              {totalPrice.toFixed(2)}
            </span>
          </p>
          <p className="text-sm py-2 flex justify-between items-center">
            <span className="font-semibold">Discount</span>
            <span className="text-green-700 font-semibold"> - ${discountedPrice}</span>
          </p>
          <p className="text-sm py-2 flex justify-between items-center">
            <span className="font-semibold">Total Amount</span>
            <span className="text-green-700 font-semibold"> ${actualPrice}</span>
          </p>
          <span className="text-green-700 py-2 text-sm font-semibold">
            You will save ${discountedPrice} on this order
          </span>
          <div>
            <Button onClick={handleCheckOut} className="my-2">
              Place Order
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
