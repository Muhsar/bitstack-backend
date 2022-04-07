const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
    full_name: String,
    email: String,
    password: String,
    image: String,
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
