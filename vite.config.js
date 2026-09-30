import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      // Windows `fs.watch` throws EBUSY when it attaches to a file that is
      // still locked by whatever is writing it, and an unhandled error on the
      // watcher kills the dev server outright. Dropping an icon or an image
      // into assets/ was enough to take the server down mid-session.
      //
      // Polling never touches a locked handle, and awaitWriteFinish waits for
      // the file size to settle before reporting a change, so large images do
      // not trigger a reload while they are still being copied.
      usePolling: true,
      interval: 300,
      awaitWriteFinish: {
        stabilityThreshold: 400,
        pollInterval: 50,
      },
    },
  },
})
