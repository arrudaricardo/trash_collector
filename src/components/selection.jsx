import React,{useState, useEffect} from 'react'
import {genRobots, generateGridArray, checkPos, runRobot} from './util'
import Grid from './display_run'

//TODO: get x random sample test and weight by score (hight score higher chance to be selected) and select y percentage and fill with random z times 
//Number of states (2 * 3**4 ) = 162 - 25 =  (137 possible states)


const Selection = () => {
    const [sampleSize, setSampleSize] = useState(1)
    const [seletionPercetage, setSelectionPercetage] = useState(0.1)
    const [iteration, setIteration] = useState(20)
    const [robots, setRobots] = useState(genRobots(sampleSize))

    // current run states
    const [gridSize, setGridSize] = useState(5)
    const [trashChange, setTrashChange] = useState(0)
    const gridRobotPos = generateGridArray(gridSize, trashChange)
    const [gridArray, setGridArray] = useState(gridRobotPos[0])
    const [robotPos, setRobotPos] = useState(gridRobotPos[1])


    useEffect(() => {
        runRobot(gridArray, robotPos, robots[0], setGridArray, setRobotPos)
    },[])

    return (<div >
        <Grid gridArray={gridArray} />
        </div>)
}


















export default Selection

