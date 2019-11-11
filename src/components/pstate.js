import React from 'react'

export default function Pstate({gridState}){

  return (
    <div> {Object.keys(gridState).length > 0? 'Last Actions:' : ''}
      <ul>
      {Object.values(gridState).map((a,i) => <li key={i}> {a}</li>)}
      </ul>
    </div>
  )
}