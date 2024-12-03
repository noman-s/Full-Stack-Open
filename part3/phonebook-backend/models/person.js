const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)

console.log('connecting to', url)
mongoose
  .connect(url)
  .then((result) => {
    console.log('connected to MongoDB', result)
  })
  .catch((error) => {
    console.log('error connecting to MongoDB', error)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 5,
    required: [true, 'Person\'s name is required'],
  },
  number: {
    type: String,
    validate: {
      validator: function (number) {
        return /^\d{2,3}-\d+$/.test(number)
      },
      message: (props) => `${props.value} is not a valid phone number`,
    },
    minLength: 8,
    required: [true, 'Person\'s number is required'],
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

module.exports = mongoose.model('Person', personSchema)
