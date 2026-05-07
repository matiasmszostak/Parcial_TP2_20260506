import jwt from 'jsonwebtoken'

export default (_req, res, next) => {
  const authHeader = _req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No se proporcionó un token' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    _req.user = decoded
    next()
  } catch {
    return res.status(401).json({ message: 'Token inválido o expirado' })
  }
}