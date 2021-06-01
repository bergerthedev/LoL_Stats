import axios from "axios";
import { useState } from 'react';
import Overview from './components/Overview';
import Popup from './components/Popup';



function App() {

  const API = axios.create({ baseURL: 'http://localhost:5000' });

  const [ign, setIgn] = useState('');
  const [region, setRegion] = useState('NA1');
  const [info, setInfo] = useState({});
  const [stats, setStats] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isReqError, setIsReqError] = useState(false);


  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(region + ": " + ign);
    let statArray = [];
    try{
      await API.get(`/summoner?region=${region}&ign=${ign}`)
        .then((response) => {
          API.get(`/summonerstats?region=${region}&id=${response.data.id}`)
            .then((response) => {
              for(let i = 0; i < response.data.length; i++){
                if(response.data[i].queueType === "RANKED_SOLO_5x5")
                  setStats(response.data[i]);
              }
      });
          setInfo(response.data);
        });
      //await API.get(`/summoner/stats?region=${region}&id=${info.accountId}`);
      setIsSubmit(true);
      console.log(statArray);

    } catch (error) {
      console.log(error.message);
      setIsReqError(true);
    }
    //setStats(statArray);
  }

  const handleClose = () => {
    setIgn('');
    setIsReqError(false);
  }


  return (
    <div>
      <form onSubmit={onSubmit}>
        <h1>Region: {region}</h1>
        <h1>Summoner Name: {ign}</h1>
        <select value={region} onChange={ (e) => { setRegion(e.target.value) } }>
          <option value="BR1">BR</option>
          <option value="EUN1">EUN</option>
          <option value="EUW1">EUW</option>
          <option value="JP1">JP</option>
          <option value="KR">KR</option>
          <option value="LA1">LA1</option>
          <option value="LA2">LA2</option>
          <option value="NA1">NA</option>
          <option value="OC1">OC</option>
          <option value="RU">RU</option>
          <option value="TR1">TR</option>
        </select>
        <input type="text"
              value={ign}
              onChange={ (e) => { setIgn(e.target.value) } }/>
        <button type="submit">Submit</button>
      </form>
      { isSubmit && <Overview info={info} region={region} stats={stats}/> }
      { isSubmit && console.log(info) }
      { isReqError && <Popup handleClose={handleClose} /> }
    </div>
  );
}

export default App;
