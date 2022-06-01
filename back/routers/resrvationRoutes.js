const express = require('express');
const routes = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Reservation = require('../models/Reservation');
const { Token } = require('../models/Token');
const { type } = require('express/lib/response');
const {auth} = require('../middlewares/auth');
const res = require('express/lib/response');
const user=require ("../models/Utilisateurs")
const Station = require("../models/station")

// ajouter une réservation

routes.post('/addres', async(req, res)=>{
    try {
      let reserv= new Reservation({
          
        namestation:req.body.namestation,
        date_heure:req.body.date_heure,
        marque_vehicule: req.body.marque_vehicule,
        Nature_vehicule: req.body.Nature_vehicule,
        Nom_client:req.body.Nom_client,
        Prenom_client:req.body.Prenom_client,
        Num_Client:req.body.Num_Client,
        time:req.body.time,
        prix:req.body.prix

      })
      reserv.Utilistauer=req.body.Utilistauer
      reserv.Station = req.body.Station
        let reserva=await reserv.save();
console.log(reserv.Utilistauer)
      await user.updateOne(
       { _id:req.body.Utilistauer},
        {
            $addToSet: { reservation: reserva._id },
          },
          { new: true }

      )
      await Station.updateOne(
        { _id:req.body.Station},
         {
             $addToSet: { reservation: reserva._id },
           },
           { new: true }
 
       )
       res.status(201).json({message: " Reservaionajouter aec succes"}) 
    } catch (error) {
        console.log(error.message);
    
    }
    })

// supprimer une réservation
    routes.delete('/deleteres/:id', async (req, res)=>{

        try {
            await Reservation.deleteOne({_id: req.params.id})
            res.status(201).json({message:"resrvation supermer avec succes"});
        } catch (error) {
            console.log(error.message);
        }
        
        
        })

        
    module.exports = routes;



    // modifier une réservation

routes.put("/mR/:id", async (req, res) => {
    try {
      const data = await Reservation.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
      );
      res.status(201).json(data);
    } catch (error) {
      console.log(error.message);
    }
  });

    // get  une station  by name

    routes.get('/getByStation/:_id', async ( req, res)=>{

        try {
            
        const oneComt = await Reservation.find({_id:req.params._id}).populate("Station");
        res.status(201).json(oneComt);
        
        } catch (error) {
          console.log(error.message);  
        }
        
        
        
        })
        //get reservation by id station et etat attente
        routes.get('/getByS/:Station', async ( req, res)=>{

            try {
                
            const oneComt = await Reservation.find({Station:req.params.Station , etat:"attente"}).populate("Station");
            res.status(201).json(oneComt);
            
            } catch (error) {
              console.log(error.message);  
            }
            
            
            
            })
            //get reservation by id station et etat confirmé et refusé
        routes.get('/getBySE/:Station', async ( req, res)=>{

            try {
                
            const oneComt = await Reservation.find({Station:req.params.Station }).populate("Station");
            res.status(201).json(oneComt);
            
            } catch (error) {
              console.log(error.message);  
            }
            
            
            
            })

// get reservation by id utilisateur
routes.get('/getByU/:Utilistauer', async ( req, res)=>{

    try {
        
    const oneComt = await Reservation.find({ Utilistauer:req.params.Utilistauer}).populate("Utilistauer")
    res.status(201).json(oneComt);
    
    } catch (error) {
      console.log(error.message);  
    }
    })

    routes.get("/getuser/:id",async(req,res)=>{
            try {
                let getuser= await user.findById(req.params.id).populate("reservation");
            delete  getuser.MPass 
                res.status(200).send(getuser)
            } catch (error) {
                console.log(error);
            }
        })
        routes.get("/getResByStation/:Station",async(req,res)=>{
            try {
                let getuser= await user.findById(req.params.Station).populate("reservation");
            delete  getuser.MPass 
                res.status(200).send(getuser)
            } catch (error) {
                console.log(error);
            }
        })
        //modifier l'etat confirmé
        routes.put('/updateEtat/:id', async (req, res) =>{
            try {
               const id = req.params.id
               let mdd = {
                   etat:"confirme"
               }
               let aa = await Reservation.findByIdAndUpdate({_id:id},{...mdd}
                
                )
                res.status(200).send(mdd)
            } catch (error) {
              console.log(error);  
              res.status(401).send(error)
            }
        })

        



         //modifier l'etat refuse
         routes.put('/updateEtatRefuse/:id', async (req, res) =>{
            try {
               const id = req.params.id
               let mdd = {
                   etat:"refuse"
               }
               let aa = await Reservation.findByIdAndUpdate({_id:id},{...mdd}
                
                )
                res.status(200).send(mdd)
            } catch (error) {
              console.log(error);  
              res.status(401).send(error)
            }
        })

        //All reservation
        routes.get('/getAllReservation', async (req,res)=>{
            try {
               const reser = await Reservation.find({
                
           
               }) 
               res.status(200).send(reser)
            } catch (error) {
                console.log(error);
                res.status(401).send(error)
            }
           })
           