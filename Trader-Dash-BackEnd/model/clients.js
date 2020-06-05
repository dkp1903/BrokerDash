const mongoose = require('mongoose');
const config = require('../config/database');

const ClientSchema=mongoose.Schema({
    BrokerID:{
        type:String,
        required:true
    },
    ClientID:{
        type:String,
        required:true
    },
    ClientName:{
        type:String,
        required:true
    },
    MobileNo:{
        type:String,
        required:true
    }
});

const Client=module.exports=mongoose.model('client',ClientSchema,'clients');

//module.exports.addClient

