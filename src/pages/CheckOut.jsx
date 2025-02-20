import { Button } from "@/components/ui/Button";
import { useToast } from "@/hooks/use-toast";
import React, { useEffect } from "react";
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
} from "@/components/ui/AlertDialog";

function CheckOut() {
    const [isOpen, setIsOpen] = React.useState(false);
    const cartItems = useSelector((state) => state.cart.items);
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
    }, [cartItems, toast]);

    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

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
            totalPrice,
        };
        dispatch(addOrder(order));
        toast({
            title: "Order Placed",
            description: "Your order has been placed successfully!",
        });
        dispatch(clearCart());
        navigate("/react-store/orders");
        setIsOpen(false);
    }

    if (cartItems.length === 0) {
        return (
            <div className="flex h-screen justify-center pt-16">
                <h1 className="text-2xl font-bold">
                    <p>No Items in Cart</p>
                    <Link to="/products">
                        <Button variant="link">Continue Shopping</Button>
                    </Link>
                </h1>
            </div>
        );
    }

    return (
        <div className="px-4 max-w-lg mx-auto">
            <h1 className="mb-4 text-2xl font-bold tracking text-center text-gray-900 dark:text-white">
                Order Summary</h1>
            <div className="border p-4 rounded-lg shadow-md">
                {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between border-b pb-2 mb-2">
                        <img src={item.thumbnail} alt={item.title} className="w-16 h-16 object-cover rounded" />
                        <div className="flex-1 ml-4">
                            <h2 className="text-lg font-semibold">{item.title}</h2>
                            <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                        </div>
                        <p className="text-lg font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                ))}
            </div>
            <div className="mt-4 p-4 border rounded-lg shadow-md">
                <p className="text-lg">Total Items: {totalItems}</p>
                <p className="text-lg font-semibold">Total Price: ${totalPrice.toFixed(2)}</p>
            </div>
            <Button className="mt-4 w-full" onClick={() => setIsOpen(true)}>
                Confirm Order
            </Button>
            <AlertDialog open={isOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Your Order</AlertDialogTitle>
                        <AlertDialogDescription>
                            Your total is ${totalPrice.toFixed(2)}. Proceed with the order?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setIsOpen(false)}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleOrder}>Confirm</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}

export default CheckOut;
