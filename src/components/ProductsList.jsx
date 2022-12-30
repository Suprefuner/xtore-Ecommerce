import { useSelector } from "react-redux"
import GridViewProducts from "./GridViewProducts"
import ListViewProducts from "./ListViewProducts"
import Loading from "./Loading"

const ProductsList = () => {
  const { isLoading } = useSelector((store) => store.products)
  const { filteredProducts: products, gridView } = useSelector(
    (store) => store.filter
  )

  if (isLoading) {
    return (
      <div className="section-center">
        <Loading />
      </div>
    )
  }

  if (products.length < 1) {
    // return <h5>Sorry, no products matched your search...</h5>
    return (
      <div className="section-center">
        <h3 style={{ marginTop: "10rem" }}>
          Sorry, we can't find anything match your search
        </h3>
      </div>
    )
  }

  if (gridView) return <GridViewProducts products={products} />

  return <ListViewProducts products={products} />
}

export default ProductsList
