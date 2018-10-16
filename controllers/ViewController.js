"use strict";

module.exports = {
    'Home': async (req,res)=>{
      res.render('home')
    },
    'Message': async (req,res)=>{
        res.render('message')
    }
}