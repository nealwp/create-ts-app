import { middleware } from "./middleware"
import { router } from "./routes"
import { createServer } from "./server"

const PORT: number = 3000

const app = createServer(middleware, router)

app.listen(PORT, () => {
    const timestamp = new Date().toISOString()
    console.log(`[${timestamp}]: server started`)
})