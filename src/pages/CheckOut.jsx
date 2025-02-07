import CartItem from "@/components/CartItem";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
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
} from "@/components/ui/alert-dialog";

function CheckOut() {
    const [isOpen, setIsOpen] = React.useState(false);
    const cartItems = useSelector((state) => state.cart.items);

    console.log(cartItems);

    const dispatch = useDispatch();

    const navigate = useNavigate();
    const { toast } = useToast();

    useEffect(() => {
        if (cartItems.length <= 0) {
            toast({
                title: "No Products in cart",
                description: "Please Add Some Products to continue...",
            });
        }
    }, [cartItems]);

    function handleOrder() {
        const order = {
            id: new Date().getTime(),
            date: new Date().toISOString(),
            items: cartItems.map((item) => ({
                id: item.id,
                title: item.title,
                quantity: item.quantity,
                price: item.price,
                image: item.thumbnail,
                total: item.price * item.quantity,
            })),
            totalPrice: cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
        };
        dispatch(addOrder(order));
        toast({
            title: "Order Placed",
            description: "Your order has been placed successfully!",
        });
        navigate("/react-store/orders");
        setIsOpen(false);
        dispatch(clearCart());
    }
    if(cartItems.length === 0) {
        return <div className="flex h-screen justify-center pt-16">
            <h1 className="text-2xl font-bold">
                <p>
                No Items in Cart
                </p>
                <Link to="/products"><Button variant="link">Continue Shopping</Button></Link>
            </h1>
        </div>
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
                <Button
                    onClick={() => {
                        setIsOpen((prev) => !prev);
                    }}
                >
                    Confirm Order
                </Button>
            </div>

            <AlertDialog open={isOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This Confirm Order will place your
                            order.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel
                            onClick={() => {
                                setIsOpen((prev) => !prev);
                            }}
                        >
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={handleOrder}>Confirm</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}

export default CheckOut;
