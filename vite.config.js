import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import netlifyEdge from "@netlify/vite-plugin-netlify-edge"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), netlifyEdge()],
})
