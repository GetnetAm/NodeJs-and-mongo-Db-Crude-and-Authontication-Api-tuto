const asynchandler =require('express-async-handler')
const Contact =require('../models/contactModel')
//@desc Get all contacts
//@route Get /api/contacts
//@access public

const getAllContact = asynchandler(async(req, res)=>{
    const contacts = await Contact.find();
    res.status(200).json(contacts);
});

//@desc Create New contacts
//@route Post /api/contacts
//@access public

const createContact = asynchandler(async(req, res)=>{
    console.log("the request body is :" , req.body);
    const {name, email, phone}=req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are required");
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
});
    res.status(201).json(contact);
});

//@desc Update contacts
//@route Put /api/contacts/:id
//@access public

const getContact = asynchandler(async(req, res)=>{

    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Can not found");
    }
    res.status(200).json(contact)
});

//@desc Update contacts
//@route Put /api/contacts/:id
//@access public

const updateContact = asynchandler(async(req, res)=>{

    const contact = await Contact.findById(req.params.id);

    if(!contact){
        res.status(404)
        throw new Error("Contact not found");
    }

        const updateContact =await Contact.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new: true}
        );

    
    res.status(200).json(updateContact)
});

//@desc Delete contacts
//@route Delete /api/contacts/:id
//@access public

const deleteContact = asynchandler(async(req, res)=>{
    const contact = await Contact.findById(req.params.id);

    if(!contact){
        res.status(404);
        throw new Error("Contact not found")
    }
    await Contact.remove();
    res.status(200).json(contact)
});



module.exports = {getAllContact,getContact,createContact,updateContact,deleteContact }
