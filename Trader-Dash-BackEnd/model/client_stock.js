const mongoose = require('mongoose');
const config = require('../config/database');
mongoose.pluralize(null);

//User Schema stores
//{EmployeeId,Username,email,password}
//for each new user(broker)
const ClientStockSchema=mongoose.Schema({
    ClientID:{
        type:String
    },
    BrokerID:{
        type:String
    },
    StockID:{
        type:String
    },
    DateofTrade:{
        type:String
    },
    BuyPrice:{
        type:Number
    },
    Quantity:{
        type:Number
    }
});

const ClientStock=module.exports=mongoose.model('client_stocks',ClientStockSchema, 'client_stock');

module.exports.addUser= function (newUser,callback)  {
    console.log(newUser);
    let user = new ClientStock;
    user.BrokerID = newUser.BrokerID;
    user.ClientID = newUser.ClientID;
    user.StockID = newUser.StockID;
    user.BuyPrice = newUser.BuyPrice;
    user.Quantity = newUser.Quantity;
    user.DateofTrade = newUser.DateofTrade;
    user.save(callback);
      
}

