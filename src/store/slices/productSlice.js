import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk("product/fetchProducts",
    async () => {
        const response = await fetch("https://fakestoreapi.com/products");
        return response.json();
    }
)

const productSlice = createSlice({
    name: "product",
    initialState: {
        products: [],
        product: null,
    },
    extraReducers:(builder) => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.products = action.payload;
        });
    },
})
