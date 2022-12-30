import React from "react"
import styled from "styled-components"
import logo from "../assets/images/xtore_logo-x.svg"

const Loading = () => {
  return (
    <Wrapper>
      <div className="loading"></div>
      <div className="img-container">
        <img src={logo} alt="logo" />
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: calc(100vh - 7rem - 154px);
  width: 100%;
  position: relative;

  display: flex;
  justify-content: center;

  .img-container {
    width: 3rem;
    margin-top: 17rem;
  }

  .loading {
    position: absolute;
    top: 15rem;
    left: 0;
    right: 0;
  }
`

export default Loading
