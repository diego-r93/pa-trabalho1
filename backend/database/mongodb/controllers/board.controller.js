const db = require("../models");
const Board = db.board;

// Create and Save a new Board
exports.create = (req, res) => {
  // Validate request
  if (!req.body.pumperCode) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Board
  const board = new Board({
    pumperCode: req.body.pumperCode,
    pumperName: req.body.pumperName,
    pulseDuration: req.body.pulseDuration,
    driveTimes: req.body.driveTimes,
    user: req.userData._id,
  });

  // Save Board in the database
  board
    .save(board)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Board."
      });
    });
};

// Retrieve all Boards from the database.
exports.findAll = (req, res) => {
  let filter = {
    user: req.userData._id
  }

  Board.find(filter)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving boards."
      });
    });
};

// Find a single Board with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  const userId = req.userData._id;
  
  Board.findOne({
    _id: id,
    user: userId,
  })
    .then(data => {
      if (!data)
        res.status(404).send({ message: `Not found Board with id ${id}` });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: `Error retrieving Board with id=${id}` });
    });
};

// Update a Board by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;
  const userId = req.userData._id;

  Board.findOneAndUpdate({
    _id: id,
    user: userId,
  }, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Board with id=${id}. Maybe Board was not found!`
        });
      } else res.send({ message: "Board was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Board with id=" + id
      });
    });
};

// Delete a Board with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  const userId = req.userData._id;

  Board.findOneAndRemove({
    _id: id,
    user: userId,
  }, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Board with id=${id}. Maybe Board was not found!`
        });
      } else {
        res.send({
          message: "Board was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Could not delete Board with id=${id}`
      });
    });
};

// Delete all Boards from the database.
exports.deleteAll = (req, res) => {
  Board.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Boards were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all boards."
      });
    });
};

