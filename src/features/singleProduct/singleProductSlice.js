import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import airtableFetch from "../../utils/axios"

const initialProductState = {
  id: "",
  name: "",
  sex: "",
  category: "",
  price: 0,
  images: [{ url: "" }],
  description: "",
  colors: [],
  brand: "",
  sizes: [],
  currentSize: "",
  stock: 0,
  stars: 0,
  soldOut: true,
  sizeAvailable: [],
}

const initialState = {
  isLoading: false,
  error: false,
  product: initialProductState,
}

export const fetchSingleProduct = createAsyncThunk(
  "singleProduct/fetchSingleProduct",
  async ({ id }, thunkAPI) => {
    try {
      const { data } = await airtableFetch(`/${id}`)
      return data
    } catch (err) {
      return thunkAPI.rejectWithValue(err)
    }
  }
)

const singleProductSlice = createSlice({
  name: "singleProduct",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchSingleProduct.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(fetchSingleProduct.fulfilled, (state, { payload }) => {
      // format data -----------------------------------------
      let inventory = {}
      const { stock, sizes } = payload.fields
      const stockList = stock.split(",")
      sizes.forEach((size, i) => {
        inventory[size] = +stockList[i]
      })

      let sizeAvailable = []
      sizes.forEach((size) => {
        if (inventory[size]) sizeAvailable.push(size)
      })
      // ----------------------------------------------------
      state.product = {
        ...payload,
        stock: inventory,
        sizeAvailable,
        soldOut: !Boolean(sizeAvailable.length),
        currentSize: sizeAvailable[0],
      }
      state.isLoading = false
    })
    builder.addCase(fetchSingleProduct.rejected, (state, { payload }) => {
      state.isLoading = false
      state.error = true
      toast.error(payload)
    })
  },
})

export default singleProductSlice.reducer
