import React, { useState, useEffect } from 'react'
import { genRobots, generateGridArray, runRobot } from '../util'
import Controller from './selection_controller'
import Display from './display'

//Number of states (2 * 3**4 ) = 162 - 25 =  (137 possible states)


const Selection = () => {
    const [sampleSize, setSampleSize] = useState(10)
    const [selectionPercetage, setSelectionPercetage] = useState(30)
    const [iteration, setIteration] = useState(30)
    const [robots, setRobots] = useState(null)
    const [movesMultiplier, setMovesMultiplier] = useState(1)
    const [trashCollectedMultiplier, setTrashCollectedMultiplier] = useState(10)

    // current run states
    const [displayGrid, setDisplayGrid] = useState(false)
    const [running, setRunning] = useState(false)
    const [gridSize, setGridSize] = useState(5)
    const [trashChange, setTrashChange] = useState(20)
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
                let selectedRobots = robotIteration(runRobots, gridArray[0], gridArray[1], setGridArray, selectionPercetage, movesMultiplier, trashCollectedMultiplier)
                runRobots = selectedRobots
            }

            setRobots(runRobots)


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
         displayGrid={displayGrid}
         setDisplayGrid={setDisplayGrid}
         running={running}
          />
        <Display displayGrid={displayGrid} running={running} gridArray={gridArray} robots={robots}/>
        
    </div>)
}

function robotIteration(robots, gridArray, robotPos, setGridArray, selectionPercetage,  movesMultiplier, trashCollectedMultiplier) {

        // for each robot in robots run in the gridArray and return the score
        let newRobots = robotSampleRun(gridArray, robotPos, robots, setGridArray, movesMultiplier, trashCollectedMultiplier)

        // select the top robots from the  Robots array

        let robotsSelectedByScore = selectRobotsByScore(newRobots, selectionPercetage)

        // fill with next random robots and run to get it score
        let deltaRobotsSize = newRobots.length - robotsSelectedByScore.length 
        let newFillRobots = genRobots(deltaRobotsSize)
        // console.log({deltaRobotsSize}, {newFillRobots}, {robotsSelectedByScore})
        let newFillRobotsRunned = robotSampleRun(gridArray, robotPos, newFillRobots, setGridArray, movesMultiplier, trashCollectedMultiplier)
    

    return [...robotsSelectedByScore, ...newFillRobotsRunned]
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
    robots.sort((a, b) => b.currRun.score - a.currRun.score) // sort desc by currRun Score

        // add top score robots
    for (let robot of robots) {

        if (selectedRobots.length < selectionNumber){
            selectedRobots.push(robot)
        }
    }

    return selectedRobots
}


export default Selection

