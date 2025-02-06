import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import { ShoppingCart, StarIcon, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/store/slices/cartSlice";
import { useToast } from "@/hooks/use-toast";
import { setLoading, setResolved } from "@/store/slices/uiSlice";
function ProductDetails() {
    const redirect = useNavigate();
    const { user } = useSelector((state) => state.user);
    const { toast } = useToast();
    const dispatch = useDispatch();
    const product = useLoaderData();

    useEffect(() => {
        dispatch(setLoading());
        if (product) {
            setTimeout(() => {
                dispatch(setResolved())
            }, 500)
        }
    }, [product])

    function handleAddToCart() {
        if (!user) {
            toast({ title: "Please login to proceed" });
            return redirect("/auth/login");
        }
        dispatch(addToCart(product));
        toast({ title: "Added to cart", description: "Product added to cart successfully!" });
    }
    return (
        <section className="flex flex-col lg:flex-row">
            <div className="images-container flex-shrink-0 w-full lg:w-1/3 relative md:border border-secondary p-4">
                <img src={product.thumbnail} alt={product.name} className="w-full" />
                <div className="actions-container flex item-center gap-5">
                    <Button onClick={handleAddToCart} className="w-1/2 uppercase" variant="secondary"><ShoppingCart /> Add To Cart</Button>
                    <Button className="w-1/2 uppercase"><Zap />Buy Now</Button>
                </div>
            </div>
            <div className="details-section flex-1 p-6 md:p-2">
                <h1 className="text-xl">{product.title}</h1>
                <p className="flex items-center py-2">
                    <span className="bg-green-700 py-[2px] text-white text-xs items-center px-1 rounded-sm flex w-fit font-semibold">
                        {product.rating}
                        <StarIcon className="h-4" />
                    </span>
                    &nbsp;{" "}
                    <span className="text-sm text-gray-500">
                        ({product.reviews.length}) Reviews
                    </span>
                </p>
                <p className="text-sm py-2 text-green-700 font-bold">Special Price</p>
                <p className="font-bold text-3xl dark:text-gray-400 text-gray-700">
                    $ {product.price}&nbsp;&nbsp;
                    <span className="text-xl line-through font-medium text-gray-500 ">
                        $
                        {(
                            product.price +
                            (product.price * product.discountPercentage) / 100
                        ).toFixed(2)}
                    </span>
                    &nbsp;&nbsp;
                    <span className="text-base text-green-600 font-semibold">
                        {product.discountPercentage}% off
                    </span>
                </p>
                <h1 className="text-base font-bold dark:text-gray-500 text-gray-600 py-4">
                    Available Offers
                </h1>
                <ul className="text-sm text-gray-500 dark:text-gray-400 list-disc pl-5">
                    <li className="py-2">
                        Special Price Get extra {product.discountPercentage}% off (price
                        inclusive of cashback/coupon) T&C
                    </li>
                    <li className="py-2">
                        Combo Offer Buy 2 items save $0.15; Buy 3 or more save $0.30 See all
                        products T&C
                    </li>
                    <li className="py-2">
                        Bank Offer 5% Unlimited Cashback on Flipkart Axis Bank Credit
                        Card T&C
                    </li>
                    <li className="py-2">
                        Bank Offer 5% off up to $99 on IDFC FIRST Power Women Platinum and
                        Signature Debit Card. Min Txn Value: $1,000
                    </li>
                </ul>
                <div className="description flex items-baseline  gap-5 py-4">
                    <h1 className="text-base pl-2 font-bold dark:text-gray-500 text-gray-600 py-4">
                        Description
                    </h1>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{product.description}</p>
                </div>
            </div>
        </section>
    );
}

export default ProductDetails;

export async function getProduct({ params }) {
    const id = params.id;
    try {
        const response = await fetch("https://dummyjson.com/products/" + id);
        if (!response.ok) {
            throw new Error("Error Fetching Data...");
        }
        const resData = await response.json();
        return resData;
    } catch (error) {
        console.log("Error Fetching Product::", error);
    }
}
