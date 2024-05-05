import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { getTrendingProducts } from "../utils/helpers"

import { Carousell, Loading, Slider, SocialMediaLinks } from "../components"
import styled from "styled-components"
import shopMenImg from "../assets/images/home/shop-men.jpg"
import shopWomenImg from "../assets/images/home/shop-women.jpg"
import emailImg from "../assets/images/home/contact.png"

const HomePage = () => {
  const { products } = useSelector((store) => store.products)
  const { user } = useSelector((store) => store.user)
  const [email, setEmail] = useState(user ? user.email : "")
  const [trendingProducts, setTrendingProducts] = useState([]);

  useEffect(() => {
    setTrendingProducts(getTrendingProducts(products, user))
  }, [products, user])

  if (!products.length) {
    return <Loading />
  }

  const handleChange = () => setEmail()

  return (
    <Wrapper>
      <div className="container">
        <section>
          <Carousell />
        </section>
        <section className="col-2">
          <div className="text mobile">
            <h2>shop by gender</h2>
            <p>On sale now, get ready for 2023 </p>
          </div>
          <div className="shop-visual shop--men">
            <img src={shopMenImg} alt="stylish men model" />
            <span>men</span>
            <Link to="/products/men" className="link">
              <button className="btn btn--fill-primary">shop now</button>
            </Link>
          </div>
          <div className="shop-visual shop--women">
            <img src={shopWomenImg} alt="stylish women model" />
            <span>women</span>
            <Link to="/products/women" className="link">
              <button className="btn btn--fill-primary">shop now</button>
            </Link>
          </div>
        </section>
        <section className="section--trending">
          <div className="section-header">
            <h2 className="title">trending</h2>
            <Link to="/products">
              <button className="btn btn--fill-primary">shop now</button>
            </Link>
          </div>
          <Slider products={trendingProducts.slice(0, 6)} />
        </section>
        <section className="col-2">
          <div className="info">
            <article className="text">
              <h3>Join our newsletter and get 20% off</h3>
              <p>
                Subscribe to our newsletter to receive your exclusive discount code and stay in the loop with our latest arrivals.
              </p>
            </article>
            <form action="https://formspree.io/f/mnqyagoe" method="POST">
              <input
                type="email"
                id="email"
                name="_replyto"
                value={email}
                onChange={handleChange}
                placeholder="your email here"
              />
              <button className="btn btn--fill-black">get email</button>
            </form>
            <div className="tablet">
              <SocialMediaLinks />
            </div>
          </div>
          <div className="desktop">
            <img src={emailImg} alt="illustration men" />
          </div>
        </section>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.main`
  /* GENERAL SETTING --------------------- */
  .col-2 {
    @media (min-width: 641px) {
      display: flex;
      align-items: center;
      gap: 5rem;
    }
  }
  .col-2 > * {
    @media (min-width: 641px) {
      width: 50%;
    }
  }

  section {
    @media (max-width: 640px) {
      margin-inline: -3rem;
    }
  }

  section:not(:last-child) {
    padding-block: 3rem;
    border-bottom: 1px solid var(--black);
  }

  section:first-child {
    padding-block: 3rem;
    border-bottom: 1px solid var(--black);

    @media (max-width: 640px) {
      padding-block: 0;
      border-bottom: none;
    }
  }

  /* MEN & WOMEN SECTION --------------------- */

  .text {
    padding-inline: 2rem;
    margin-bottom: 2rem;

    h2 {
      margin-bottom: 0.5rem;
    }
  }

  .shop-visual {
    position: relative;
    overflow: hidden;

    @media (max-width: 640px) {
      margin-bottom: 8rem;
      overflow: visible;
    }

    img {
      transition: 0.3s;

      @media (max-width: 640px) {
        height: 250px;
      }
    }

    &:hover img {
      @media (min-width: 641px) {
        scale: 1.2;
      }
    }

    button {
      width: 15rem;
      position: absolute;
      bottom: 2rem;

      @media (max-width: 640px) {
        bottom: 0rem;
        transform: translateY(calc(100% + 1.5rem));
      }
    }

    &:nth-child(2) button {
      left: 2rem;

      @media (max-width: 640px) {
        left: auto;
        right: 2rem;
      }
    }

    &:nth-child(3) button {
      right: 2rem;
      @media (max-width: 640px) {
        right: 2rem;
      }
    }

    span {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      color: white;
      font-size: 8rem;
      font-family: var(--headingFont);
      text-transform: uppercase;
      text-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
      user-select: none;

      @media (max-width: 640px) {
        color: black;
        top: auto;
        left: 2rem;
        bottom: -0.75rem;
        transform: translate(0, 100%);
        font-size: 5rem;
      }
    }
  }

  /* TRENDING SECTION --------------------- */
  .section--trending {
    @media (max-width: 640px) {
      padding-inline: 2rem;

      button {
        background-color: transparent;
        color: black;
        padding: 0;
        padding-right: 1rem;
        padding-bottom: 1rem;
      }
    }
  }

  .section-header {
    display: flex;
    align-items: center;
    gap: 4rem;
    margin-bottom: 3rem;

    @media (max-width: 640px) {
      justify-content: space-between;
      align-items: end;
    }

    .title {
      font-size: 8rem;

      @media (max-width: 640px) {
        font-size: 6rem;
      }
    }
  }

  /* CONTACT SECTION --------------------- */
  .info {
    display: grid;
    gap: 3rem;

    @media (max-width: 640px) {
      margin-top: 3rem;
    }

    .text {
      display: grid;
      padding-inline: 0rem;
      gap: 2rem;

      @media (max-width: 640px) {
        display: grid;
        padding-inline: 2rem;
        padding-bottom: 3rem;
      }
    }

    form {
      display: flex;
      gap: 2rem;

      @media (max-width: 640px) {
        display: grid;
        padding-inline: 2rem;
        padding-bottom: 3rem;
      }

      .btn {
        width: 20rem;

        @media (max-width: 640px) {
          width: 100%;
        }
      }
    }
  }

  ul {
    display: flex;
    gap: 2rem;
    font-size: 2.5rem;
    margin-left: 1rem;

    li a {
      color: var(--grey-400);
    }
  }
`

export default HomePage
