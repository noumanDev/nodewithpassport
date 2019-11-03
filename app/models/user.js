/*!
 * Module dependencies
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * User schema
 */

const UserSchema = new Schema({
  name: { type: String, default: '' },
  profilePic: { type: String, default: '' },
  email: {
    type: String, required: true,
    trim: true, unique: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  },
  facebookProvider: {
    type: {
      id: String,
      access_token: String
    },
    select: false
  },
  hashed_password: { type: String, default: '' },
  salt: { type: String, default: '' }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */


/**
 * virtuals
 */
UserSchema.set('toJSON', { getters: true, virtuals: true });


/**
 * Methods
 */

UserSchema.method({});

/**
 * Statics
 */

UserSchema.static({});

/**
 * Register
 */
module.exports = User = mongoose.model('User', UserSchema)