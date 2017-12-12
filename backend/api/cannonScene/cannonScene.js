const restful = require('node-restful')
const mongoose = restful.mongoose

const paramSchema = new mongoose.Schema({
  name: { type: String },
  channel: {type: Number },
  value: { type: Number }
})

const cannonSchema = new mongoose.Schema({
  name: { type: String },
  ip: { type: String },
  params: [paramSchema]
})

const cannonSceneSchema = new mongoose.Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  cannons: [cannonSchema]
})

module.exports = restful.model('CannonScene', cannonSceneSchema)