const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()

const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
  res.json(
    await User.find({}).populate('blogs', {
      url: 1,
      title: 1,
      author: 1,
      id: 1,
    })
  )
})

usersRouter.post('/', async (req, res) => {
  const { name, password: plainPassword, username } = req.body
  if (plainPassword.length < 3) {
    return res
      .status(400)
      .json({ err: 'Password cannot be shorter than 3 characters!!' })
  }
  const password = await bcrypt.hash(plainPassword, 10)
  const user = new User({ name, password, username })
  const savedUser = await user.save()
  return res.status(201).json(savedUser)
})

usersRouter.delete('/:id', async (req, res) => {
  const removed = await User.findByIdAndRemove(req.params.id)
  return res.status(204).send(removed)
})

module.exports = usersRouter
