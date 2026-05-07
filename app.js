import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import authRoutes from './src/routes/auth.routes.js'
import quotesRoutes from './src/routes/quotes.routes.js'

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/quotes', quotesRoutes)

app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint not found' })
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Internal server error' })
})

export default app