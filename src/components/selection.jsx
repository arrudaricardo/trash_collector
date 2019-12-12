import React,{useState, useEffect} from 'react'
import {genRobots, generateGridArray, checkPos, runRobot} from './util'
import Grid from './display_run'

//TODO: get x random sample test and weight by score (hight score higher chance to be selected) and select y percentage and fill with random z times 
//Number of states (2 * 3**4 ) = 162 - 25 =  (137 possible states)


const Selection = () => {
    const [sampleSize, setSampleSize] = useState(1)
    const [selectionPercetage, setSelectionPercetage] = useState(0.1)
    const [iteration, setIteration] = useState(1)
    const [robots, setRobots] = useState(genRobots(sampleSize))

    // current run states
    const [running, setRunning] = useState(false)
    const [gridSize, setGridSize] = useState(5)
    const [trashChange, setTrashChange] = useState(10)
    const [gridArray, setGridArray] = useState(null)
    // const [robotPos, setRobotPos] = useState(null)


    useEffect(() => {
        if (running){ 
        // robotIteration(robots, gridArray, robotPos, setGridArray, iteration, selectionPercetage, setRobotPos, gridSize, trashChange)
        setRunning(false)
        }
    },[running])

    const runGame = () => {
        // const gridRobotPos = generateGridArray(gridSize, trashChange)
        // setRobotPos(gridRobotPos[1])
        // setGridArray(gridRobotPos[0])

        setGridArray(generateGridArray(gridSize, trashChange))
        setGridArray = null
        setRobotPos = null
        robotIteration(robots, gridArray[0], gridArray[1], setGridArray, iteration, selectionPercetage, setRobotPos, gridSize, trashChange)
        
        // setRunning(true)
    }

    return (<div >
        <button onClick={() => runGame()}>RUN</button>
        {(gridArray !== null) && <Grid gridArray={gridArray[0]} /> }
        </div>)
}



function robotIteration(robots, gridArray, robotPos, setGridArray, iteration, selectionPercetage, setRobotPos, gridSize, trashChange){
    // TODO: chnage gridArray for each new iteration
    // TODO: not selecting best scores

    for (let i = 0; i < iteration; i++){
        let newrobots = robotSampleRun(gridArray, robotPos, robots, setGridArray, setRobotPos)
        robots = selectRobotsByScore(newrobots, selectionPercetage)
    }
    return robots
}

function robotSampleRun(gridArray, robotPos, robots, setGridArray, setRobotPos){
    let newRobots = []
    let currentGridArray = gridArray
    let currentRobotPos = robotPos

    for (let robot of robots){
        let newRobot = runRobot(currentGridArray, currentRobotPos, robot, setGridArray, setRobotPos)
        newRobots.push(newRobot)
    }
    return newRobots
}

function selectRobotsByScore(robots, seletionPercetage){
    let selectedRobots = []
    let selectionNumber = Math.floor(seletionPercetage * robots.length)

    //sort by score
    robots.sort( (a,b) => a.metadata.currRun - b.metadata.currRun)

    while( selectedRobots.length <= selectionNumber){
        for (let robot of robots){
            // let lastScore = robot.currRun.score
            let averageScore = robot.metadata.scores.reduce( (acc, val) => {return acc + val/robot.metadata.scores.length }, 0) 
            robot.metadata.averageScore = averageScore;

            if (Math.random() > seletionPercetage){
                selectedRobots.push(robot)
            }else{
                selectedRobots.push(robots[Math.floor(Math.random() * robots.length)])
            }

        }
        
    }
    
    return selectedRobots
}














export default Selection

