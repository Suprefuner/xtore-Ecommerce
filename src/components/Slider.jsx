import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import ProductCard from "./ProductCard"
import styled from "styled-components"
import { useSelector } from "react-redux"

const Slider = ({ products }) => {
  const { isLoading } = useSelector((store) => store.products)
  const tempArray = Array.from({ length: 5 }).fill({
    name: "",
    sex: "",
    price: 0,
    brand: "",
    images: [{ url: "" }],
    id: "",
    sizeAvailable: [],
    favorite: false,
  })

  return (
    <Wrapper>
      <Swiper slidesPerView={"auto"} spaceBetween={20} className="mySwiper">
        {isLoading
          ? tempArray.map((item, i) => (
              <SwiperSlide key={i} className="slide">
                <ProductCard product={item} />
              </SwiperSlide>
            ))
          : products.map((product) => (
              <SwiperSlide key={product.id} className="slide">
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
      </Swiper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  user-select: none;

  .slide {
    width: min-content;
  }
`

export default Slider
