const express = require('express');
const router = express.Router();  //Router() is middle ware in express 
const config = require('../config/database');
const client = require('../model/clients');
const User=require('../model/users');
const ClientStock = require('../model/client_stock');
const passport = require('passport');

router.post('/addClient',passport.authenticate('jwt',{session:false}),(req,res,next) =>{
    let newClient = new client(
        {
            BrokerID:req.body.BrokerID,
            ClientID:req.body.ClientID,
            ClientName:req.body.ClientName,
            MobileNo:req.body.MobileNo
        }
    );
    console.log(newClient);
    
    newClient.save( (err,data)=>{
        if(err){
            res.json({success: false, msg:'Failed to add client'});
          }
          else
          {
              res.json({success: true, msg:'Client added sucessfully'});
          }
    });
    
});

//get ClientList request   done

//Request point:/dashboard/getClients
router.get('/getClients/:id',passport.authenticate('jwt',{session:false}),(req,res,next)=>{
    client.find({BrokerID:req.params.id},
                {_id:0,BrokerID:0},
              {ClientID:1,ClientName:2,MobileNo:3},
              (err, result) => {
                    if (err) {
                      res.josn({success: false, msg:'Failed to get ClientList'});
                    } else {
                      res.json(result);
                    }
             });

});

//get Stocks of the clients

//Request point:/dashboard/getStocks
router.get ('/getStocks/:brokerID',passport.authenticate('jwt',{session:false}),(req,res,next)=>{
    ClientStock.find ( {BrokerID:req.params.brokerID},
                      {_id:0,BrokerID:0},
                      {ClientID:1,StockID:2,Quantity:3,DateofTrade:4,BuyPrice:5},
                      (err,result)=>{
                        if(err){
                            res.josn({success: false, msg:'Failed to get StockDetails'});
                        }else{
                            res.json(result);
                        }
                   });
});
module.exports=router;
