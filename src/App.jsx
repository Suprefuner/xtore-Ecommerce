import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Slide, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { fetchProducts } from "./features/products/productsSlice"

import { Error, Footer, Navbar, Sidebar } from "./components"
import {
  CartPage,
  CheckoutPage,
  FavoritePage,
  HomePage,
  PrivateRoute,
  ProductInGenderPage,
  ProductsPage,
  ProfilePage,
  RegisterPage,
  SingleProductPage,
} from "./pages"

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  return (
    <BrowserRouter>
      <Navbar />
      <Sidebar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/:id" element={<SingleProductPage />} />
        <Route
          path="products/men"
          element={<ProductInGenderPage sex="men" />}
        />
        <Route
          path="products/women"
          element={<ProductInGenderPage sex="women" />}
        />

        <Route path="favorite" element={<FavoritePage />} />
        <Route path="cart" element={<CartPage />} />
        <Route
          path="checkout"
          element={
            <PrivateRoute>
              <CheckoutPage />
            </PrivateRoute>
          }
        />
        <Route path="register" element={<RegisterPage />} />
        <Route
          path="profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        limit={3}
        transition={Slide}
        // hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </BrowserRouter>
  )
}

export default App
