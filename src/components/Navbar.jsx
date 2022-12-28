import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

import logoLg from "../assets/images/xtore_logo-lg.svg"
import NavButtons from "./NavButtons"
import { links } from "../utils/constants"

const Navbar = () => {
  return (
    <Wrapper className="nav">
      <div className="container">
        <div className="logo-container">
          <Link to="/">
            <img src={logoLg} alt="xtore logo" className="desktop" />
          </Link>
        </div>

        <ul>
          {links.map(({ id, text, url }) => (
            <li key={id}>
              <Link to={url}>{text}</Link>
            </li>
          ))}
        </ul>
        <NavButtons />
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.nav`
  height: 7rem;
  position: relative;
  z-index: 1000;

  background-color: var(--white);
  border-bottom: 1px solid var(--black);
  padding-block: 1.5rem;

  & *:not(ul) {
    height: 100%;
  }

  .container {
    position: relative;

    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-block: 0;
  }

  .logo-container {
    /* padding-block: 1.5rem; */
  }

  ul {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    display: flex;
    gap: 3rem;

    font-size: 1.8rem;
    text-transform: capitalize;
  }
`

export default Navbar
