const dotenv = require("dotenv")
dotenv.config()

const Airtable = require("airtable-node")
const airtable = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
})
  .base(process.env.AIRTABLE_BASE)
  .table(process.env.AIRTABLE_TABLE)

exports.handler = async (event, context, cb) => {
  try {
    const res = await airtable.list({ maxRecords: 200 })

    const products = res.records.map((product) => {
      const { id, fields } = product
      const { images } = fields
      const { url } = images[0]
      return {
        id,
        ...fields,
        image: url,
      }
    })

    return {
      statusCode: 200,
      body: JSON.stringify(products),
    }
  } catch (err) {
    return {
      statusCode: 500,
      body: "there was en error",
    }
  }
}
