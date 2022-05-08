const express = require("express");

const verifyToken = require("../middlewear/verify");
const cartModel = require("../modals/cart");
const foodModal = require("../modals/fooditems");
const orderModel = require("../modals/ordermodal");
const { checkout } = require("./order");

const router = express.Router();

// add item to cart
router.post("/addItem", verifyToken, (req, res) => {
    let data = req.body;
    console.log(data);
    const cartItems = new cartModel(data);
    cartItems
        .save()
        .then(() =>
            res
                .status(200)
                .send({ message: "Item is added to cart", success: true })
        )
        .catch((err) => {
            console.log(err);
            res.status(400).send({
                message: "Unable to addItem to Cart",
                success: false,
            });
        });
});
// get cart item
router.get("/getitem/:id", verifyToken, (req, res) => {
    let id = req.params.id;
    cartModel
        .find()
        .populate("foodItem")
        .then((data) => {
            let allitems = [];

            items = data;
            items.map((data) => {
                if ((data.customer == id) & (data.foodItem != null)) {
                    allitems.push(data);
                } else {
                    console.log("err");
                }
            });
            console.log(allitems);
            res.send(allitems);
        });
});
// update cart item
router.put("/getitem/:id", verifyToken, (req, res) => {
    let _id = req.params.id;
    let body = req.body.quantity;
    console.log(_id);
    console.log(body);
    cartModel.updateOne({ _id }, { quantity: body }).then(() =>
        res.status(200).send({
            message: "Cart Item Updated!!!",
            success: true,
        })
    );
});
// delete cart item
router.delete("/delete/:id", verifyToken, (req, res) => {
    let _id = req.params.id;
    console.log(_id);
    cartModel
        .deleteOne({ _id })
        .then(() =>
            res
                .status(200)
                .send({ message: "Cart Item delted!!!", success: true })
        )
        .catch((err) => {
            console.log(err);
            res.status(400).send({
                message: "unable to delte cart item",
                success: false,
            });
        });
});
// checkout
router.post("/checkout", verifyToken, (req, res) => {
    let cartIds = req.body;
    console.log(cartIds);

    cartIds.map((cartId) => {
        cartModel.findOne({ _id: cartId }).then((datacart) => {
            console.log(datacart);

            let foodId = datacart.foodItem;
            console.log(foodId);
            foodModal.findOne({ _id: foodId }).then((data) => {
                console.log(data);
                if (data.quantity > 0) {
                    let orderData = {
                        customer: datacart.customer,
                        foodItem: data._id,
                        restaurant: data.restaurant,
                        quantity: datacart.quantity,
                    };
                    const orders = new orderModel(orderData);
                    orders
                        .save()
                        .then(async () => {
                            await cartModel.deleteOne({ _id: cartId });
                            await foodModal.updateOne(
                                { _id: foodId },
                                {
                                    quantity:
                                        data.quantity - orderData.quantity,
                                }
                            );
                            res.status(200).send({
                                message: "Ordered!!!",
                                success: true,
                            });
                        })
                        .catch((err) => {
                            console.log(err);
                            res.status(400).send({
                                message: "order Rejected!!!",
                                success: false,
                            });
                        });
                } else {
                    res.status(400).send({
                        message: "Order rejected, Out of Stock",
                        success: false,
                    });
                }
            });
        });
    });
});

module.exports = router;
