import { useState } from "react"
import styled from "styled-components"

const SingleProductImageSlider = ({ images }) => {
  const [mainImage, setMainImage] = useState(images[0])

  return (
    <Wrapper>
      <div className="images">
        {images.map((image, i) => (
          <div key={i} className={mainImage.id === image.id ? "active" : null}>
            <img
              src={image.url}
              alt="product image"
              onClick={() => setMainImage(images[i])}
            />
          </div>
        ))}
      </div>
      <div className="mainImage">
        <img src={mainImage.url} alt="product main image" />
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  gap: 1rem;
  overflow: hidden;

  img {
    height: 100%;
    transition: 0.2s;
  }

  .images {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 25%;
    overflow-y: scroll;

    &::-webkit-scrollbar {
      width: 0;
    }

    img {
      cursor: pointer;
    }

    .active {
      border: 1px solid var(--primary-500);

      img {
        opacity: 0.7;
      }
    }
  }

  .mainImage {
    width: 75%;
  }
`

export default SingleProductImageSlider
