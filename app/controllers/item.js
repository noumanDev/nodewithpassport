const Item = require('../models/item');
const mongoose = require('mongoose');

exports.create =async (req, res) => {
    try {
        //add validation please
        let item = new Item({
            name: req.body.name,
            quantity: req.body.quantity,
            updatedBy: req.body.updatedBy
        });

        item = await item.save();
        res.send(item);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the item."
        })
    }
}
exports.findAll = async(req, res) => {
    try {
        const items = await Item.find({ active: true });
        res.send(items);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving items."
        });
    }

}
exports.findOne = async (req, res) => {
    try {
        let item = Item.find({ _id: mongoose.Schema.Types.ObjectId(req.params.itemId), active: true });
        if (!item) {
            return res.status(404).send({
                message: "Item not found with id " + req.params.itemId
            });
        }
        res.send(item);
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Item not found with id " + req.params.itemId
            });
        }
        return res.status(500).send({
            message: "Error retrieving item with id " + req.params.itemId
        });
    }
}
exports.update = async (req, res) => {
    try {
        let item = await Item.findByIdAndUpdate(req.params.itemId, {
            name: req.body.name,
            quantity: req.body.quantity,
            updatedBy: req.body.updatedBy
        });
        if (!item) {
            return res.status(404).send({
                message: "Item not found with id " + req.params.itemId
            });
        }
        res.send(item);
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Item not found with id " + req.params.itemId
            });
        }
        return res.status(500).send({
            message: "Error updating item with id " + req.params.itemId
        });
    }
}
exports.delete =async (req, res) => {
    try {
        let item = await Item.findByIdAndUpdate(req.params.itemId, {
            active: false
        });
        if (!item) {
            return res.status(404).send({
                message: "Item not found with id " + req.params.itemId
            });
        }
        res.send({ message: "Item deleted successfully" });
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Item not found with id " + req.params.itemId
            });
        }
        return res.status(500).send({
            message: "Error deleting item with id " + req.params.itemId
        });
    }
}



