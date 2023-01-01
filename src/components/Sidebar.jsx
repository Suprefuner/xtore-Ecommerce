import React from "react"
import styled from "styled-components"
import { useSelector, useDispatch } from "react-redux"
import { links } from "../utils/constants"
import { Link } from "react-router-dom"
import SocialMediaLinks from "./SocialMediaLinks"
import { FiChevronRight } from "react-icons/fi"
import { toggleSidebar } from "../features/products/productsSlice"

const Sidebar = () => {
  const { isSidebarOpen } = useSelector((store) => store.products)
  const { totalItems } = useSelector((store) => store.cart)
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(toggleSidebar())
  }

  return (
    <Wrapper>
      <aside className={isSidebarOpen ? "sidebar show" : "sidebar"}>
        <ul className="sidebar-links">
          {links.map(({ id, text, url }) => (
            <Link to={url} key={id} onClick={handleClick}>
              <li>
                {text}
                <FiChevronRight />
              </li>
            </Link>
          ))}
          <Link to="/favorite" onClick={handleClick}>
            {" "}
            <li>
              my favorite
              <FiChevronRight />
            </li>
          </Link>
          <Link to="/cart" onClick={handleClick} className="">
            <li>
              cart
              {totalItems ? <span>{totalItems}</span> : null}
              <FiChevronRight />
            </li>
          </Link>
        </ul>
        <SocialMediaLinks />
        <div className="buttons"></div>
      </aside>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  .sidebar {
    position: fixed;
    top: 7rem;
    right: 0;
    z-index: 1000;

    width: clamp(25rem, 80%, 30rem);
    height: 100%;
    margin-left: auto;

    background-color: white;
    border-left: 1px solid black;
    transform: translateX(100%);
    transition: all 0.2s;

    &.show {
      transform: translateX(0);
      z-index: 1000;
    }

    .sidebar-links {
      padding-top: 2rem;
      display: grid;
      margin-bottom: 8rem;
      font-size: 1.8rem;
      text-transform: capitalize;

      li {
        padding-inline: 2rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-block: 1rem;

        &:last-child {
          position: relative;

          span {
            --size: 2.2rem;

            display: inline-block;
            width: var(--size);
            height: var(--size);

            position: absolute;
            top: 50%;
            left: 6rem;
            transform: translateY(-50%);

            margin-left: 1rem;
            margin-right: auto;

            color: white;
            font-size: 1.4rem;
            line-height: var(--size);
            text-align: center;

            background-color: var(--primary-500);
            border-radius: 50%;
          }
        }
      }

      & ~ * {
        padding-left: 1rem;
      }
    }
  }
`

export default Sidebar
