import fetch from 'node-fetch'
import fs from 'fs'
import path from 'path'

const EXTERNAL_API = 'https://zenquotes.io/api/random'
const DATA_PATH = path.resolve('./data/favorites.json')

const readData = () => {
  let data = []
  try {
    data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'))
  } catch {
    // si no existe, devuelve array vacio
  }
  return data
}

const writeData = (data) => {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2))
}

export const getRandomQuote = async () => {
  const response = await fetch(EXTERNAL_API)
  if (!response.ok) throw new Error('Service unavailable')
  const data = await response.json()
  return { quote: data[0].q, author: data[0].a }
}

export const getAllFavorites = () => {
  return readData()
}

export const addFavorite = (quote, author) => {
  const favorites = readData()

  const newFavorite = {
    id: Date.now(),
    quote,
    author,
    createdAt: new Date().toISOString()
  }

  favorites.push(newFavorite)
  writeData(favorites)
  return newFavorite
}

export const deleteFavorite = (id) => {
  const favorites = readData()
  const index = favorites.findIndex(f => f.id === id)
  
  if (index !== -1) {
    favorites.splice(index, 1)
    writeData(favorites)
  }

  return index !== -1 ? true : null
}