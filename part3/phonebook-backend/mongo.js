const mongoose = require('mongoose')

if (
  process.argv.length < 3 ||
  process.argv.length === 4 ||
  process.argv.length > 5
) {
  console.log(
    'You need to password along with the name and number as an argument, in that order',
  )
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@fullstackopen.gvqou.mongodb.net/notesApp?retryWrites=true&w=majority&appName=fullstackopen`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  Person.find({}).then((result) => {
    console.log('phonebook:')
    result.forEach((person) => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
} else if (process.argv.length === 5) {
  const name = process.argv[3]
  const number = process.argv[4]
  const newPerson = Person({
    name: name,
    number: number,
  })
  newPerson.save().then((result) => {
    console.log(
      `added ${result.name}'s number ${result.number} to the phonebook`,
    )
    mongoose.connection.close()
  })
}
