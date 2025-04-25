import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/users': 'http://localhost:5001',
      '/services': 'http://localhost:5001',
      '/projects': 'http://localhost:5001',
      '/proposals': 'http://localhost:5001',
      '/conversations': 'http://localhost:5001',
      '/messages': 'http://localhost:5001',
      '/service_ratings': 'http://localhost:5001',
      '/userRatings': 'http://localhost:5001',
      // Add other endpoints as needed
    }
  }
})