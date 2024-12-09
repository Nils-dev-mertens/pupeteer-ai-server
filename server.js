import express from 'express';
import cors from 'cors';
import { LogResults, Insertproduct, Insertwebsite,InsertNewRecord, ReturnProduct, ReturnWebsite, ReturnRecord } from "./database.js"
import config from "./config.json" assert {type : "json"};
const app = express();
app.use(cors());
app.use(express.json()); 
app.get('/', (req, res) => {
    if(config.Currency != ""){
        res.send({"status": "success", "data": {"currency": config.Currency}});
    }
})
app.get('/table', async (req, res) => {
    const rows = await LogResults();
    res.send(rows);
})
app.post('/product', async (req, res) => {
    const { name } = req.body;
    Insertproduct(name);
    res.send('OK');
})
app.get('/product', async (req, res) => {
    const rows = await ReturnProduct();
    res.send(rows);
})
app.post('/website', async (req, res) => {
    const { name } = req.body;
    Insertwebsite(name);
    res.send('OK');
})
app.get('/website', async (req, res) => {
    const rows = await ReturnWebsite();
    res.send(rows);
})
app.post('/record', async (req, res) => {
    const { IdProductOnWebsite, Prijs } = req.body;
    InsertNewRecord(IdProductOnWebsite, Prijs);
    res.send('OK');
})
app.get('/record', async (req, res) => {
    const rows = await ReturnRecord();
    res.send(rows);
})
app.get('/favicon.ico', (req, res) => res.status(204)); // No Content
app.listen(3000);
console.log("Server started on port http://localhost:3000");