import mongoose from 'mongoose'

const coverageAreaSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['MultiPolygon'],
    required: true
  },
  coordinates: {
    type: [[[[Number]]]],
    required: true
  }
})

const addressSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true
  },
  coordinates: {
    type: [Number],
    required: true
  }
})

const partnerSchema = new mongoose.Schema({
  tradingName: { type: String, required: true },
  ownerName: { type: String, required: true },
  document: { type: String, required: true, index: true, unique: true },
  coverageArea: coverageAreaSchema,
  address: addressSchema
})

const partnerSchemaModel = mongoose.model('Partner', partnerSchema)
partnerSchemaModel.createIndexes()

export default partnerSchemaModel
