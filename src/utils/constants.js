// GENERAL VARAIBLES  -----------------------------------
export const products_url = `/.netlify/functions/products`
export const single_product_url = `/.netlify/functions/singleProduct?id=`

// LINKS FOR NAVBAR ----------------------------------------
export const links = [
  {
    id: 1,
    text: "home",
    url: "/",
  },
  {
    id: 2,
    text: "products",
    url: "/products",
  },
]

// CAROUSELL ON HOMEPAGE -----------------------------------
import carouselImg1 from "../assets/images/home/slider-1.jpg"
import carouselImg2 from "../assets/images/home/slider-2.jpg"
import carouselImg3 from "../assets/images/home/slider-3.jpg"

export const sliderImgs = [
  {
    id: 1,
    url: carouselImg1,
  },
  {
    id: 2,
    url: carouselImg2,
  },
  {
    id: 3,
    url: carouselImg3,
  },
]
