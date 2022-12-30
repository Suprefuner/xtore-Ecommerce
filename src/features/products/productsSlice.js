import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import axios from "axios"
import { products_url as url } from "../../utils/constants"
import { getFavoriteFromLocalStorage } from "../../utils/localStorage"

const initialFilter = {
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
}

const initialState = {
  isLoading: false,
  products: [],
  trendingProducts: [],
  totalProducts: 0,
  numOfPages: 1,
  page: 1,
  status: {},
  ...initialFilter,
}

const itemsPerPage = 10

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios(url)
      return data
    } catch (err) {
      thunkAPI.rejectWithValue(`Fetch products failed. ${err.message}`)
    }
  }
)

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    toggleFavorite: (state, { payload }) => {
      state.products = state.products.map((product) =>
        product.id === payload
          ? { ...product, favorite: !product.favorite }
          : product
      )
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchProducts.fulfilled, (state, { payload }) => {
        state.products = payload.map((product) => {
          let inventory = {}
          const stockList = product.stock.split(",")
          product.sizes.forEach((size, i) => {
            inventory[size] = +stockList[i]
          })

          let sizeAvailable = []
          product.sizes.forEach((size) => {
            if (inventory[size]) sizeAvailable.push(size)
          })

          const favoriteList = getFavoriteFromLocalStorage()
          // const favoriteList = []
          const favorite = favoriteList.find(
            (favItem) => favItem.id === product.id
          )
            ? true
            : false

          return {
            ...product,
            stock: inventory,
            sizeAvailable,
            favorite,
          }
        })
        state.totalProducts = payload.length
        // state.trendingProducts = state.products.filter(
        //   (product) => product.stars >= 4
        // )
        state.numOfPages = Math.ceil(payload.length / itemsPerPage)
        state.page = 1
        state.isLoading = false
      })
      .addCase(fetchProducts.rejected, (state, { payload }) => {
        state.isLoading = false
        toast.error(payload)
      })
  },
})

export const { toggleFavorite } = productsSlice.actions
export default productsSlice.reducer
