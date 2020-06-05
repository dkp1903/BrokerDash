const express = require('express');
const router = express.Router();  //Router() is middle ware in express 
const mongoose = require('mongoose');
var ClientStock = require('../model/client_stock');
//const passport = require('passport');

//passport.authenticate('jwt',{session:false})

router.post('/', (req, res)=>{
 
  const csvDataBuffer = JSON.stringify(req.body);
  const csvData = JSON.parse(csvDataBuffer).data;
  const csvDataString = csvData.toString("utf8");

  console.log(csvDataString)
  const toJSON = csv => {
    let lines = csv.split(', ')
    const result = []
    const headers = lines[0].split(',')
    lines = lines.slice(1);
    lines.map(l => {
        const obj = {}
        const line = l.split(',')

        headers.map((h, i) => {
            obj[h] = line[i]
        })

        result.push(obj)
    })

    return  JSON.parse(JSON.stringify(result));
  }

  const data = toJSON(csvDataString);
  console.log(data);

  var entries = Object.keys(data);
  for (var i = 0; i < entries.length ; ++i) {
    // ClientStock.create(data[i], function(err, documents) {
    //   if(err){
    //     throw err;
    //   }
    // })

    ClientStock.addUser(data[i], (err, user) => {
      if(err){
        res.json({success: false, msg:'Failed to log you!'});
      } else {
        res.json({success: true, msg:'Trade logged'});
      }
    });

  }

})


module.exports = router;