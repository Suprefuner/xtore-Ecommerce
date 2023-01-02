import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import GridViewProducts from "./GridViewProducts"
import ListViewProducts from "./ListViewProducts"
import Loading from "./Loading"
import { updatePage } from "../features/filter/filterSlice"
import CartModal from "./CartModal"

const ProductsList = () => {
  const [reminderShow, setRemindShow] = useState(false)
  const { isLoading } = useSelector((store) => store.products)
  const {
    filteredProducts: products,
    gridView,
    page,
    productsPerPage,
  } = useSelector((store) => store.filter)
  const dispatch = useDispatch()

  // for scroll to show more product effect
  useEffect(() => {
    const event = window.addEventListener("scroll", () => {
      if (
        !isLoading &&
        window.innerHeight + window.scrollY >= document.body.scrollHeight
      )
        dispatch(updatePage())
    })
    return () => window.removeEventListener("scroll", event)
  }, [])

  // for mobile version pop up modal tell user swipe right to open filter menu
  useEffect(() => {
    let timer
    if (!isLoading) {
      setRemindShow(true)
      timer = setTimeout(() => {
        setRemindShow(false)
      }, 2000)
    }

    return () => clearTimeout(timer)
  }, [isLoading])

  if (isLoading) {
    return (
      <div className="section-center">
        <Loading />
      </div>
    )
  }

  if (products.length < 1) {
    return (
      <div className="section-center">
        <h3 style={{ marginTop: "10rem" }}>
          Sorry, we can't find anything match your search
        </h3>
      </div>
    )
  }

  if (gridView)
    return (
      <>
        {reminderShow ? (
          <div className="modal mobile">
            <CartModal message="Swipe right to open the filter menu" />
          </div>
        ) : null}
        <GridViewProducts
          products={products.slice(0, productsPerPage * (page + 1))}
        />
      </>
    )

  return (
    <ListViewProducts
      products={products.slice(0, productsPerPage * (page + 1))}
    />
  )
}

export default ProductsList
