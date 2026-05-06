export const validateFavoriteBody = (req, res, next) => {
  const body = req.body
  const { quote, author } = body

  if (!body || Object.keys(body).length === 0) {
    return res.status(400).json({ message: 'El body de la solicitud es requerido' })
  }

  if (!quote && !author) {
    return res.status(400).json({ message: 'Los campos quote y author son requeridos' })
  }

  if (!quote) {
    return res.status(400).json({ message: 'El campo quote es requerido' })
  }

  if (!author) {
    return res.status(400).json({ message: 'El campo author es requerido' })
  }

  if (typeof quote !== 'string' || typeof author !== 'string') {
    return res.status(400).json({ message: 'Los campos quote y author deben ser strings' })
  }

  if (quote.trim() === '') {
    return res.status(400).json({ message: 'El campo quote no puede estar vacío' })
  }

  if (author.trim() === '') {
    return res.status(400).json({ message: 'El campo author no puede estar vacío' })
  }

  next()

}