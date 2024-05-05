import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import { getFavoriteFromLocalStorage } from "../../utils/localStorage"
import airtableFetch from "../../utils/axios"

const initialFilter = {
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
}

const initialState = {
  isLoading: false,
  isSidebarOpen: false,
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
      const { data } = await airtableFetch()
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
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchProducts.fulfilled, (state, { payload }) => {
        const { records } = payload
        state.products = records.map((product) => {
          const { stock, sizes } = product.fields
          let inventory = {}
          const stockList = stock.split(",")
          sizes.forEach((size, i) => {
            inventory[size] = +stockList[i]
          })

          let sizeAvailable = []
          sizes.forEach((size) => {
            if (inventory[size]) sizeAvailable.push(size)
          })

          const favoriteList = getFavoriteFromLocalStorage()
          // const favoriteList = []
          // const favorite = favoriteList.find(
          //   (favItem) => favItem.id === product.id
          // )
          //   ? true
          //   : false

          const favorite = !!favoriteList.find(
            (favItem) => favItem.id === product.id
          )

          return {
            ...product,
            stock: inventory,
            sizeAvailable,
            favorite,
          }
        })
        state.totalProducts = payload.length
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

export const { toggleFavorite, toggleSidebar } = productsSlice.actions
export default productsSlice.reducer
