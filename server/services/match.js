import axios from 'axios';

import { lookUpMatchesByPuuidUrl, lookUpMatchByMatchId } from '../config.js';

export const getMatchesByPuuid = async (req, res) => {
    try{
        const data = await axios.get(lookUpMatchesByPuuidUrl(req.query.region, req.query.puuid), { headers: { "X-Riot-Token": process.env.APIKEY } });
        console.log(data.data);
        return res.status(200).json(data.data);
    } catch (error){
        if (error.response) {
            return res.status(error.response.status).json(error.response.data);
        } else if (error.request) {
            return error.request;
        } else {
            console.log('Error', error.message);
            return error.message;
        }
    }
}

export const getPlayerStatsByMatchId = async (req, res) => {
    try{
        const matchData = await axios.get(lookUpMatchByMatchId(req.query.region, req.query.matchId), { headers: { "X-Riot-Token": process.env.APIKEY } });
        //console.log(matchData.data);
        return res.status(200).json(matchData.data);
    } catch (error) {
        console.log(error.message);
        return error;
    }
}