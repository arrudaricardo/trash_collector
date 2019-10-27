import React from 'react';
import trashImg from '../static/img/trash.png'
import robotImg from '../static/img/robot.png'

export default function Box({id, hasRobot,hasTrash}){

 return (
  <div 
   id="{id}"
   className={`gridBox ${hasRobot ? "robot": hasTrash? "trash": ""}`}> 
   <img src={hasRobot? robotImg: hasTrash? trashImg: ''} alt='' />
    <div className='position-id'> 
    {id[0]}-{id[1]}
    </div>
   </div>
 ) 
}