const Order = require('../models/order');
const Item = require('../models/item');
const mongoose = require('mongoose');

exports.create =async (req, res) => {
    try {
        //add validation please
        let order = new Order({
            item: req.body.item,
            clientName: req.body.clientName,
            comments: req.body.comments,
            quantity: req.body.quantity,
        });

        let itemAvailability = await checkStockAvailability(req.body.item, req.body.quantity);
        if (itemAvailability == null) {
            return res.status(404).send({
                message: "Item not found with id " + req.params.item
            });
        }
        if (itemAvailability == false) {
            return res.status(400).send({
                message: "Stock is empty "
            });
        }

        order = await order.save();
        // item.quantity = item.quantity - req.body.quantity;
        // await item.save();

        res.send(order);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the order."
        })
    }
}
exports.findAll =async (req, res) => {
    try {
        const orders = await Order.find({ active: true });
        res.send(orders);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving orders."
        });
    }

}
exports.findOne =async (req, res) => {
    try {
        let order = Order.find({ _id: mongoose.Schema.Types.ObjectId(req.params.orderId), active: true });
        if (!order) {
            return res.status(404).send({
                message: "Order not found with id " + req.params.orderId
            });
        }
        res.send(order);
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Order not found with id " + req.params.orderId
            });
        }
        return res.status(500).send({
            message: "Error retrieving order with id " + req.params.orderId
        });
    }
}
exports.update =async (req, res) => {
    try {
        let order = await Order.findById(req.params.orderId)
            .populate('item');

        if (!order) {
            return res.status(404).send({
                message: "Order not found with id " + req.params.orderId
            });
        }

        //check stock availability
        let itemAvailability = await checkStockAvailability(req.body.item, order.item._id == req.body.item ? order.quantity - req.body.quantity : req.body.quantity);
        if (itemAvailability == null) {
            return res.status(404).send({
                message: "Item not found with id " + req.params.item
            });
        }
        if (itemAvailability == false) {
            return res.status(400).send({
                message: "Stock is empty "
            });
        }

        order.quantity = req.body.quantity; //add updated quantity to order
        order.item = req.body.item;
        order.clientName = req.body.clientName;
        order.comments = req.body.comments;

        await order.save(order);

        res.send(order);
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Order not found with id " + req.params.orderId
            });
        }
        return res.status(500).send({
            message: "Error updating order with id " + req.params.orderId
        });
    }
}
exports.delete =async (req, res) => {
    try {
        let order = Order.findByIdAndUpdate(req.params.orderId, {
            active: false
        });
        if (!order) {
            return res.status(404).send({
                message: "Order not found with id " + req.params.orderId
            });
        }
        res.send({ message: "Order deleted successfully" });
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Order not found with id " + req.params.orderId
            });
        }
        return res.status(500).send({
            message: "Error deleting order with id " + req.params.orderId
        });
    }
}


checkStockAvailability = async (itemID, quanitity) => {
    let item = await Item.findById(req.body.item);
    if (!item) {
        return null;
    }
    if ((item.quantity - req.body.quantity) < 0) {
        return false;
    }
    return true;

}
