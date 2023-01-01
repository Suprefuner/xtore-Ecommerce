import { useEffect, useState } from "react"
import styled from "styled-components"
import { loadStripe } from "@stripe/stripe-js"
import {
  CardElement,
  useStripe,
  Elements,
  useElements,
} from "@stripe/react-stripe-js"
import axios from "axios"
import { useSelector, useDispatch } from "react-redux"
import { formatPrice } from "../utils/helpers"
import { useNavigate } from "react-router"
import { clearCart } from "../features/cart/cartSlice"
import CartList from "./CartList"

const promise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

const CheckoutForm = () => {
  const { cart, totalAmount, shippingFee } = useSelector((store) => store.cart)
  const { user } = useSelector((store) => store.user)

  const [succeeded, setSucceeded] = useState(false)
  const [error, setError] = useState(null)
  const [processing, setProcessing] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [clientSecret, setClientSecret] = useState("")
  const stripe = useStripe()
  const elements = useElements()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  }

  const createPaymentIntent = async () => {
    try {
      const { data } = await axios.post(
        "/.netlify/functions/create-payment-intent",
        JSON.stringify({ cart, totalAmount, shippingFee })
      )
      setClientSecret(data.clientSecret)
    } catch (error) {
      console.error(error.response)
    }
  }

  useEffect(() => {
    createPaymentIntent()
  }, [])

  // for inputing the card info
  const handleChange = async (e) => {
    setDisabled(e.empty)
    setError(e.error ? e.error.message : "")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setProcessing(true)
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    })
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`)
      setProcessing(false)
    } else {
      setError(null)
      setProcessing(false)
      setSucceeded(true)
      setTimeout(() => {
        dispatch(clearCart())
        navigate("/")
      }, 5000)
    }
  }

  return (
    <Layout>
      {succeeded ? (
        <article>
          <h4>Thank you</h4>
          <h4>Your payment was successful!</h4>
          <h4>Redirecting to home page short</h4>
        </article>
      ) : (
        <article>
          <h4>
            Hello
            {user.firstName
              ? `, ${user.FirstName} ${user.lastName}`
              : `, ${user.lastName}`}
          </h4>
          <p>your total is {formatPrice(shippingFee + totalAmount)}</p>
          <p>test card number: 4242 4242 4242 4242</p>
        </article>
      )}
      <section>
        <form id="payment-form" onSubmit={handleSubmit}>
          <CardElement
            id="card-element"
            options={cardStyle}
            onChange={handleChange}
          />
          <button id="submit" disabled={processing || disabled || succeeded}>
            <span id="button-text">
              {processing ? (
                <div className="spinner" id="spinner"></div>
              ) : (
                "pay"
              )}
            </span>
          </button>
          {/* error --------------------------------------------- */}
          {error && (
            <div className="card-error" role="alert">
              {error}
            </div>
          )}
          {/* success --------------------------------------- */}
          <p className={succeeded ? "result-message" : "result-message hidden"}>
            payment succeeded, see the result in your{" "}
            <a href={`https://dashboard.stripe.com/test/payments`}>
              stripe dashboard
            </a>
            refresh the page to pay again
          </p>
        </form>
        <CartList />
      </section>
    </Layout>
  )
}

const StripeCheckout = () => {
  return (
    <Wrapper>
      <Elements stripe={promise}>
        <CheckoutForm />
      </Elements>
    </Wrapper>
  )
}

const Layout = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  article {
    text-align: center;

    h4 {
      margin-bottom: 1rem;
    }
    p {
      line-height: 1.3;
    }
  }

  section {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;

    @media (max-width: 640px) {
      grid-template-columns: 1fr;
    }
  }
`

const Wrapper = styled.section`
  form {
    width: clamp(38.5rem, 40vw, 50rem);
    align-self: start;
    box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
      0px 2px 5px 0px rgba(50, 50, 93, 0.1),
      0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
    border-radius: 7px;
    padding: 40px;
  }
  input {
    border-radius: 6px;
    margin-bottom: 6px;
    padding: 12px;
    border: 1px solid rgba(50, 50, 93, 0.1);
    max-height: 44px;
    font-size: 16px;
    width: 100%;
    background: white;
    box-sizing: border-box;
  }
  .result-message {
    line-height: 22px;
    font-size: 16px;
  }
  .result-message a {
    color: rgb(89, 111, 214);
    font-weight: 600;
    text-decoration: none;
  }
  .hidden {
    display: none;
  }
  #card-error {
    color: rgb(105, 115, 134);
    font-size: 16px;
    line-height: 20px;
    margin-top: 12px;
    text-align: center;
  }
  #card-element {
    border-radius: 4px 4px 0 0;
    padding: 12px;
    border: 1px solid rgba(50, 50, 93, 0.1);
    max-height: 44px;
    width: 100%;
    background: white;
    box-sizing: border-box;
  }
  #payment-request-button {
    margin-bottom: 32px;
  }
  /* Buttons and links */
  button {
    background: #5469d4;
    font-family: Arial, sans-serif;
    color: #ffffff;
    border-radius: 0 0 4px 4px;
    border: 0;
    padding: 12px 16px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    display: block;
    transition: all 0.2s ease;
    box-shadow: 0px 4px 5.5px 0px rgba(0, 0, 0, 0.07);
    width: 100%;
  }
  button:hover {
    filter: contrast(115%);
  }
  button:disabled {
    opacity: 0.5;
    cursor: default;
  }
  /* spinner/processing state, errors */
  .spinner,
  .spinner:before,
  .spinner:after {
    border-radius: 50%;
  }
  .spinner {
    color: #ffffff;
    font-size: 22px;
    text-indent: -99999px;
    margin: 0px auto;
    position: relative;
    width: 20px;
    height: 20px;
    box-shadow: inset 0 0 0 2px;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
  }
  .spinner:before,
  .spinner:after {
    position: absolute;
    content: "";
  }
  .spinner:before {
    width: 10.4px;
    height: 20.4px;
    background: #5469d4;
    border-radius: 20.4px 0 0 20.4px;
    top: -0.2px;
    left: -0.2px;
    -webkit-transform-origin: 10.4px 10.2px;
    transform-origin: 10.4px 10.2px;
    -webkit-animation: loading 2s infinite ease 1.5s;
    animation: loading 2s infinite ease 1.5s;
  }
  .spinner:after {
    width: 10.4px;
    height: 10.2px;
    background: #5469d4;
    border-radius: 0 10.2px 10.2px 0;
    top: -0.1px;
    left: 10.2px;
    -webkit-transform-origin: 0px 10.2px;
    transform-origin: 0px 10.2px;
    -webkit-animation: loading 2s infinite ease;
    animation: loading 2s infinite ease;
  }
  @keyframes loading {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @media only screen and (max-width: 600px) {
    form {
      width: 80vw;
    }
  }
`
export default StripeCheckout
