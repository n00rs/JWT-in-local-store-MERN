import { useState } from "react"
import { useDispatch } from "react-redux"
import { deleteGoal, updateGoal } from '../features/goal/goalSlice'




function GoalItem({ goals }) {
  const [text, setText] = useState('')


  const dispatch = useDispatch()
  // console.log(props);



  const handleSubmit = (e) => {
    e.preventDefault()
    const updateData = { text, id: goals._id }
    console.log(updateData);
    dispatch(updateGoal(updateData))
    setText('')

  }
  return (
    <div className='goal'>
      <div>
        {new Date(goals.createdAt).toDateString()}
        <h2>{goals.text}</h2>
        <button onClick={(e) => {e.preventDefault()
        
        dispatch(deleteGoal(goals._id))
      }
      }
          className='close' >
          X</button>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input type='text' id="text" name="text" value={text} onChange={(e) => setText(e.target.value)} />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              update
            </button>
          </div>
        </form>
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