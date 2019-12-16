import React, { useState, useEffect } from 'react'
import { genRobots, generateGridArray, runRobot } from './util'
import Grid from './display_run'
import Controller from './selection_controller'
import Result from './selection_results'

//TODO: get x random sample test and weight by score (hight score higher chance to be selected) and select y percentage and fill with random z times 
//Number of states (2 * 3**4 ) = 162 - 25 =  (137 possible states)


const Selection = () => {
    const [sampleSize, setSampleSize] = useState(10)
    const [selectionPercetage, setSelectionPercetage] = useState(30)
    const [iteration, setIteration] = useState(1)
    const [robots, setRobots] = useState(null)
    const [movesMultiplier, setMovesMultiplier] = useState(1)
    const [trashCollectedMultiplier, setTrashCollectedMultiplier] = useState(10)

    // current run states
    const [running, setRunning] = useState(false)
    const [gridSize, setGridSize] = useState(5)
    const [trashChange, setTrashChange] = useState(10)
    const [gridArray, setGridArray] = useState(null)



    const runGame = () => {
        setGridArray(() => {
            setRobots(genRobots(sampleSize)); // gen robots
            setRunning(true);
            return generateGridArray(gridSize, trashChange)
        })

    }

    useEffect(() => {
        // run robots iteration
        if (running) {
            let runRobots = [...robots]

            // run N iteration for initial robot array
            for (let i = 0; i < iteration; i++) {
                let selectedRobots = robotIteration(robots, gridArray[0], gridArray[1], setGridArray, selectionPercetage, movesMultiplier, trashCollectedMultiplier)
                setRobots(selectedRobots)
            }

            // setRobots(runRobot)
            setRunning(false)
        }
    }, [gridArray])

    return (<div >
        <Controller runGame={runGame}
         sampleSize={sampleSize} 
         setSampleSize={setSampleSize}
         selectionPercetage={selectionPercetage}
         setSelectionPercetage={setSelectionPercetage} 
         iteration={iteration} 
         setIteration={setIteration} 
         gridSize={gridSize} 
         setGridSize={setGridSize} 
         trashChange={trashChange} 
         setTrashChange={setTrashChange}
         movesMultiplier={movesMultiplier}
         setMovesMultiplier={setMovesMultiplier}
         trashCollectedMultiplier={trashCollectedMultiplier}
         setTrashCollectedMultiplier={setTrashCollectedMultiplier}
          />
        {(gridArray !== null) &&
            <div style={{ display: 'flex', padding: '0.1em' }} >
                <Grid gridArray={gridArray[0]} />
                <Result {...robots} />
            </div>
        }
    </div>)
}


function robotIteration(robots, gridArray, robotPos, setGridArray, selectionPercetage,  movesMultiplier, trashCollectedMultiplier) {

        // for each robot in robots run in the gridArray and return the score
        let newRobots = robotSampleRun(gridArray, robotPos, robots, setGridArray, movesMultiplier, trashCollectedMultiplier)

        // select the top robots from the  Robots array

        // robots = selectRobotsByScore(newrobots, selectionPercetage)
    

    return newRobots
}

function robotSampleRun(gridArray, robotPos, robots, setGridArray, movesMultiplier, trashCollectedMultiplier) {
    let newRobots = []
    let currentRobotPos = [...robotPos]

    for (let robot of robots) {
    const currentGridArray = JSON.parse(JSON.stringify(gridArray))
       let newRobot = runRobot(currentGridArray, currentRobotPos, robot, setGridArray, movesMultiplier, trashCollectedMultiplier)

    //    console.log(robot.currRun.score)
        newRobots.push(newRobot)
    }
    return newRobots
}

function selectRobotsByScore(robots, seletionPercetage) {
    let selectedRobots = []
    let robotsSize = robots.length
    let selectionNumber = Math.ceil((seletionPercetage / 100) * robotsSize)

    //sort by score
    robots.sort((a, b) => a.metadata.currRun - b.metadata.currRun)

        for (let robot of robots) {

        // update average scores
        let averageScore = robot.metadata.scores.reduce((acc, val) => { return acc + val / robot.metadata.scores.length }, 0)
        robot.metadata.averageScore = averageScore;

        // add top robots
        if (selectedRobots.length < selectionNumber){
            selectedRobots.push(robot)
        }
    }

    // fill with next random robots
    let deltaRobotsSize = robotsSize - selectedRobots.length 
    let newRobots = genRobots(deltaRobotsSize)

    return [...selectedRobots, ...newRobots]
}


export default Selection

