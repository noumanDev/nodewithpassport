/*!
 * Module dependencies
 */

const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

/**
 * Order schema
 */

const OrderSchema = new Schema({
  item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
  clientName: { type: String, required: true },
  comments: { type: String },
  quantity: { quantity: Number },
  active: { type: Boolean }
}, { timestamps: true });

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */


/**
 * virtuals
 */
OrderSchema.set('toJSON', { getters: true, virtuals: true });


/**
 * Methods
 */
// OrderSchema.methods.setPassword = function(password) {
//   this.salt = crypto.randomBytes(16).toString('hex');
//   this.hashed_password = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
// };


/**
 * Statics
 */

OrderSchema.static({});

/**
 * Register
 */
module.exports = Order = mongoose.model('Order', OrderSchema)