import z from 'zod'

const userSchema = z.object({
  username: z.string({
    invalid_type_error: 'Username must be a string',
    required_error: 'Username is required'
  }).min(3, 'Username must be at least 3 characters long'),
  password: z.string().min(8, 'Password must be at least 8 characters long')
})

export function validateUser (object) {
  return userSchema.safeParse(object)
}
