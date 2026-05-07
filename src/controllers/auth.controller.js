import jwt from 'jsonwebtoken'

const USERS = [{ username: 'alumno', password: '123456' }]

export const login = (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ message: 'El usuario y la contraseña son requeridos' })
  }

  const user = USERS.find(u => u.username === username && u.password === password)

  if (!user) {
    return res.status(401).json({ message: 'Credenciales inválidas' })
  }

  const token = jwt.sign(
    { username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '2h' }
  )

  res.json({ token, user: { username: user.username } })
}