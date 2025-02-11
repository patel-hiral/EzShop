import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import AddProduct from '../layout/add-product';
function ManageProducts() {
    
    const { toast } = useToast();
    const [isVisisble, setVisible] = useState(false)

    async function getProductsList() {
        const response = await fetch('https://dummyjson.com/products?limit=5');
        if (!response.ok) {
            return console.log('Failed To Fetch Data...');
        }
        const resData = await response.json();
        setItems(resData.products)
        return resData.products;
    }

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['products-list'],
        queryFn: getProductsList
    });

    const [items, setItems] = useState(data)

    async function deleteProduct(id) {
        try {
            const response = await fetch('https://dummyjson.com/products/' + id, {
                method: 'DELETE',
            })
            if (response.ok) {
                toast({ title: 'Deleted', description: 'Product Successfully Deleted...' });
            }
            setItems((prev) => prev.filter((item) => item.id !== id));
        } catch (error) {
            console.log('Error Deleting Product', error);
        }
    }

    function handleForm() {
        setVisible((prev) => !prev)
    }

    if (isLoading) {
        return <div className="text-center py-10 text-gray-600">Loading...</div>;
    }

    if (isError) {
        return <div className="text-red-500 text-center">{error.message}</div>;
    }

    return (
        <>
            <Card className="flex flex-col flex-grow">
                <CardHeader>
                    <CardTitle>Products</CardTitle>
                    <CardDescription>Manage your products here.</CardDescription>
                    <div className="pt-4 flex space-x-4">
                        <Button
                            variant="secondary"
                            onClick={handleForm}
                        >
                            <PlusCircle className="mr-2 h-5" />
                            Add New Product
                        </Button>
                    </div>
                    <CardContent>
                        <ul>
                            {items.map((item) => {
                                return <li className='flex border-b border-secondary' key={item.id}>
                                    <div className='h-10 w-10 md:h-20 md:w-20'>
                                        <img className='h-full w-full object-cover' src={item.thumbnail} alt={item.title} />
                                    </div>
                                    <div className='flex-1 px-2 flex items-start justify-center flex-col'>
                                        <h1 className='text-sm md:text-base'>{item.title}</h1>
                                        <h3 className='text-xs md:text-sm text-green-600'>InStock - {item.stock}</h3>
                                        <span className='text-sm'>$ {item.price}</span>
                                    </div>
                                    <div className="actions flex items-center gap-4">
                                        <Button variant="outline">Edit</Button>
                                        <Button onClick={() => deleteProduct(item.id)}>Delete</Button>
                                    </div>
                                </li>
                            })}
                            {items.length === 0 && <div className='text-center'>No Products Available...</div>}
                        </ul>
                    </CardContent>
                </CardHeader>
            </Card>
            {isVisisble && <AddProduct onCancel={handleForm} />}
        </>
    );
}

export default ManageProducts;
