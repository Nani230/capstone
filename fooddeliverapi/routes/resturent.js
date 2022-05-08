const express = require("express");
const bcrypt = require("bcryptjs");
const usermodal = require("../modals/restaurantmodal");
const itemmodal = require("../modals/fooditems");
const verifytoken = require("../middlewear/restarentverify");
const rout = express.Router();
const jwt = require("jsonwebtoken");
const formidable = require("formidable");
const fs = require("fs");
const restaurant = require("../middlewear/Restarurent");

// restarent register
rout.post("/register", (req, res) => {
    const form = new formidable.IncomingForm();

    form.parse(req, (err, feilds, files) => {
        if (err === null) {
            console.log(feilds);
            console.log(files);
            let newFilename =
                files.image.newFilename +
                "." +
                files.image.originalFilename.split(".")[1];
            fs.rename(
                files.image.filepath,
                `./restarentimages/images/${newFilename}`,
                (err) => {
                    if (err !== null) {
                        console.log(err);
                        res.status(400).send({
                            message: "Unable to Create food item",
                            success: false,
                        });
                    } else {
                        console.log(err);
                    }
                }
            );
            let foodData = feilds;
            foodData.posterurl = newFilename;
            // let useritem = req.body;
            bcrypt.genSalt(10, (err, salt) => {
                if (err === null) {
                    bcrypt.hash(foodData.password, salt, (err, newpass) => {
                        if (err === null) {
                            foodData.password = newpass;
                            let userobj = new usermodal(foodData);
                            userobj
                                .save()
                                .then(() => {
                                    res.send({ message: "registred succus" });
                                })
                                .catch((err) => console.log(err));
                        } else {
                            res.send({
                                message: "something wrong in registration",
                            });
                        }
                    });
                }
            });
        } else {
            console.log(err);
            res.status(500).send({
                message: "Unable to Create Food Item",
                success: false,
            });
        }
    });
});
// geting restaurant poster image
rout.get("/resImage/:filename", (req, res) => {
    res.download(`./restarentimages/images/${req.params.filename}`);
});

//
// restaurant login
rout.post("/login", async (req, res) => {
    let userCred = req.body;
    console.log(userCred);

    const user = await usermodal.findOne({ username: userCred.username });

    if (user == null) {
        res.status(403).send({
            massage: "Unable to find user",
            success: false,
        });
    } else {
        const passwordStatus = await bcrypt.compare(
            userCred.password,
            user.password
        );

        if (passwordStatus) {
            const token = await jwt.sign(userCred, "reskey");

            res.send({
                message: "welcome user",
                token: token,
                _id: user._id,
                role: user.role,
                success: true,
            });
        } else if (!passwordStatus) {
            res.status(401).send({
                message: "incorrect password",
                success: false,
            });
        }
    }
});
// get all restaurant
rout.get("/allresturent", (req, res) => {
    usermodal
        .find()
        .then((data) => {
            console.log(data);
            res.send(data);
        })
        .catch((err) => console.log(err));
});
// get single restaurant throw  id
rout.get("/allresturent/:id", (req, res) => {
    let id = req.params.id;
    console.log(id);
    usermodal
        .find()
        .then((data) => {
            items = data;
            let allitems = [];
            items.map((data) => {
                console.log(data._id);

                if (data._id == id) {
                    allitems.push(data);
                } else {
                    console.log("err");
                }
            });
            res.send(allitems);
        })
        .catch((err) => {
            console.log(err);
        });
});
// get particular restaurant item
rout.get("/items/:id", (req, res) => {
    let id = req.params.id;
    console.log(id);

    itemmodal
        .find()
        .then((data) => {
            let allitems = [];

            items = data;
            items.map((data) => {
                console.log(data._id);

                if (data.restaurant == id) {
                    allitems.push(data);
                } else {
                    console.log("err");
                }
            });
            console.log(allitems);
            res.send(allitems);
        })
        .catch((err) => {
            console.log(err);
        });
});

// update items

rout.put("/items/:id", verifytoken, restaurant, (req, res) => {
    const form = new formidable.IncomingForm();

    form.parse(req, (err, feilds, files) => {
        if (err === null) {
            if (files.image != undefined) {
                let newFilename =
                    files.image.newFilename +
                    "." +
                    files.image.originalFilename.split(".")[1];
                fs.rename(
                    files.image.filepath,
                    `./images/food/${newFilename}`,
                    (err) => {
                        if (err !== null) {
                            console.log(err);
                            res.status(400).send({
                                message: "Unable to Create food item",
                                success: false,
                            });
                        } else {
                            console.log(err);
                        }
                    }
                );

                let data = feilds;
                let id = req.params.id;

                data.posterurl = newFilename;
                // let useritem = req.body;
                itemmodal
                    .updateOne(
                        { _id: id },

                        data
                    )
                    .then(
                        () =>
                            fs.unlink(oldFilePath, (err) => {
                                console.log(err);
                            }),
                        res.status(200).send({
                            message: "image updated !!!",
                            success: true,
                        })
                    )

                    .catch((err) => res.send(err));
            } else {
                let data = feilds;

                console.log("nani");
                let id = req.params.id;
                console.log(id);
                console.log(data);
                itemmodal
                    .updateOne(
                        { _id: id },

                        data
                    )
                    .then(() =>
                        res.status(200).send({
                            message: "Item updated !!!",
                            success: true,
                        })
                    )
                    .catch((err) => res.send(err));
            }
        } else {
            console.log(err);
            res.status(500).send({
                message: "Unable to Create Food Item",
                success: false,
            });
        }
    });
});

// delete items
rout.delete("/items/:id", verifytoken, restaurant, (req, res) => {
    let id = req.params.id;
    console.log(id);
    itemmodal
        .deleteOne({ _id: id })
        .then(() =>
            res.status(200).send({
                message: "Item deleted !!!",
                success: true,
            })
        )
        .catch((err) => {
            console.log(err);
            res.send("some problem in updateing");
        });
});
// get singe order
rout.get("/orders/:id", verifytoken, restaurant, (req, res) => {
    let restaurantid = req.params.id;

    const orders = orderModel
        .find({ restaurant: restaurantid })
        .populate("customer")
        .populate("foodItem")
        .populate("restaurant")
        .then((data) => console.log(data))
        .catch((err) => console.log(err));

    res.status(200).send(orders);
});
rout.post("/createItem", verifytoken, restaurant, (req, res) => {
    console.log("working!");
    // console.log(req.body);

    const form = new formidable.IncomingForm();

    form.parse(req, (err, feilds, files) => {
        if (err === null) {
            console.log(feilds);
            console.log(files);
            let newFilename =
                files.image.newFilename +
                "." +
                files.image.originalFilename.split(".")[1];
            fs.rename(
                files.image.filepath,
                `./images/food/${newFilename}`,
                (err) => {
                    if (err !== null) {
                        console.log(err);
                        res.status(400).send({
                            message: "Unable to Create food item",
                            success: false,
                        });
                    } else {
                        console.log(err);
                    }
                }
            );
            let foodData = feilds;
            foodData.posterurl = newFilename;
            // let useritem = req.body;
            let itemobj = new itemmodal(foodData);
            itemobj
                .save()
                .then(() =>
                    res.status(200).send({
                        message: "Item created !!!",
                        success: true,
                    })
                )
                .catch((err) => console.log(err));
        } else {
            console.log(err);
            res.status(500).send({
                message: "Unable to Create Food Item",
                success: false,
            });
        }
    });
});

rout.get("/foodImage/:filename", (req, res) => {
    res.download(`./images/food/${req.params.filename}`);
});

module.exports = rout;
