import express, { request, response } from 'express'
import post from './routers/posts.js';

const SERVER_PORT = process.env.SERVER_PORT;
const SERVER_URL =process.env.SERVER_URL;


const app = express();
app.use(express.json()); // Utile per le richieste application/json
app.use('/posts', post);








app.listen(SERVER_PORT, (error) =>{
    if(error){
        console.log(`Errore: ${error}`);
    }
    console.log(`Il server é avviato sulla porta ${SERVER_PORT}`);
})