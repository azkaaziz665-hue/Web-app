import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'apk-mime-type',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url && req.url.endsWith('.apk')) {
            res.setHeader('Content-Type', 'application/vnd.android.package-archive')
            res.setHeader('Content-Disposition', 'attachment; filename="inco-coffee.apk"')
          }
          next()
        })
      },
    },
  ],
})
