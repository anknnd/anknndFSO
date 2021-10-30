const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI
console.log('connecting to', url)

mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        unique: true,
        required: true
    },
    number: {
        type: String,
        validate: {
            validator: function (v) {
                return /^\d([- ]?\d){7,}$/gm.test(v);
            },
            message: props => `${props.value} is not a valid phone number. The phone number must have at least 8 digits separated by space or hyphen.`
        },
        required: true
    }
})
personSchema.plugin(uniqueValidator);

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)
