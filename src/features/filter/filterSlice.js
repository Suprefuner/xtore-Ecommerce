import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
  allProducts: [],
  filteredProducts: [],
  page: 0,
  numberOfPages: 0,
  productsPerPage: 9,
  gridView: true,
  sort: "price-lowest",
  filters: {
    text: "",
    brand: "all",
    sex: "all",
    category: "all",
    color: "all",
    minPrice: 0,
    maxPrice: 0,
    price: 0,
  },
}

const filterSlice = createSlice({
  name: "filterSlice",
  initialState,
  reducers: {
    getProducts: (state, { payload }) => {
      state.allProducts = payload

      let tempProducts = [...payload]

      const { category, sex } = state.filters
      if (
        category &&
        category.toLowerCase() !== "all" &&
        sex &&
        sex.toLowerCase() !== "all"
      ) {
        tempProducts = tempProducts.filter(
          (product) => product.category === category && product.sex === sex
        )
      }

      state.filteredProducts = tempProducts
      state.numberOfPages = Math.ceil(
        tempProducts.length / state.productsPerPage
      )

      state.filters.price = Math.max(...payload.map((product) => product.price))
      state.filters.maxPrice = Math.max(
        ...payload.map((product) => product.price)
      )
      state.filters.minPrice = Math.min(
        ...payload.map((product) => product.price)
      )
    },
    setGridView: (state) => {
      state.gridView = true
    },
    setListView: (state) => {
      state.gridView = false
    },
    updateSort: (state, { payload }) => {
      state.sort = payload
    },
    sortProducts: (state) => {
      let tempProducts = []
      if (state.sort === "price-lowest") {
        tempProducts = state.filteredProducts.sort((a, b) => a.price - b.price)
      }

      if (state.sort === "price-highest") {
        tempProducts = state.filteredProducts.sort((a, b) => b.price - a.price)
      }

      if (state.sort === "name-a") {
        tempProducts = state.filteredProducts.sort((a, b) =>
          a.brand.localeCompare(b.brand)
        )
      }

      if (state.sort === "name-z") {
        tempProducts = state.filteredProducts.sort((a, b) =>
          b.brand.localeCompare(a.brand)
        )
      }

      state.filteredProducts = tempProducts
    },
    updateFilter: (state, { payload }) => {
      state.filters[payload.name] = payload.value
    },
    clearFilter: (state) => {
      state.filters = {
        ...state.filters,
        text: "",
        brand: "all",
        sex: "all",
        category: "all",
        color: "all",
        price: state.filters.maxPrice,
      }
    },
    filterProducts: (state) => {
      let tempProducts = [...state.allProducts]
      const { text, brand, sex, category, color, price } = state.filters

      if (text) {
        tempProducts = tempProducts.filter(
          (product) =>
            product.name.toLowerCase().includes(text) ||
            product.brand.toLowerCase().includes(text)
        )
      }

      if (category && category.toLowerCase() !== "all") {
        tempProducts = tempProducts.filter(
          (product) => product.category === category
        )
      }

      if (sex && sex.toLowerCase() !== "all") {
        tempProducts = tempProducts.filter((product) => product.sex === sex)
      }

      if (brand && brand.toLowerCase() !== "all") {
        tempProducts = tempProducts.filter((product) => product.brand === brand)
      }

      if (color && color.toLowerCase() !== "all") {
        tempProducts = tempProducts.filter((product) =>
          product.colors.includes(color)
        )
      }

      if (price) {
        tempProducts = tempProducts.filter((product) => product.price <= price)
      }

      if (state.sort === "price-lowest") {
        tempProducts = state.filteredProducts.sort((a, b) => a.price - b.price)
      }

      if (state.sort === "price-highest") {
        tempProducts = state.filteredProducts.sort((a, b) => b.price - a.price)
      }

      if (state.sort === "name-a") {
        tempProducts = state.filteredProducts.sort((a, b) =>
          a.brand.localeCompare(b.brand)
        )
      }

      if (state.sort === "name-z") {
        tempProducts = state.filteredProducts.sort((a, b) =>
          b.brand.localeCompare(a.brand)
        )
      }

      state.filteredProducts = tempProducts
    },
    updatePage: (state, { payload }) => {
      state.page = payload ? 0 : state.page + 1
    },
  },
})

export const {
  getProducts,
  setGridView,
  setListView,
  updateSort,
  sortProducts,
  updateFilter,
  clearFilter,
  filterProducts,
  updatePage,
} = filterSlice.actions
export default filterSlice.reducer
