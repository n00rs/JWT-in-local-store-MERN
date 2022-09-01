import { useDispatch } from "react-redux"
import{deleteGoal} from '../features/goal/goalSlice'




function GoalItem({goals}) {


  const dispatch = useDispatch()
    // console.log(props);
    return (
        <div className='goal'>
            <div>
                {new Date(goals.createdAt).toDateString()}
                <h2>{goals.text}</h2>
                <button onClick={() => dispatch (deleteGoal(goals._id))}
                 className='close' >
                  X</button>
            </div>

        </div>
    )
}

export default GoalItem


// import React from 'react'

// function GoalItem(props) {
//     console.log(props);
//   return (
//     <div>GoalItem</div>
//   )
// }

// export default GoalItem