// GENERAL VARAIBLES  -----------------------------------
export const airtable_base_url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE}/${import.meta.env.VITE_AIRTABLE_TABLE}`

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

// PRODUCT PAGE DESCRIPTION ----------------------------------------
export const pageDescription = {
  men: "Explore our Men's Clothing collection, where classic meets contemporary. Discover quality men's apparel for every occasion, from casual wear to tailored suits. Look and feel your best with our stylish and versatile pieces. Elevate your style effortlessly with our on-trend selection. Redefine your personal style with confidence and sophistication.",
  women: "Discover our Women's Clothing collection, where style meets elegance. Explore trendy apparel for every occasion, from casual essentials to evening wear. Find the perfect outfit that empowers your unique style. Shop high-quality, versatile pieces that cater to your fashion needs. Elevate your wardrobe with the latest trends in women's fashion."
}