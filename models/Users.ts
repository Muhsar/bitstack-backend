const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    phone_number: String,
    email: String,
    password: String,
    referral_code: String,
    activate_referral_code: {
        type: Boolean,
        default: false
    },
    modified: {
        type: Date,
        default: Date.now
    },
    created:{
        type: Date,
        default: Date.now
    }
})
const Users = mongoose.model('Users', UsersSchema);
export default Users;
