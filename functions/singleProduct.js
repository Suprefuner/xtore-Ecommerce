const dotenv = require("dotenv")
dotenv.config()

const Airtable = require("airtable-node")
const airtable = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
})
  .base(process.env.AIRTABLE_BASE)
  .table(process.env.AIRTABLE_TABLE)

exports.handler = async (event, context, cb) => {
  const { id } = event.queryStringParameters
  if (id) {
    try {
      let product = await airtable.retrieve(id)
      if (product.error) {
        return {
          statusCode: 404,
          body: `We can't find this product with id: ${id}, please check again`,
        }
      }
      product = { id: product.id, ...product.fields }

      return {
        statusCode: 200,
        body: JSON.stringify(product),
      }
    } catch (err) {
      return {
        statusCode: 500,
        body: "Server error",
      }
    }
  }
  return {
    statusCode: 200,
    body: "single product",
  }
}
