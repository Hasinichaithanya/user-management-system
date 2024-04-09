const express = require("express");
const mongodb = require("mongodb");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const app = express();

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());
app.use(cors());

var db;
var users;
const uri =
  "mongodb+srv://hasinichaithanya04:6hr9XjbxpsanJlOJ@cluster0.suc7fzf.mongodb.net/user_test_data?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

function Connect() {
  client
    .connect()
    .then((res) => {
      console.log("Connected to db");
      db = client.db("user_test_data");
      users = db.collection("users");
    })
    .catch((err) => {
      console.error("Error connecting : ", err.message);
      process.exit(1);
    });
}
Connect();

//get all users api
app.get("/get-all", async (req, res) => {
  users
    .find({})
    .toArray()
    .then((usersList) =>
      res.status(200).json({
        message: "Data is successfully fetched",
        total_count: usersList.length,
        usersList,
      })
    )
    .catch((e) => {
      res.status(400).json("Error fetching the data:", e.message);
      console.log(err);
    });
});

//add user api
app.post("/add-user", (req, res) => {
  const userDetails = req.body;
  if (Object.keys(userDetails).length == 0)
    return res.status(404).json({ message: "Cannot add empty user!" });
  users
    .insertOne(userDetails)
    .then((userDetails) =>
      res.status(200).json({
        message: "User is added successfully",
        userDetails,
        success: true,
      })
    )
    .catch((e) => {
      res.status(400).json("Error: ", e);
      console.log(err);
    });
});

//get user based on id
app.get("/get-user/:id", async (req, res) => {
  const { id } = req.params;
  var message;
  if (!mongodb.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid User ID" });
  }
  users
    .findOne({ _id: new mongodb.ObjectId(id) })
    .then((userDetails) => {
      if (userDetails !== null) {
        message = "User details are fetched successfully";
      } else {
        message = "No user is found from the given ID";
      }

      res.status(200).json({
        message,
        userDetails,
      });
    })
    .catch((e) => {
      res.status(400).json("Error: ", e);
      console.log(err);
    });
});

//get users based on query params
app.get("/get-paginated", async (req, res) => {
  const page = parseInt(req.query.page);
  const size = parseInt(req.query.size);
  if (page <= 0) {
    return res.status(400).json({
      message: "Invalid page size, page size must be greater than 0",
      success: false,
    });
  }
  if (size <= 0) {
    return res.status(400).json({
      message: "Invalid size, size must be greater than 0",
      success: false,
    });
  }
  users
    .find({})
    .skip((page - 1) * size)
    .limit(size)
    .toArray()
    .then((result) => {
      res.status(200).json({ message: "Fetched successfully", result });
    })
    .catch((e) => {
      res.status(400).json("Error: ", e.message);
    });
});

//update user details based on the Id(put reqest)
app.put("/update-user/:id", async (req, res) => {
  const { id } = req.params;
  const { name, password, email } = req.body;
  if (!mongodb.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid User ID" });
  }
  users
    .updateOne(
      { _id: new mongodb.ObjectId(id) },
      { $set: { name, password, email } }
    )
    .then((response) =>
      res.status(200).json({
        message: "User is updated successfully",
        response,
      })
    )
    .catch((err) => {
      console.error("Error updating the user: ", err);
      res.status(400).json({
        message: "Could not update the user",
        success: false,
      });
    });
});

//update user details based on the Id(patch reqest)
app.patch("/update-user/", async (req, res) => {
  const { id } = req.query;
  const { name, email, password } = req.body;

  if (!mongodb.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid User ID" });
  }
  const fieldsProvided = Object.keys(req.body);
  if (fieldsProvided.length !== 1) {
    return res.status(400).json({
      success: false,
      message: "Only one field can be provided for update",
    });
  }

  let updateField;
  if (name !== undefined) updateField = { name };
  else if (email !== undefined) updateField = { email };
  else if (password !== undefined) updateField = { password };
  else {
    return res.status(400).json({
      success: false,
      message: "No valid fields provided for update",
    });
  }
  users
    .updateOne({ _id: new mongodb.ObjectId(id) }, { $set: updateField })
    .then((response) =>
      res.status(200).json({
        message: "User is updated successfully",
        response,
      })
    )
    .catch((err) => {
      console.error("Error updating the user: ", err);
      res.status(400).json({
        message: "Could not update the user",
        success: false,
      });
    });
});

//delete user based on id
app.delete("/delete-user/:id", async (req, res) => {
  const id = req.params.id;
  if (!mongodb.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid user ID" });
  }
  users
    .deleteOne({ _id: new mongodb.ObjectId(id) })
    .then((response) => {
      res.status(200).json({
        success: true,
        message: "User is deleted successfully",
        response,
      });
    })
    .catch((e) => {
      res.status(400).json("Error: ", e);
      console.log(e);
    });
});
module.exports = app.listen(5000, () =>
  console.log("Server is running, listening to port 5000")
);
