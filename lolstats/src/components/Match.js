import React from 'react'

const Match = (props) => {

    let rows = [];
    for(let i = 0; i<10; i++){
        let index = props.matchData1[i].indexOf(props.puuid);
        rows.push(<h4 key={i}>{props.matchData2[i][index].win ? 'W: ' : 'L: '}{props.matchData2[i][index].championName} {props.matchData2[i][index].kills}-{props.matchData2[i][index].deaths}-{props.matchData2[i][index].assists}</h4>);
        //console.log(rows[i]);
    }

    return (
        <div>        
            <ul>
                {rows}
            </ul>
        </div>
    )
}

export default Match
