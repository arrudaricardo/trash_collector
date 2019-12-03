import React,{useState, useEffect} from 'react'
import {combineArrays} from './util'

//TODO: get x random sample test and weight by score (hight score higher chance to be selected) and select y percentage and fill with random z times 
//Number of states (2 * 3**4 ) = 162 - 25 =  (137 possible states)


const Selection = () => {
    const posStates = {up: ['trash', 'wall', 'empty'], down: ['trash', 'wall', 'empty'], left: ['trash', 'wall', 'empty'], right: ['trash', 'wall', 'empty'], current:['trash', 'empty']}
    const [sampleSize, setSampleSize] = useState(100)
    const [seletionPercetage, setSelectionPercetage] = useState(0.1)
    const [iteration, setIteration] = useState(20)
    const [robots, setRobots] = useState([])

    useEffect(() => {
        let arr = Object.values(posStates)
        let res = combineArrays(arr)
        console.log(res)

    },[])


    return (<div>TEST
        </div>
    )
}


export default Selection









function genRobot(){

}



// const getStateSum = () => {
//     let stateSum = 1;
//     Object.keys(gridState).forEach(dir => {
//         stateSum *= stateValues[dir][gridState[dir]];
//     });
//     return stateSum;
// };




