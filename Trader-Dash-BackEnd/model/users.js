const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); //Encryption algo to encrypt the password
const config = require('../config/database');

//User Schema stores
//{EmployeeId,Username,email,password}
//for each new user(broker)
const UserSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    employeeID:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

const User=module.exports=mongoose.model('people',UserSchema,'brokers');


module.exports.getUserById = (id , callback) => User.findById(id,callback);

module.exports.getUserByUsername = (Username,callback) =>{
    const query={username:Username};
    User.findOne(query,callback);
}

// add user into Database/usershema
// using bcrypt encrypt the password which is given by user
module.exports.addUser= function (newUser,callback)  {
    //console.log(newUser);
    bcrypt.genSalt (10,(err,salt) => {
        
        bcrypt.hash (newUser.password , salt, (err,hash) => {
            if(err)
                throw err;
            
            newUser.password=hash;
            
            newUser.save(callback);
        });
    });    
}

// Function to check the password when use try to login to the system
module.exports.ComparePassword = (CandidatePassword ,HashPassword, callback) => {
    bcrypt.compare(CandidatePassword ,HashPassword ,(err, isMatch) =>{
        if(err) throw err;
        callback(null,isMatch);
    });
}

