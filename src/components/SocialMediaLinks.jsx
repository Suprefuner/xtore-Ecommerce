import React from "react"
import styled from "styled-components"
import { BsInstagram, BsTwitter, BsFacebook } from "react-icons/bs"

const SocialMediaLinks = () => {
  return (
    <Wrapper>
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
    </Wrapper>
  )
}

const Wrapper = styled.ul`
  display: flex;
  gap: 2rem;
  font-size: 2.5rem;
  margin-left: 1rem;

  li {
    transition: all 0.2s;

    &:hover {
      transform: translateY(-0.3rem);
    }

    a {
      color: var(--grey-400);

      &:hover {
        color: var(--primary-500);
      }
    }
  }
`

export default SocialMediaLinks
