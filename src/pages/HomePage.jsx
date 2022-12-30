import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Carousell, Slider } from "../components"
import styled from "styled-components"
import shopMenImg from "../assets/images/home/shop-men.jpg"
import shopWomenImg from "../assets/images/home/shop-women.jpg"
import emailImg from "../assets/images/home/contact.png"
import { BsInstagram, BsTwitter, BsFacebook } from "react-icons/bs"

import { useSelector, useDispatch } from "react-redux"
import SingleProductPage from "./SingleProductPage"

const HomePage = () => {
  const { user } = useSelector((store) => store.user)
  const { products } = useSelector((store) => store.products)
  const [email, setEmail] = useState(user ? user.email : "")

  const getTrendingProducts = (products) => {
    if (user && user === "mr.") {
      return products.filter(
        (product) => product.sex === "men" && product.stars >= 4
      )
    }

    if (user && user !== "mr.") {
      return products.filter(
        (product) => product.sex === "women" && product.stars >= 4
      )
    }

    return products.filter((product) => product.stars >= 4)
  }

  let trendingProducts = getTrendingProducts(products)

  const handleChange = (e) => {
    setEmail()
  }

  return (
    <Wrapper>
      <div className="container">
        <section>
          <Carousell />
        </section>
        <section className="col-2">
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
        <section>
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
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla
                inventore, quos qui quisquam nemo dolorem iste consequuntur
                molestiae doloremque, adipisci architecto unde pariatur tempora
                perferendis a animi maxime! Minus, dolores?
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
            <ul className="social-media-links">
              <li>
                <a href="#">
                  <BsFacebook />
                </a>
              </li>
              <li>
                <a href="#">
                  <BsInstagram />
                </a>
              </li>
              <li>
                <a href="#">
                  <BsTwitter />
                </a>
              </li>
            </ul>
          </div>
          <div>
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
    display: flex;
    align-items: center;
    gap: 5rem;
  }
  .col-2 > * {
    width: 50%;
  }

  section:not(:last-child) {
    padding-block: 3rem;
    border-bottom: 1px solid var(--black);
  }

  /* MEN & WOMEN SECTION --------------------- */
  .shop-visual {
    position: relative;

    button {
      width: 15rem;
      position: absolute;
      bottom: 2rem;
    }

    &:first-child button {
      left: 2rem;
    }

    &:nth-child(2) button {
      right: 2rem;
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
    }
  }

  /* TRENDING SECTION --------------------- */
  .section-header {
    display: flex;
    align-items: center;
    gap: 4rem;
    margin-bottom: 3rem;

    .title {
      font-size: 8rem;
    }
  }

  /* CONTACT SECTION --------------------- */
  .info {
    display: grid;
    gap: 3rem;

    .text {
      display: grid;
      gap: 2rem;
    }

    form {
      display: flex;
      gap: 2rem;

      .btn {
        width: 20rem;
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
