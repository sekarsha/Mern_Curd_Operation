const express = require("express");
const app = express();
const mongoose = require("mongoose");
const mongodb = require("mongodb");
const cors = require("cors");

app.use(express.json());
app.use(cors());


mongoose.connect("mongodb://localhost:27017/MERN-form")
    .then(() => { console.log("Database is connected") })
    .catch((error) => console.log("sha Database Connected Error" + error))

const list_schema = new mongoose.Schema({

    Name: String,
    Genter: String,
    Age: String,
    Email: String,
})

const list_modal = mongoose.model("list", list_schema);


app.post("/list", async (req, res) => {
    const { Name, Genter, Age, Email } = req.body;

    try {

        const list = new list_modal({ Name, Genter, Age, Email })
        await list.save()
        res.send(201).json(list)

    } catch (error) {

        console.log("Sha Post request la Error" + error);
    }

})

app.get("/list", async (req, res) => {

    try {
        const list = await list_modal.find()
        res.json(list)
    } catch (error) {

        console.log("Sha Get request la Error" + error);
        res.status(500).json(error)
    }


})


app.put("/list/:id",async (req,res)=>{

    
    try {

        const { Name, Genter, Age, Email } = req.body;
        const id=req.params.id;
        const update_list=await list_modal.findByIdAndUpdate(
    
            id,
            { Name, Genter, Age, Email },
            {new:true}
        )
    
       if(!update_list){
    
        return res.status(404).json({message:"sha updat list not found"})
       }
       res.json(update_list)
        
    } catch (error) {
        
         console.log("sha PUT method error adickuthu"+error);
         res.status(500).json("sha PUT method error adickuthu")

    }
  

  
  

})


app.delete("/list/:id",async (req,res)=>{

   try {
    const id=req.params.id;
    await list_modal.findByIdAndDelete(id);
    res.status(204).end()
   } catch (error) {
    
    console.log("Sha delete method error adikuthu "+error);
    res.status(505).json("Sha delete method error adikuthu")
   }



})




app.listen(3000, () => console.log("Server is Connected"))