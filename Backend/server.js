const express = require("express");

const app = express();

const model = require("./model/user");

const connection = require("./config/database");

const multer = require("multer");

app.use(express.json());

const cors = require('cors');
app.use(cors());


app.get("/Data", async (req, res) => {
    let data = await model.find();
    res.send(data)
})

app.post("/create", async (req, res) => {
    let data = new model(req.body);
    let result = await data.save();
    res.send(result)
})

app.put('/update/:_id', async (req, res) => {
    console.log(req.params);
    let data = await model.updateOne(
        req.params,
        { $set: req.body }
    );
    res.send("Data Update Successfully");
})

app.delete('/delete/:_id', async (req, res) => {
    // console.log(req.params);
    let data = await model.deleteOne(req.params)
    res.send(data + "This Data Deleted !")
})

app.listen(5000);