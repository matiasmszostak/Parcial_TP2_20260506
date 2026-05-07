import fs from 'fs'
import path from 'path'

const DATA_PATH = path.resolve('./data/favorites.json')

const readData = () => {
  let data = []
  try {
    data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'))
  } catch {
    // si el archivo no existe o está corrupto, devuelve array vacío
  }
  return data
}

const writeData = (data) => {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2))
}

export const findAll = () => {
  return readData()
}

export const save = (favorite) => {
  const favorites = readData()
  favorites.push(favorite)
  writeData(favorites)
  return favorite
}

export const remove = (id) => {
  const favorites = readData()
  const index = favorites.findIndex(f => f.id === id)

  if (index !== -1) {
    favorites.splice(index, 1)
    writeData(favorites)
  }

  return index !== -1 ? true : null
}