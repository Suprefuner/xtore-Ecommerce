export const addUserToLocalStorage = (user) => {
  localStorage.setItem("user", JSON.stringify(user))
}

export const removeUserToLocalStorage = (user) => {
  localStorage.removeItem("user")
}

export const getUserFromLocalStorage = (user) => {
  const res = localStorage.getItem("user")
  return res ? JSON.parse(res) : null
}

export const setCartItemToLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart))
}

export const removeCartFromLocalStorage = () => {
  localStorage.removeItem("cart")
}

export const getCartFromLocalStorage = () => {
  const res = localStorage.getItem("cart")
  return res ? JSON.parse(res) : []
}

export const setFavoriteToLocalStorage = (favorite) => {
  localStorage.setItem("favorite", JSON.stringify(favorite))
}

export const removeFavoriteFromLocalStorage = () => {
  localStorage.removeItem("favorite")
}

export const getFavoriteFromLocalStorage = () => {
  const res = localStorage.getItem("favorite")
  return res ? JSON.parse(res) : []
}
