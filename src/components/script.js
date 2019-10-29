import React, {useState} from "react";

export default ({inputHandle}) => {
    const [script, setScript] = useState("");

    //Block by identention and semicolen
    // Directions <DIR>: UP, DOWN, LEFT, RIGHT
    // Action: GO <DIR>
    // Elements <ELE>: WALL, EMPTY, TRASH
    // Logical operator <LO>: OR, AND, NOT, IS
    // Condicionals: IF, ELSE
    //
    // Exemple:
    // IF (<DIR> <LO> <ELE>):
    //  GO <DIR>
    // ELSE:
    // GO <DIR>
    //
    // Action GO <DIR> execute script
    
    function handleScript(event) {
        setScript(event.target.value);
    }

    function parseScript(script) {
        // console.log(script)
        let executionLines = script.split(/[\r\n]+/g); //by line break; 
        return executionLines;
    }

    function runScript(event) {
        // return key
        let wallHits = 0;
        let scriptParsed = parseScript(script);

        // regex
        let regexIf = /if\s(up|down|left|right)\s(empty|trash|wall|):\n(up|down|left|right)/i;
        console.log("execution script", scriptParsed);
        // exec loop

        const execution = function() {
            const executionStack = [];
            for (let line of scriptParsed) {
                let match = regexDir.exec(line)[1];
                let checkedPos = checkPos(match);
                console.log("Going", match, "It is:", checkedPos);
                executionStack.push(match);
                const validMove = inputHandle(match);
                // check for wall hits
                console.log("validMove?", validMove);
                if (!validMove) {
                    wallHits++;
                    // if hit wall n times in a row stop
                }
            }
            if (wallHits < 3) {
                // setTimeout(() => execution(), 1000)
            }
            return true;
        };

        execution();
    }
    return (
        <div id="script">
            <textarea value={script} onChange={handleScript} />
            <button onClick={runScript}>RUN</button>
        </div>
    );
};
