import mongoose from 'mongoose'
const coverageAreaSchema = new mongoose.Schema({
  _id: false,
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
  _id: false,
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
  _id: String,
  tradingName: { type: String, required: true },
  ownerName: { type: String, required: true },
  document: { type: String, required: true, index: true, unique: true },
  coverageArea: { type: coverageAreaSchema, index: '2dsphere' },
  address: { type: addressSchema, index: '2dsphere' }
}, { _id: false })

const partnerSchemaModel = mongoose.model('Partner', partnerSchema)
partnerSchemaModel.createIndexes()
export default partnerSchemaModel
