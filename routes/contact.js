const express = require('express');
const router = express.Router();
const ContactModel = require('../models/Contact');

router.post('/v1/contacts', async (req,res) => {

    try{

        // console.log(req.body.firstName);
        const contact = await ContactModel.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone

        })

        res.status(201).json({
            contact
        })
    }
    catch(e){
        let missing = '';
        if(req.body.email === undefined){
            missing = missing + ' ' + 'email';
        }
        if(req.body.firstName === undefined){
            missing = missing + ' ' + 'firstName';
        }
        if(req.body.lastName === undefined){
            missing = missing + ' ' + 'lastName';
        }
        if(req.body.phone === undefined){
            missing = missing + ' ' + 'phone';
        }
        // console.log(req.body.firstName);
        res.status(500).json({
            error: `Missing required field(s): ${missing}`,
            // message: e.message
        })
    }
})

router.get('/v1/contacts', async (req,res) => {

    try{
        const contact = await ContactModel.find();

        res.status(200).json({
            contact
        })
    }
    catch(e){
        res.status(500).json({
            message: e.message
        })
    }
})

router.get('/v1/contacts/:id', async (req,res) => {

    try{
        const contact = await ContactModel.find({_id: req.params.id});
        // console.log(contact.length);
        if(!contact || contact.length == 0){
            res.status(404).json({
                error: "There is no contact with that id"

            })
        }
        else{
            res.status(200).json({
                contact
            })
        }
       
    }
    catch(e){
        res.status(500).json({
            message: e.message
        })
    }
})

router.delete('/v1/contacts/:id', async (req,res) => {

    try{
        const contact = await ContactModel.findOneAndDelete({_id:req.params.id});

        res.status(204).json({
           
        })
    }
    catch(e){
        res.status(500).json({
            message: e.message
        })
    }
})

router.put('/v1/contacts/:id', async (req,res) => {

    try{
        const contact = await ContactModel.findOneAndUpdate(
            {_id:req.params.id},
            {$set: 
                {firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                phone: req.body.phone}},
                {new:true});

        if(!contact || contact.length == 0){
            res.status(404).json({
                error: "There is no contact with that id"

            })
        }
        else{
            res.status(204).json({
            })
        }
    }
    catch(e){
        res.status(500).json({
            message: e.message
        })
    }
})

router.patch('/v1/contacts/:id', async (req,res) => {

    try{
        const contact = await ContactModel.findByIdAndUpdate(
            {_id:req.params.id},
            // {$set: 
                // {
                    // $or:
                     {firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                phone: req.body.phone}
            // }
            ,
                {new:true});

        if(!contact || contact.length == 0){
            res.status(404).json({
                error: "There is no contact with that id"

            })
        }
        else{
            res.status(204).json({
            })
        }
    }
    catch(e){
        res.status(500).json({
            message: e.message
        })
    }
})



module.exports = router;