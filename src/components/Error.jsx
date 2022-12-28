import React from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { links } from "../utils/constants"
import errorImg from "../assets/images/home/error-img.jpg"

const Error = () => {
  return (
    <Wrapper>
      <section className="container">
        <div className="img-container">
          <img src={errorImg} alt="clothing" />
        </div>
        <article>
          <div className="text">
            <h2>oops!</h2>
            <p>Can't find the page you're looking for</p>
            <p>Here are some helpful links instead</p>
          </div>
          <ul>
            {links.map(({ id, text, url }) => (
              <li key={id}>
                <Link to={url} className="btn btn--stroke">
                  {text}
                </Link>
              </li>
            ))}
          </ul>
        </article>
      </section>
    </Wrapper>
  )
}

const Wrapper = styled.main`
  /* FIXME */
  min-height: calc(100vh - var(--nav-height) - 154px);
  display: flex;
  align-items: center;

  section {
    height: 80%;
    display: flex;
    align-items: center;

    & > * {
      flex: 1;
    }
  }

  .img-container,
  img {
    height: 100%;
  }

  article {
    display: grid;
    place-content: center;
    gap: 2rem;

    height: 100%;
    text-align: center;

    h2 {
      font-size: 6rem;
    }

    p {
      font-size: 1.8rem;
      line-height: 1.5;
    }

    ul {
      width: min-content;
      margin-inline: auto;

      & > *:not(:last-child) {
        margin-bottom: 1rem;
      }
    }

    .btn {
      width: 100%;
    }
  }
`

export default Error
