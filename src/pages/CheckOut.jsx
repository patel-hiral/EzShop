import CartItem from "@/components/CartItem";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "@/store/slices/cartSlice";
import { addOrder } from "@/store/slices/orderSlice";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

function CheckOut() {
    const [isOpen, setIsOpen] = React.useState(false);
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const { toast } = useToast();

    useEffect(() => {
        if (cartItems.length <= 0) {

            navigate("/products");
            toast({
                title: "No Products in cart",
                description: "Please Add Some Products to continue...",
            });
        }
    }, [cartItems]);

    function handleOrder() {
        dispatch(addOrder({ items: cartItems }));
        toast({
            title: "Order Placed",
            description: "Your order has been placed successfully!",
        });
        dispatch(clearCart())
        setIsOpen(false);
        navigate("/products");
    }
    return (
        <div className="px-4">
            {cartItems.map((item) => {
                return <CartItem item={item} key={item.id} />;
            })}
            <div className="py-2 flex items-center justify-between">
                <p>
                    Total: $
                    {cartItems
                        .reduce((total, item) => total + item.price * item.quantity, 0)
                        .toFixed(2)}
                </p>
                <Button onClick={() => { setIsOpen((prev) => !prev) }}>Confirm Order</Button>
            </div>
            <AlertDialog open={isOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This Confirm Order will place your order.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => { setIsOpen((prev) => !prev) }}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleOrder}>Confirm</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>


    );
}

export default CheckOut;
