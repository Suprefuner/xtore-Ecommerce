import styled from "styled-components"
import logoSm from "../assets/images/xtore_logo-sm.svg"

const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <Wrapper>
      <img src={logoSm} alt="logo" />
      <span>&copy; {year} Xtore</span>
    </Wrapper>
  )
}

const Wrapper = styled.footer`
  margin-bottom: 0;

  /* position: absolute;
  left: 0;
  right: 0;
  bottom: 0; */

  color: white;
  font-size: 1.2rem;
  background-color: var(--grey-500);

  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  img {
    width: 4rem;
    margin: auto;
    padding-top: 6rem;
    filter: brightness(0) invert(0.7);
  }

  span {
    display: block;
    text-align: center;
    padding-bottom: 2.5rem;
  }
`

export default Footer
