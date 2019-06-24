var express = require('express');
var router = express.Router();

var Item = require('../model/shoppingItem');

//retrieve data
router.get('/items', (req, res, next)=>{
    Item.find(function(err, items){
        if(err){
            res.json(err);
        }
        else{
            res.json(items);
        }
    });
});

//inserting new data
router.post('/item', (req, res, next)=>{
    if(Item.findOne({itemName: req.body.itemName}) != null){
        res.json({msg: "Item already exist."})
    }
    else{
        let newShoppingItem = new Item({
            itemName: req.body.itemName,
            itemQuantity: req.body.itemQuantity,
            itemBought: req.body.itemBought
        });
        newShoppingItem.save((err, item)=>{
            if(err){
                res.json(err);
            }
            else{
                res.json({msg: 'Item has been added successfully'});
            }
        })
    }
});

//updating data
router.put('/item/:id', (req, res, next)=>{
    Item.findOneAndUpdate(
        {_id: req.params.id}, {     //condition
        $set:{                      //update
            itemName: req.body.itemName,
            itemQuantity: req.body.itemQuantity,
            itemBought: req.body.itemBought
        }
    },
    {new: true},                    //query option to return updated result
    function(err, result){          //callback
        if(err){
            res.json(err);
        }
        else{
            res.json(result);
        }
    }
    );
});

//deleting one data
router.delete('/item/:id', (req, res, next)=>{
    Item.deleteOne(
        {_id: req.params.id},
        function(err, result){
            if(err){
                res.json(err);
            }
            else{
                res.json({msg: "Item has been removed"})
            }
        });
});

module.exports = router;