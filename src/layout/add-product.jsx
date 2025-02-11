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
import React, { useState } from "react";

function AddProduct({ onCancel }) {
    const { toast } = useToast()

    const [formData, setFormData] = useState({
        title: '',
        category: '',
        price: '',
        stock: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
        console.log(formData);
    };

    async function handleAddProduct() {
        const response = await fetch("https://dummyjson.com/products/add", {
            method: "POST",
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
        mutationFn: handleAddProduct,
        onSuccess: () => {
            toast({ title: "Product Added", description: "Product Successfully Added" });
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
        <div className="w-screen h-screen absolute inset-0 bg-transparent flex items-center justify-center backdrop-blur-sm">
            <form onSubmit={handleSubmit}>
                <Card className="w-96">
                    <CardHeader>
                        <CardTitle>Add New Product</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Label>Titile</Label>
                        <Input onChange={handleChange} type="text" required name="title" placeholder="Enter Product Title" />
                        <Label>Category</Label>
                        <Input onChange={handleChange} type="text" required name="category" placeholder="Enter Product Category" />
                        <Label>Price </Label>
                        <Input onChange={handleChange} type="number" required name="price" placeholder="Enter Product Price" />
                        <Label>Stock </Label>
                        <Input onChange={handleChange} type="number" required name="stock" placeholder="Enter Product Units" />
                    </CardContent>
                    <CardFooter className="flex items-center justify-between">
                        <Button variant="outline" onClick={onCancel}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isPending}>{isPending ? 'Please Wait...' : 'Add Product'}</Button>
                    </CardFooter>

                </Card>
            </form>
        </div>
    );
}

export default AddProduct;
