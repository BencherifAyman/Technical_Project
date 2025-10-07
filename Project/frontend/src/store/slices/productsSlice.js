import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api";

export const fetchProducts = createAsyncThunk("products/fetchAll", async () => {
  const { data } = await api.get("/products");
  return Array.isArray(data) ? data : data.data || [];
});
export const createProduct = createAsyncThunk("products/create", async (payload) => {
  const { data } = await api.post("/products", payload);
  return data;
});
export const updateProduct = createAsyncThunk("products/update", async (payload) => {
  const { _id, ...rest } = payload;
  const { data } = await api.put(`/products/${_id}`, rest);
  return data;
});
export const deleteProduct = createAsyncThunk("products/delete", async (_id) => {
  await api.delete(`/products/${_id}`);
  return _id;
});

const slice = createSlice({
  name: "products",
  initialState: { items: [], status: "idle", error: "" },
  reducers: {},
  extraReducers: (b) => {
    b.addCase(fetchProducts.pending, (s)=>{ s.status="loading"; s.error=""; })
     .addCase(fetchProducts.fulfilled, (s,a)=>{ s.status="idle"; s.items=a.payload; })
     .addCase(fetchProducts.rejected, (s,a)=>{ s.status="idle"; s.error=a.error.message || "Fetch failed"; })
     .addCase(createProduct.fulfilled, (s,a)=>{ s.items.push(a.payload); })
     .addCase(updateProduct.fulfilled, (s,a)=>{ 
        const i = s.items.findIndex(x => String(x._id) === String(a.payload._id));
        if (i>=0) s.items[i] = a.payload;
     })
     .addCase(deleteProduct.fulfilled, (s,a)=>{ 
        s.items = s.items.filter(x => String(x._id) !== String(a.payload));
     });
  },
});

export default slice.reducer;
