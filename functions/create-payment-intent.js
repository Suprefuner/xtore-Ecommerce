require("dotenv").config()

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

exports.handler = async function (event, context) {
  if (event.body) {
    const { cart, shippingFee, totalAmount } = JSON.parse(event.body)
    console.log(cart)

    const calcOrderAmount = () => shippingFee + totalAmount

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: calcOrderAmount(),
        currency: "hkd",
      })
      return {
        statusCode: 200,
        body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ msg: error.message }),
      }
    }
    return {
      statusCode: 200,
      body: JSON.stringify(cart),
    }
  }
  return {
    statusCode: 200,
    body: "create payment intent",
  }
}
