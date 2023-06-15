module.exports = app => {
  // const users = require("../database/firestore/controllers/firestore.controller.js")
  const users = require("../database/mongodb/controllers/users.controller.js")

  var router = require("express").Router()

  router.post('/', users.create)

  router.get('/', users.findAll)

  router.get("/:id", users.findOne)

  router.put("/:id", users.update)

  router.delete("/:id", users.delete)

  app.use("/users", router)
}