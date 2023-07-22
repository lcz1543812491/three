import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// const demo = defineConfig({
//   plugins: [react()],
// })

// console.log('defineConfig', demo);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.jpg', '**/*.hdr', '**/*.gltf'],
})
