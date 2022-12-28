import React from "react"
import { useSelector } from "react-redux"
import GridViewProducts from "./GridViewProducts"
import ListViewProducts from "./ListViewProducts"

const ProductsList = () => {
  const { filteredProducts: products, gridView } = useSelector(
    (store) => store.filter
  )

  if (products.length < 1) {
    return <h5>Sorry, no products matched your search...</h5>
  }

  if (gridView) return <GridViewProducts products={products} />

  return <ListViewProducts products={products} />
}

export default ProductsList
