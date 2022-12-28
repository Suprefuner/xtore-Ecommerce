import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import styled from "styled-components"

import { FaUser, FaHeart, FaRegHeart, FaShoppingBag } from "react-icons/fa"

const NavButtons = () => {
  const { user } = useSelector((store) => store.user)
  const { totalItems } = useSelector((store) => store.cart)

  return (
    <Wrapper className="buttons-container">
      {user ? (
        <Link to="/profile">
          {user.profileImg ? (
            <img
              src={user.profileImg}
              alt="user's photo"
              className="profile-img"
            />
          ) : (
            <div className="profile-img"></div>
          )}
        </Link>
      ) : (
        <Link to="/register">
          <FaUser />
        </Link>
      )}

      <Link to="/favorite">
        {/* <FaHeart /> */}
        <FaRegHeart />
      </Link>
      <Link to="/cart">
        <span className="cart-container">
          {/* <AiFillShopping /> */}
          <FaShoppingBag />
          {totalItems ? <span>{totalItems}</span> : null}
        </span>
      </Link>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  gap: 2.5rem;
  font-size: 2.2rem;
  /* hard code value */
  padding-block: 0.7rem;

  & > *:first-child {
    display: flex;
    align-items: center;
  }

  .profile-img {
    --size: 3rem;
    width: var(--size);
    height: var(--size);
    background-color: pink;
    outline: 3px solid var(--primary-300);
    border-radius: 50%;
  }
  .cart-container {
    display: inline-block;
    position: relative;

    span {
      --size: 2.7rem;

      display: inline-block;
      width: var(--size);
      height: var(--size);

      position: absolute;
      top: 0;
      right: 0;
      transform: translate(55%, -45%);

      color: white;
      font-size: 1.5rem;
      line-height: var(--size);
      text-align: center;

      background-color: var(--primary-500);
      border-radius: 50%;
    }
  }
`

export default NavButtons
