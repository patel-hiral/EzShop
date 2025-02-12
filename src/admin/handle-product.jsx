import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useState } from "react";

function AddProduct({ onCancel, product }) {

    const [formData, setFormData] = useState({
        title: '',
        category: '',
        price: '',
        stock: ''
    })

    useEffect(() => {
        if (product) {
            setFormData({
                title: product.title,
                price: product.price,
                stock: product.stock,
                category: product.category,
            });
        }
    }, [product]);


    const { toast } = useToast()

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    async function handleProduct() {
        let url = 'https://dummyjson.com/products/add'
        let method = 'POST'
        if (product) {
            url = 'https://dummyjson.com/products/' + product.id
            method = 'PUT'
        }

        const response = await fetch(url, {
            method: method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
        if (!response.ok) {
            return console.log('Failed To Add Product');
        }
        const resData = await response.json();
        console.log(resData);
        return resData
    }

    const { mutate, isPending } = useMutation({
        mutationFn: handleProduct,
        onSuccess: () => {
            if (!product) {
                toast({ title: "Product Added", description: "Product Successfully Added" });
            } else {
                toast({ title: "Product Updated", description: "Product Successfully Updated" });
            }
            onCancel();
        },
        onError: (error) => {
            toast({ title: "Error", description: error.message, variant: "destructive" });
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        mutate();
    };

    return (
        <div className="w-screen h-screen fixed inset-0 bg-transparent flex items-center justify-center backdrop-blur-xl">
            <form onSubmit={handleSubmit} className="mx-auto">
                <Card className="w-80 md:w-96">
                    <CardHeader>
                        <CardTitle>{product ? 'Update Product Details' : 'Add New Product'}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Label>Titile</Label>
                        <Input onChange={handleChange} type="text" value={formData.title} required name="title" placeholder="Enter Product Title" />
                        <Label>Category</Label>
                        <Input onChange={handleChange} type="text" value={formData.category} required name="category" placeholder="Enter Product Category" />
                        <Label>Price </Label>
                        <Input onChange={handleChange} type="number" value={formData.price} required name="price" placeholder="Enter Product Price" />
                        <Label>Stock </Label>
                        <Input onChange={handleChange} type="number" value={formData.stock} required name="stock" placeholder="Enter Product Units" />
                    </CardContent>
                    <CardFooter className="flex items-center justify-between">
                        <Button variant="outline" type="button" onClick={onCancel}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isPending} className="ml-2">
                            {isPending ? (product ? 'Saving...' : 'Updating...') : product ? 'Update' : 'Save'}
                        </Button>
                    </CardFooter>

                </Card>
            </form>
        </div>
    );
}

export default AddProduct;
