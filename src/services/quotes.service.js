import fetch from 'node-fetch'
import * as favoritesRepository from '../repositories/favorites.repository.js'

const EXTERNAL_API = 'https://zenquotes.io/api/random'

export const getRandomQuote = async () => {
  const response = await fetch(EXTERNAL_API)
  if (!response.ok) throw new Error('Service unavailable')
  const data = await response.json()
  return { quote: data[0].q, author: data[0].a }
}

export const getAllFavorites = () => {
  return favoritesRepository.findAll()
}

export const addFavorite = (quote, author) => {
  const newFavorite = {
    id: Date.now(),
    quote,
    author,
    createdAt: new Date().toISOString()
  }
  return favoritesRepository.save(newFavorite)
}

export const deleteFavorite = (id) => {
  return favoritesRepository.remove(id)
}