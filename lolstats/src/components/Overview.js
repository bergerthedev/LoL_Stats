import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Match from './Match';
import https from 'https';

const Overview = (props) => {



    const API = axios.create({ baseURL: 'http://localhost:5000' });
    const [matchId, setMatchId] = useState('');
    const [match1, setMatch1] = useState([[]]);
    const [match2, setMatch2] = useState([[]]);
    const [didGetMatch1, setDidGetMatch1] = useState(false);
    const [soloQ, setSoloQ] = useState('');

    /*for(var i = 0; i < props.stats.length; i++){
        if(props.stats[i].queueType === 'RANKED_SOLO_5x5'){
            setSoloQ(i);
        }
    }*/
    
    const getMatch = async () => {
        console.log("This is the testing spot hello " + matchId);
        const response = await API.get(`/match?region=${props.region}&matchId=${matchId}`);
        console.log(response);
        setMatch1(response.data);
    }

    /*const trackTime = async () => {
        const time = await API.get('/gametime');
        if(Math.floor((time.data.gameData.gameTime)%60)<10){
            const gameTime = Math.floor((time.data.gameData.gameTime)/60) + ":0" + Math.floor((time.data.gameData.gameTime)%60);
            console.log(gameTime);
        }else{
            const gameTime = Math.floor((time.data.gameData.gameTime)/60) + ":" + Math.floor((time.data.gameData.gameTime)%60)
            console.log(gameTime);
        }
    }*/

    const getMatches = async (e) => {
        e.preventDefault();
        const matchList = await API.get(`/matches?region=${props.region}&puuid=${props.info.puuid}`);
        console.log("TESTING1: " + props.stats.tier);
        setSoloQ(props.stats.tier + ' ' + props.stats.rank)
        let match1Array = [[]];
        let match2Array = [[]];
        for (let i=0; i<10; i++) {
            await API.get(`/match?region=${props.region}&matchId=${matchList.data[i]}`)
                .then((response) => {
                    match1Array[i] = response.data.metadata.participants;
                    match2Array[i] = response.data.info.participants;
                })
        }
        setMatch1(match1Array);
        setMatch2(match2Array);
        setDidGetMatch1(true);
        }

    if(props.info){
        return (
            <div>
                <h1>Summoner level: {props.info.summonerLevel}</h1>
                <img src={`http://ddragon.leagueoflegends.com/cdn/11.11.1/img/profileicon/${props.info.profileIconId}.png`} width="100" height="100" title={`${props.info.name}'s icon`} alt={`${props.info.name}'s icon`}/>
                {soloQ}
                <h1>{props.info.name}</h1>
                <button onClick={getMatches}>Get Matches</button>
                {didGetMatch1 && <Match puuid={props.info.puuid} matchData1={match1} matchData2={match2}/>}

                <button >Get Time</button>
            </div>
        )
    }
    else {
        return null;
    }
}

export default Overview
