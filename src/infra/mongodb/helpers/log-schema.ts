import mongoose from 'mongoose'
const logSchema = new mongoose.Schema({  
  message: {
    type: String,   
    required: true
  },
  date: {
    type: Date,
    required: true
  }
})

const logSchemaModel = mongoose.model('Log', logSchema)
export default logSchemaModel