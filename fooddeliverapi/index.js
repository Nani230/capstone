const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
const userrouter = require("./routes/user");
const restaurantrouter = require("./routes/resturent");
const cartrouter = require("./routes/cart");
const orderrouter = require("./routes/order");
let port = process.env.PORT || 8000;

// uri string for mongo

// const uri =
//     "mongodb+srv://nani:user123@cluster0.zctbr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

app.use(express.json());
app.use(cors());
app.use("/user", userrouter);
app.use("/restaurantuser", restaurantrouter);
app.use("/cart", cartrouter);
app.use("/order", orderrouter);
// { useNewUrlParser: true, useUnifiedTopology: true }

mongoose
    .connect("mongodb://localhost:27017/deliveryapi")
    .then(() => console.log("mongodb connected"))
    .catch((err) => console.log(err));

app.listen(port, () => console.log("server is running at port number " + port));
