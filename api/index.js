const express = require("express")
const fs = require("fs")
const path = require("path")

const Payload = require("./models/Payload")


// setup enviroment variable
require("dotenv").config()
// initiate the database connection
require("./config/db").startDB([
    async () => {
        try {
            const data = fs.readFileSync(path.join(__dirname, "..", "data"), "utf-8")
            const payload = await Payload.insertMany(JSON.parse(data))
            console.log(payload)
        } catch (error) {
            console.log(error)
        }
    }
])


const app = express()


app.get("/", async function (req, res) {
    res.status(404).json({
        message: "No resources here",
        success: false,
        status: res.statusCode
    })
})


app.get("/resources", async function (req, res) {
    try {

        const payload = await Payload.find({})

        res.status(200).json({
            message: "Resources fetched successfully",
            success: true,
            status: res.statusCode,
            data: payload
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "something went wrong",
            success: false,
            status: res.statusCode
        })
    }
})


const PORT = process.env.PORT || 6000
app.listen(PORT, console.log("Server Started at port:", PORT))