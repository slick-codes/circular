const mongoose = require("mongoose")


const schema = new mongoose.Schema({
    pageNumber: { type: String, required: false },
    reference: { type: String, required: false },
    title: { type: String, required: false },
    timestamp: { type: String, required: false }
})



const Payload = mongoose.model("Payload", schema)
module.exports = Payload