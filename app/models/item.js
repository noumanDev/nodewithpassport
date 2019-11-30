/*!
 * Module dependencies
 */

const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Schema = mongoose.Schema;

/**
 * Item schema
 */

const ItemSchema = new Schema({
  name: { type: String, default: '', required: true },
  quantity: { type: Number, default: 0 },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  active: { type: Boolean, default: true },

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
ItemSchema.set('toJSON', { getters: true, virtuals: true });


/**
 * Methods
 */
// ItemSchema.methods.setPassword = function(password) {
//   this.salt = crypto.randomBytes(16).toString('hex');
//   this.hashed_password = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
// };


/**
 * Statics
 */

ItemSchema.static({});

/**
 * Register
 */
module.exports = Item = mongoose.model('Item', ItemSchema)