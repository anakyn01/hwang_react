import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  //오지랖 넓게 텐서는 건들지마
  optimizeDeps:{
    exclude:['@tensorflow/tfjs',
      '@tensorflow/tfjs-core',
      '@tensorflow/tfjs-backend-webgl']
  }
})
