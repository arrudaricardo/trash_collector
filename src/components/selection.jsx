import React,{useState, useEffect} from 'react'
import {genRobots, generateGridArray, checkPos, runRobot} from './util'
import Grid from './display_run'

//TODO: get x random sample test and weight by score (hight score higher chance to be selected) and select y percentage and fill with random z times 
//Number of states (2 * 3**4 ) = 162 - 25 =  (137 possible states)


const Selection = () => {
    const [sampleSize, setSampleSize] = useState(10)
    const [selectionPercetage, setSelectionPercetage] = useState(0.1)
    const [iteration, setIteration] = useState(20)
    const [robots, setRobots] = useState(genRobots(sampleSize))

    // current run states
    const [running, setRunning] = useState(false)
    const [gridSize, setGridSize] = useState(5)
    const [trashChange, setTrashChange] = useState(10)
    const gridRobotPos = generateGridArray(gridSize, trashChange)
    const [gridArray, setGridArray] = useState(gridRobotPos[0])
    const [robotPos, setRobotPos] = useState(gridRobotPos[1])


    useEffect(() => {
        if (!running){
        robotIteration(robots, gridArray, robotPos, setGridArray, iteration, selectionPercetage, setRobotPos)
        setRunning(true)
        }
    },[])

    return (<div >
        <Grid gridArray={gridArray} />
        </div>)
}


function robotIteration(robots, gridArray, robotPos, setGridArray, iteration, selectionPercetage, setRobotPos ){
    // TODO: chnage gridArray for each new iteration
    // TODO: not selecting best scores
    for (let i = 0; i < iteration; i++){
        let newrobots = robotSampleRun(gridArray, robotPos, robots, setGridArray, setRobotPos)
        // console.log(newrobots)
        robots = selectRobotsByScore(newrobots, selectionPercetage)
    }
    // console.log('final',robots)
    return robots
}

function robotSampleRun(gridArray, robotPos, robots, setGridArray, setRobotPos){
    let newRobots = []
    let currentGridArray = [...gridArray]
    let currentRobotPos = [...robotPos]

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
    console.log(robots)

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
    
    console.log(selectedRobots)
    return selectedRobots
}














export default Selection

