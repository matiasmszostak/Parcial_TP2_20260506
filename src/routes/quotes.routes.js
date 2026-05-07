import express from 'express'
import authMiddleware from '../middleware/auth.middleware.js'
import { validateFavoriteBody } from '../middleware/validate.middleware.js'
import {
  getRandomQuote,
  getFavorites,
  addFavorite,
  deleteFavorite
} from '../controllers/quotes.controller.js'

const router = express.Router()

router.use(authMiddleware)

router.get('/random', getRandomQuote)
router.get('/favorites', getFavorites)
router.post('/favorites', validateFavoriteBody, addFavorite)
router.delete('/favorites/:id', deleteFavorite)

export default router