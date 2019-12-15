import React,{useState, useEffect} from 'react'
import {genRobots, generateGridArray, checkPos, runRobot} from './util'
import Grid from './display_run'
import Controller from './selection_controller'
import Result from './selection_results'

//TODO: get x random sample test and weight by score (hight score higher chance to be selected) and select y percentage and fill with random z times 
//Number of states (2 * 3**4 ) = 162 - 25 =  (137 possible states)


const Selection = () => {
    const [sampleSize, setSampleSize] = useState(2)
    const [selectionPercetage, setSelectionPercetage] = useState(0.1)
    const [iteration, setIteration] = useState(1)
    const [robots, setRobots] = useState(null)

    // current run states
    const [running, setRunning] = useState(false)
    const [gridSize, setGridSize] = useState(5)
    const [trashChange, setTrashChange] = useState(10)
    const [gridArray, setGridArray] = useState(null)



    const runGame = () => {
        setGridArray(() => {
        setRobots(genRobots(sampleSize)) // gen robots
        setRunning(true);
        return generateGridArray(gridSize, trashChange)
        })
        
    }

    useEffect(() => {
        if (running){ 
            console.log(gridArray)
            robotIteration(robots, gridArray[0], gridArray[1], setGridArray, iteration, selectionPercetage, gridSize, trashChange)
            setRunning(false)
        }
    },[gridArray])

    return (<div >
        <Controller runGame={runGame} sampleSize={sampleSize} setSampleSize={setSampleSize} selectionPercetage={selectionPercetage} setSelectionPercetage={setSelectionPercetage} iteration={iteration} setIteration={setIteration} gridSize={gridSize} setGridSize={setGridSize} trashChange={trashChange} setTrashChange={setTrashChange} />
        {(gridArray !== null) &&
        <div style={{display:'flex', padding:'0.1em'}} >
            <Grid gridArray={gridArray[0]} /> 
            <Result {...robots} /> 
        </div>
        }
        </div>)
}


function robotIteration(robots, gridArray, robotPos, setGridArray, iteration, selectionPercetage, setRobotPos, gridSize, trashChange){
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

