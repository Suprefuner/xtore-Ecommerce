import { useState } from "react"
import styled from "styled-components"

import { useSelector, useDispatch } from "react-redux"
import { FormRow } from "../components"
import { logoutUser, updateUserProfile } from "../features/user/userSlice"
import { getUserFromLocalStorage } from "../utils/localStorage"
import { auth } from "../firebase"

const ProfilePage = () => {
  const [formData, setFormData] = useState(getUserFromLocalStorage())
  const [isEdit, setIsEdit] = useState(false)
  const {
    title,
    lastName,
    firstName,
    email,
    birthday,
    profileImg,
    profileColor,
  } = formData
  const { isLoading } = useSelector((store) => store.user)

  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(updateUserProfile(formData))
    setIsEdit((prev) => !prev)
  }

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSignout = () => {
    dispatch(logoutUser())
  }

  // RETURN JSX ------------------------------------------------
  // SECTION
  return (
    <Wrapper>
      <div className="container">
        <div className="header">
          <h2>Profile</h2>
          <div className="img-container">
            {profileImg ? (
              <img src={profileImg} alt="avatar" />
            ) : (
              <ProfileColor className="img" fillColor={profileColor}>
                <span className="name">
                  {firstName
                    ? `${firstName[0]}${lastName[0]}`
                    : `${lastName.slice(0, 2).toUpperCase()}`}
                </span>
              </ProfileColor>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <FormRow
            type="email"
            name="email"
            value={email}
            handleChange={handleChange}
            disabled
          />

          <FormRow
            type="text"
            name="title"
            value={title}
            handleChange={handleChange}
            className={"col-1"}
            disabled={!isEdit}
          />
          <FormRow
            type="text"
            name="lastName"
            labelText="last name"
            value={lastName}
            handleChange={handleChange}
            className={"col-2"}
            disabled={!isEdit}
          />
          <FormRow
            type="text"
            name="firstName"
            labelText="first name"
            value={firstName}
            handleChange={handleChange}
            disabled={!isEdit}
          />
          <FormRow
            type="date"
            name="birthday"
            value={birthday}
            handleChange={handleChange}
            disabled={!isEdit}
          />

          <div className="btns-container">
            <button
              type="button"
              className="btn btn--fill-black"
              onClick={handleSignout}
            >
              sign out
            </button>
            {isEdit ? (
              <button
                type="submit"
                className="btn btn--fill-primary"
                disabled={isLoading}
                onClick={handleSubmit}
              >
                save change
              </button>
            ) : (
              <div
                className="btn btn--fill-black"
                disabled={isLoading}
                onClick={() => setIsEdit(true)}
              >
                edit
              </div>
            )}
          </div>
        </form>
      </div>
    </Wrapper>
  )
}

// STYLED COMPONENT -------------------------------------------------
// SECTION

const Wrapper = styled.main`
  min-height: calc(100vh - var(--nav-height) - 154px);
  padding-block: 5rem;

  display: grid;
  place-content: center;

  .container {
    border: 1px solid var(--black);
  }

  .header {
    background-color: black;
    margin-inline: -3rem;
    padding: 2rem 3rem;

    color: white;
    position: relative;
  }

  .img-container {
    --size: 12rem;
    width: var(--size);
    height: var(--size);

    position: absolute;
    right: 5rem;
    bottom: 0;
    transform: translateY(50%);

    border-radius: 50%;
    border: 5px solid var(--white);
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      scale: 1.02;
    }
  }

  form {
    width: 42rem;
    margin-top: 2rem;
    padding-block: 3rem;

    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;

    & > * {
      grid-column: 1/-1;
    }
  }

  .btns-container {
    display: flex;
    gap: 2rem;
    margin-top: 2rem;

    button,
    div {
      width: 50%;
      text-align: center;
    }
  }

  .col-1 {
    grid-column: 1/2;
  }

  .col-2 {
    grid-column: 2/4;
  }

  .smallest-width {
    width: min-content;
  }
`

const ProfileColor = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.fillColor};
  position: relative;

  .name {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    font-size: 3rem;
    font-weight: var(--fw-bold);
  }
`

export default ProfilePage
