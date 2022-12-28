import axios from "axios"
import { products_url } from "./constants"

const customFetch = axios.create({
  baseURL: products_url,
})
// const customFetch = axios.create({
//   baseURL: `https://api.airtable.com/v0/apparH8rXXkWbglmW/products?api_key=${
//     import.meta.env.VITE_AIRTABLE_API_KEY
//   }`,
// })

export default customFetch
