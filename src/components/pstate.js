import React from 'react'

export default function Pstate({pState}){

  return (
    <div> {Object.keys(pState).length > 0? 'Last Actions:' : ''}
      <ul>
      {Object.values(pState).map((a,i) => <li key={i}> {a}</li>)}
      </ul>
    </div>
  )
}