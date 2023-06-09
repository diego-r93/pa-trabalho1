const dbConfig = require("../config/db.config")

const mongoose = require("mongoose")
mongoose.Promise = global.Promise

const db = {}
db.mongoose = mongoose
db.url = dbConfig.url
db.board = require("./board.model.js")(mongoose)
db.user = require("./users.model.js")(mongoose)

module.exports = db