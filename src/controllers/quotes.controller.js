import * as quotesService from '../services/quotes.service.js'

export const getRandomQuote = async (_req, res) => {
  try {
    const quote = await quotesService.getRandomQuote()
    res.json(quote)
  } catch {
    res.status(503).json({ message: 'External service unavailable' })
  }
}

export const getFavorites = (_req, res) => {
  const favorites = quotesService.getAllFavorites()
  res.json({ favorites })
}

export const addFavorite = (req, res) => {
  const { quote, author } = req.body
  const newFavorite = quotesService.addFavorite(quote, author)
  res.status(201).json({ message: 'Favorite added', favorite: newFavorite })
}

export const deleteFavorite = (req, res) => {
  const id = parseInt(req.params.id)
  const result = quotesService.deleteFavorite(id)
  if (!result) return res.status(404).json({ message: 'Favorite not found' })
  res.json({ message: 'Favorite deleted' })
}