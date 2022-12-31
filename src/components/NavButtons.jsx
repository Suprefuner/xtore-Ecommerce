import { useState } from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import styled from "styled-components"
import CartList from "./CartList"

import { FaUser, FaHeart, FaRegHeart, FaShoppingBag } from "react-icons/fa"

const NavButtons = () => {
  const [listShow, setListShow] = useState(false)
  const { user } = useSelector((store) => store.user)
  const { favorites } = useSelector((store) => store.favorite)
  const { totalItems } = useSelector((store) => store.cart)
  const { profileImg, profileColor, firstName, lastName } = user

  return (
    <Wrapper
      className="buttons-container"
      onMouseOver={() => {
        if (listShow) setListShow(true)
      }}
    >
      {user ? (
        <Link to="/profile">
          {profileImg ? (
            <img src={profileImg} alt="user's photo" className="profile-img" />
          ) : (
            <ProfileBG className="profile-img" bgColor={profileColor}>
              {firstName
                ? `${firstName[0]}${lastName[0]}`
                : `${lastName.slice(0, 2).toUpperCase()}`}
            </ProfileBG>
          )}
        </Link>
      ) : (
        <Link to="/register">
          <FaUser className="nav-icon" />
        </Link>
      )}
      <Link to="/favorite">
        {/* <FaHeart /> */}
        {favorites.length > 0 ? (
          <FaHeart className="nav-icon nav-icon-primary" />
        ) : (
          <FaRegHeart className="nav-icon" />
        )}
      </Link>
      <Link to="/cart">
        <div
          className="cart-container"
          onMouseOver={() => setListShow(true)}
          onMouseLeave={() => setListShow(false)}
        >
          {/* <AiFillShopping /> */}
          <FaShoppingBag className="nav-icon" />
          {totalItems ? <span>{totalItems}</span> : null}
        </div>
      </Link>

      {listShow ? (
        <div
          className="cart-list-container"
          onMouseLeave={() => setListShow(false)}
        >
          <CartList setListShow={setListShow} />
        </div>
      ) : null}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  gap: 2.5rem;

  padding-block: 0.7rem;
  position: relative;

  & > *:first-child {
    display: flex;
    align-items: center;
  }

  .nav-icon {
    font-size: 2.2rem;

    &-primary {
      color: var(--primary-500);
    }
  }

  .profile-img {
    --size: 3rem;
    width: var(--size);
    height: var(--size);
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

    &:hover .cart-list-container {
      display: block;
    }
  }

  .cart-list-container {
    position: absolute;
    bottom: -1.6rem;
    right: 0;

    transform: translate(0, 100%);

    width: clamp(35rem, 40vw, 40rem);
    height: auto;
  }
`

const ProfileBG = styled.div`
  color: white;
  font-size: 1.4rem;
  font-weight: var(--fw-semi);
  text-align: center;
  line-height: 3rem;
  background-color: ${(props) => props.bgColor};
`

export default NavButtons
