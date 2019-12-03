import React,{useState, useEffect} from 'react'
import {genRobot} from './util'

//TODO: get x random sample test and weight by score (hight score higher chance to be selected) and select y percentage and fill with random z times 
//Number of states (2 * 3**4 ) = 162 - 25 =  (137 possible states)


const Selection = () => {
    const [sampleSize, setSampleSize] = useState(100)
    const [seletionPercetage, setSelectionPercetage] = useState(0.1)
    const [iteration, setIteration] = useState(20)
    const [robots, setRobots] = useState([])

    useEffect(() => {
    },[])


    return (<div>TEST
        </div>
    )
}


export default Selection








