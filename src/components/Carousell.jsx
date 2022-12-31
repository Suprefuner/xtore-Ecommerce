import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import { Pagination, Navigation, Autoplay } from "swiper"
import styled from "styled-components"
import { sliderImgs } from "../utils/constants"

export default function Carousell() {
  return (
    <Wrapper>
      <Swiper
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 5000,
        }}
        loop={true}
        navigation={true}
        modules={[Pagination, Navigation, Autoplay]}
        className="mySwiper"
      >
        {sliderImgs.map(({ id, url }) => (
          <SwiperSlide
            key={id}
            className="slide"
            style={{
              background: `url(${url}) ${
                id === 1 ? "center" : "top center"
              } no-repeat`,
              backgroundSize: `cover`,
            }}
          ></SwiperSlide>
        ))}
      </Swiper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  .slide {
    width: 100%;
    height: 350px;
  }
  .swiper-button-prev,
  .swiper-button-next {
    color: var(--grey-200);
  }
  .swiper-pagination {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }
  .swiper-pagination-bullet {
    background-color: var(--grey-500);
    opacity: 0.5;
    transition: 0.3s;
  }
  .swiper-pagination-bullet-active {
    background-color: var(--primary-500);
    scale: 1.5;
    opacity: 1;
  }
`
