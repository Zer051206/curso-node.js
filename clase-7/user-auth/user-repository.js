import crypto from 'node:crypto'

import { validateUser } from '../schemas/schemas.js'
import DBlocal from 'db-local'
import bcrypt from 'bcrypt'

const { Schema } = new DBlocal({ path: '../db' })

const User = Schema('User', {
  _id: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true }
})

export class UserRepository {
  static async create ({ username, password }) {
    // ? 1. Validaciones del username (opcional: usar zod, etc)
    // ? 2. Validaciones del password (opcional: usar zod, etc)
    const result = validateUser({ username, password })

    if (result.error) {
      throw new Error(result.error.issues.map(issue => issue.message).join(', '))
    }

    const newUser = { ...result.data }

    // ! 3. Asegurarse que el username NO existe en la base de datos
    const user = await User.findOne({ username })
    if (user) throw new Error('Username already exists')

    const id = crypto.randomUUID()

    const hashedPassword = await bcrypt.hash(newUser.password, 10)

    newUser._id = id
    newUser.password = hashedPassword

    User.create(newUser).save()

    return id
  }

  static async login ({ username, password }) {
    const result = validateUser({ username, password })

    if (result.error) {
      throw new Error(result.error.issues.map(issue => issue.message).join(', '))
    }

    const user = await User.findOne({ username })
    if (!user) throw new Error('Username does not exist')

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) throw new Error('Password is invalid')

    const { password: _, ...publicUser } = user

    return publicUser
  }
}
