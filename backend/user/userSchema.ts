import mongoose from 'mongoose'

const user = new mongoose.Schema({
  id: Number,
  first_name: String,
  last_name: String,
  email: String,
  gender: String,
  income: Number,
  city: String,
  car: String,
  quote: String,
  phone_price: Number
})


const User = mongoose.model('User', user)
export default User
