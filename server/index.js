import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import { getSummonerById, summonerParser } from './services/summoner.js';
import { getMatchesByPuuid, getPlayerStatsByMatchId } from './services/match.js';
import axios from "axios";
import https from 'https';

dotenv.config();
const PORT = process.env.PORT;
const app = express();
app.use(cors());

const router = express.Router();

app.use('/', router);

router.get("/api", (req, res) => { res.status(200).json({message: "Hello from server"}); });

/*const gameTime = async (req, res) => {
    const agent = new https.Agent({  
        rejectUnauthorized: false
       });
       
    try{
        const data = await axios.get('https://127.0.0.1:2999/liveclientdata/allgamedata', { httpsAgent: agent }, {timeout: 5000});
    res.status(200).json(data.data);
    } catch (error) {
        if(error.response) {
            return res.status(error.response.status).json(error.response.data);
        } else if (error.request) {
            return error.request;
        } else {
            console.log('Player not in game.');
            return error.message;
        }
    }
}*/

router.get('/summoner', summonerParser);
router.get('/matches', getMatchesByPuuid);
router.get('/match', getPlayerStatsByMatchId);
router.get('/summonerstats', getSummonerById);
//router.get('/gametime', gameTime);

app.listen(PORT, () => { console.log(`Server listening on ${PORT}`); });