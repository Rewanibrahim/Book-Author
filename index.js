import express from 'express'
import connectionDB from './db/connectionDB.js'
import bookRouter from './src/modules/book/book.routes.js'
import authRouter from './src/modules/author/author.routes.js'
const app = express()
const port = 3000

app.use(express.json())
app.use("/books",bookRouter)
app.use("/authors",authRouter)
connectionDB()



app.use('/', (req , res) => res.status(404).json('404 Page not found'))

app.listen(port, () => console.log(`Example on port ${port}!`))