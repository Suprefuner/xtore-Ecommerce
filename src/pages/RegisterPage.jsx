import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import styled from "styled-components"

import { useSelector, useDispatch } from "react-redux"
import {
  loginUser,
  loginUserWithGoogle,
  registerUser,
  resetPassword,
} from "../features/user/userSlice"

import { FormRow } from "../components"
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import { FaGoogle } from "react-icons/fa"
import { toast } from "react-toastify"

const RegisterPage = () => {
  const initialState = {
    title: "",
    lastName: "",
    firstName: "",
    email: "",
    password: "",
    birthday: "",
    profileImg: "",
  }

  const [formData, setFormData] = useState(initialState)
  const [showPassword, setShowPassword] = useState(false)
  const [formMode, setFormMode] = useState("sign in")
  const { title, lastName, firstName, email, password, birthday, profileImg } =
    formData

  const { user, isLoading } = useSelector((store) => store.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/")
      }, 1000)
    }
  }, [user])

  const handleLoginWithGoogle = (navigate) => {
    dispatch(loginUserWithGoogle(navigate))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (
      !email ||
      (formMode !== "forgot password" && !password) ||
      (formMode === "sign up" && !title) ||
      (formMode === "sign up" && !lastName)
    ) {
      toast.error("please fill all")
      return
    }

    if (formMode === "sign in") {
      dispatch(loginUser({ email, password }))
      return
    }

    if (formMode === "sign up") {
      dispatch(registerUser({ ...formData }))
      return
    }

    if (formMode === "forgot password") {
      dispatch(resetPassword(email))
      return
    }
  }

  const handleChange = (e) => {
    setFormData((prev) => {
      if (e.target.files) {
        console.log(e.target.files[0])
        return { ...prev, profileImg: e.target.files[0] }
      }

      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  // RETURN JSX ------------------------------------------------
  // SECTION
  return (
    <Wrapper>
      <div className="container">
        <div className="header">
          <h2>{formMode}</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <FormRow
            type="email"
            name="email"
            value={email}
            handleChange={handleChange}
          />

          {formMode !== "forgot password" ? (
            <FormRow
              type="password"
              name="password"
              value={password}
              handleChange={handleChange}
              showPassword={showPassword}
            >
              <button
                type="button"
                className="btn-eye"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </button>
            </FormRow>
          ) : null}

          {formMode === "sign up" ? (
            <>
              <FormRow
                type="text"
                name="title"
                value={title}
                handleChange={handleChange}
                className={"col-1"}
              />
              <FormRow
                type="text"
                name="lastName"
                labelText="last name"
                value={lastName}
                handleChange={handleChange}
                className={"col-2"}
              />
              <FormRow
                type="text"
                name="firstName"
                labelText="first name"
                value={firstName}
                handleChange={handleChange}
              />
              <FormRow
                type="date"
                name="birthday"
                value={birthday}
                handleChange={handleChange}
              />
              <FormRow
                type="file"
                name="profileImg"
                handleChange={handleChange}
                accept=".jpg, .png, .jpeg"
              />
            </>
          ) : null}

          <div className="text">
            <span>
              {formMode === "sign up" || formMode === "forgot password"
                ? "Already a member? "
                : "Not a member yet? "}
              <span
                className="text-btn btn-register"
                onClick={() =>
                  setFormMode((prev) => {
                    if (prev === "sign up" || prev === "forgot password")
                      return "sign in"
                    if (prev === "sign in" || prev === "forgot password")
                      return "sign up"
                  })
                }
              >
                {formMode === "sign up" || formMode === "forgot password"
                  ? "Sign in"
                  : "Register"}
              </span>
            </span>
            <span
              className="text-btn btn-forgot-pw"
              onClick={() => setFormMode("forgot password")}
            >
              Forgot password?
            </span>
          </div>
          <button
            className="btn btn--fill-black"
            disabled={isLoading}
            onSubmit={handleSubmit}
          >
            {formMode === "sign up"
              ? "register"
              : formMode === "sign in"
              ? "sign in"
              : "send reset password email"}
          </button>
          <hr />
          <button
            type="button"
            className="btn btn--fill-primary btn-google"
            disabled={isLoading}
            onClick={() => handleLoginWithGoogle(navigate)}
          >
            <FaGoogle />
            <span>sign in with google</span>
          </button>
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
  }

  form {
    width: 42rem;
    padding-block: 3rem;

    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;

    & > * {
      grid-column: 1/-1;
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

  .btn-eye {
    position: absolute;
    bottom: 0.5rem;
    right: 2rem;
    font-size: 2rem;
  }

  .btn-google {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
  }

  .text {
    display: flex;
    justify-content: space-between;
    font-size: 1.4rem;
    padding-inline: 1rem;
    margin-block: -0.5rem 2rem;

    .btn-register {
      color: var(--primary-500);
    }

    .btn-forgot-pw {
      color: var(--grey-400);
    }
  }
`

export default RegisterPage
