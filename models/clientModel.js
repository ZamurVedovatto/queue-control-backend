const mongoose = require('mongoose')
const validator = require('validator')

const Schema = mongoose.Schema

const clientSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: false,
        unique: true
    },
    whatsapp: {
        type: String,
        required: false,
        unique: true
    }
}, { timestamps: true })

// static register method
clientSchema.statics.register = async function(name, email, whatsapp) {
    // validation
    if (!name) {
        throw Error('Name must be filled')
    }
    if (email && !validator.isEmail(email)) {
        throw Error('Email must be valid')
    }
    if (whatsapp && !validator.isMobilePhone(whatsapp.toString(), 'pt-BR')) {
        throw Error('Whatsapp must be valid')
    }

    const exists = await this.findOne({$or:[{email},{whatsapp}]})
    if(exists) return exists
    else {
        const client = await this.create({ name, email, whatsapp })
        return client
    }
}

module.exports = mongoose.model('Client', clientSchema)
