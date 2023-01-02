import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import {
  setFavoriteToLocalStorage,
  getFavoriteFromLocalStorage,
} from "../../utils/localStorage"

const initialState = {
  favorites: getFavoriteFromLocalStorage(),
  filteredFavorites: getFavoriteFromLocalStorage(),
  sort: "price-lowest",
  filters: {
    text: "",
    brand: "all",
    sex: "all",
    category: "all",
    color: "all",
  },
}

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    getProducts: (state, { payload }) => {
      state.favorites = payload.filter((product) => product.favorite)
      state.filteredFavorites = payload.filter((product) => product.favorite)

      setFavoriteToLocalStorage(state.favorites)
    },
    addToFavorites: (state, { payload }) => {
      if (!state.favorites.find((product) => product.id === payload.id))
        state.favorites = [...state.favorites, payload]
      setFavoriteToLocalStorage(state.favorites)
    },
    removeFromFavorites: (state, { payload }) => {
      state.favorites = state.favorites.filter(
        (product) => product.id !== payload
      )
      setFavoriteToLocalStorage(state.favorites)
    },
    updateSort: (state, { payload }) => {
      state.sort = payload
    },
    sortProducts: (state) => {
      if (state.sort === "price-lowest") {
        state.filteredFavorites.sort((a, b) => a.price - b.price)
      }

      if (state.sort === "price-highest") {
        state.filteredFavorites.sort((a, b) => b.price - a.price)
      }

      if (state.sort === "name-a") {
        state.filteredFavorites.sort((a, b) => a.brand.localeCompare(b.brand))
      }

      if (state.sort === "name-z") {
        state.filteredFavorites.sort((a, b) => b.brand.localeCompare(a.brand))
      }
    },
    updateFilter: (state, { payload }) => {
      state.filters[payload.name] = payload.value
    },
    filterProducts: (state) => {
      let tempProducts = [...state.favorites]
      const { text, brand, sex, category, color } = state.filters

      if (text) {
        tempProducts = tempProducts.filter((product) => {
          return (
            product.name.toLowerCase().includes(text) ||
            product.brand.toLowerCase().includes(text)
          )
        })
      }

      if (brand && brand.toLowerCase() !== "all") {
        tempProducts = tempProducts.filter((product) => product.brand === brand)
      }

      if (sex && sex.toLowerCase() !== "all") {
        tempProducts = tempProducts.filter((product) => product.sex === sex)
      }

      if (category && category.toLowerCase() !== "all") {
        tempProducts = tempProducts.filter(
          (product) => product.category === category
        )
      }

      if (color && color.toLowerCase() !== "all") {
        tempProducts = tempProducts.filter((product) =>
          product.colors.includes(color)
        )
      }

      state.filteredFavorites = tempProducts
    },
    clearFilter: (state) => {
      state.filters = { ...initialState.filters }
    },
  },
})

export const {
  getProducts,
  addToFavorites,
  removeFromFavorites,
  updateSort,
  sortProducts,
  filterProducts,
  updateFilter,
  clearFilter,
} = favoriteSlice.actions
export default favoriteSlice.reducer
