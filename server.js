import express from 'express';
import cors from 'cors';
import { LogResults, Insertproduct, Insertwebsite,InsertNewRecord, ReturnProduct, ReturnWebsite, Returnrecords, ReturnRecordById, ResertDatabase, ReturnProductOpWebsite, Insertproductopwebsite, ReturnrecordsFull, DeleteProduct, DeleteWebsite} from "./database.js"
import config from "./config.json" assert {type : "json"};
const app = express();
app.use(cors());
app.use(express.json()); 
app.get('/', (req, res) => {
    if(config.Currency != ""){
        res.send({"status": "success", "data": {"currency": config.Currency}});
    }
})
app.get('/routes', async(req, res) => {
    res.send({
        "table" : "http://localhost:3000/table",
        "product" : {
            "link" : "http://localhost:3000/product",
            "description" : "returns products"
        }
    });
});
app.get('/table', async (req, res) => {
    const rows = await LogResults();
    res.send(rows);
})
app.post('/product', async (req, res) => {
    const { name } = req.body;
    if(name === null){
        res.status(400).json({error : "Body is empty"});
    }
    else{
    Insertproduct(name);
    res.send('OK');
    }
})
app.get('/product', async (req, res) => {
    const rows = await ReturnProduct();
    res.send(rows);
})
app.delete('/product', async (req, res) =>{
    const { Id } = req.body;
    if(!Id){
        res.status(400).json({error : "body is empty"});
    }
    else{
        const responds = await DeleteProduct(Id);
        if(!responds){
            res.status(501).json({error : "iternal server error"});
        }
    }
});
app.post('/website', async (req, res) => {
    const { name } = req.body;
    if(name === null){
        res.status(400).json({error : "Body is empty"});
    }else{
        Insertwebsite(name);
        res.send('OK');
    }
})
app.get('/website', async (req, res) => {
    const rows = await ReturnWebsite();
    res.send(rows);
})
app.delete('/website', async (req, res) => {
    const { Id } = req.body;
    if(!Id){
        res.status(400).json({error : "body is empty"});
    }
    else{
        const responds = await DeleteWebsite(Id);
        if(!responds){
            console.log(responds);
            res.status(501).json({error : "iternal server error"});
        }
    }
});
app.post('/record', async (req, res) => {
    const { IdProductOnWebsite, Prijs } = req.body;
    if(IdProductOnWebsite === null || Prijs === null){
        return res.status(400).json({ error: 'Given body data is empty' });
    }
    else{
        InsertNewRecord(IdProductOnWebsite, Prijs);
        res.send('OK');
    }
})
app.get(`/recordid:id`, async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: 'Id is required' });
    }
    const rows = await ReturnRecordById(id);
    res.json(rows);
})
app.get('/records', async (req, res) => {
    const rows = await Returnrecords();
    res.send(rows);
})
app.get('/recordsfull', async (req, res) => {
    const rows = await ReturnrecordsFull();
    res.send(rows);
})
app.get('/ProductOpWebsite', async (req, res) => {
    const rows = await ReturnProductOpWebsite();
    res.send(rows);
})
app.post('/ProductOpWebsite', async (req, res) => {
    const {IdProduct, IdWebsite, UrlProductOpWebsite} = req.body;
    if(IdProduct === null || IdWebsite === null || UrlProductOpWebsite === null){
        res.status(400).json({error : "Given input is empty"});
    }
    else{
    Insertproductopwebsite(IdProduct, IdWebsite, UrlProductOpWebsite);
    res.send('OK');
    }
})
app.get('/ResetDatabase', async (req, res) => {    
    const rows = await ResertDatabase();
    res.send('OK'); 
});
app.get('/favicon.ico', (req, res) => res.status(204)); // No Content
app.listen(3000);
console.log("Server started on port http://localhost:3000");