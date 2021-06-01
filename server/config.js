export const lookUpByNameUrl = ( region, ign ) => { //returns summoner information
    return `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${ign}`;
}

const regionConverter = (region) => {
    let regionLookup = '';
    switch(region) {
        case 'NA1' || 'LA1' || 'LA2' || 'BR1' || 'OCE':
            regionLookup = 'AMERICAS';
            break;
        case 'KR' || 'JP1':
            regionLookup = 'ASIA';
            break;
        case 'EUN1' || 'EUW1' || 'RU' || 'TR1':
            regionLookup = 'EUROPE';
            break;
    }
    return regionLookup;
}

export const lookUpMatchesByPuuidUrl = ( region, puuid ) => { //returns list of all match IDs
    const regionLookup = regionConverter(region);
    return `https://${regionLookup}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20`;
}

export const lookUpMatchByMatchId = ( region, matchId ) => {
    const regionLookup = regionConverter(region);
    return `https://${regionLookup}.api.riotgames.com/lol/match/v5/matches/${matchId}`;
}

export const lookUpSummonerById = ( region, id ) => {
    return `https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}`
}