import axios from 'axios';
import { lookUpByNameUrl, lookUpSummonerById } from '../config.js';

export const getSummonerByName = async (req) => {
    const res = await axios.get(lookUpByNameUrl(req.query.region, req.query.ign), { headers: { "X-Riot-Token": process.env.APIKEY } });
    return res.data;
}

export const summonerParser = async (req, res) => {
    if(!req.query.ign || !req.query.region){
        return res.status(403).json({ error: "Missing information from user." });
    }
    try{ 
        const data = await axios.get(lookUpByNameUrl(req.query.region, req.query.ign), { headers: { "X-Riot-Token": process.env.APIKEY } });
        return res.status(200).json(data.data); 
    } catch (error) {
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

export const getSummonerById = async (req, res) => {
    try{ 
        const data = await axios.get(lookUpSummonerById(req.query.region, req.query.id), { headers: { "X-Riot-Token": process.env.APIKEY } });
        return res.status(200).json(data.data); 
    } catch (error) {
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