import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { toast } from "react-toastify"

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
  async ({ id, url }, thunkAPI) => {
    try {
      const { data } = await axios(`${url}${id}`)
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
      const stockList = payload.stock.split(",")
      payload.sizes.forEach((size, i) => {
        inventory[size] = +stockList[i]
      })

      let sizeAvailable = []
      payload.sizes.forEach((size) => {
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
