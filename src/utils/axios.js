import axios from "axios";
import { airtable_base_url } from "./constants";


const airtableFetch = axios.create({
  baseURL: airtable_base_url,
  headers: {
    Authorization: `Bearer ${process.env.VITE_AIRTABLE_PERSONAL_KEY}`
  }
})
// const airtableFetch = axios.create({
//   baseURL: airtable_base_url,
//   headers: {
//     Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_PERSONAL_KEY}`
//   }
// })

export default airtableFetch