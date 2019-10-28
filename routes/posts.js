
const express = require('express') ;
const router = express.Router();
const verify = require('./verify') ;

router.get('/' , verify , (req,res) => {
    res.json({
        posts : {
            title : " my first app " ,
            description : "not for you " 
        }
    });
})

module.exports = router ;