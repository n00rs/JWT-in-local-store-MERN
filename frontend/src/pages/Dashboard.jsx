
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import GoalForm from "../components/GoalForm"
import { getGoals, reset } from "../features/goal/goalSlice"
// import Sp from "../components/Spinner";
import Spinner from "../components/Spinner"
// import GoalItem from "../components/GoalItem"
import GoalItem from '../components/GoalItem'


function Dashboard() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)
  const { goals, isError, isLoadinig, message } = useSelector((state) => state.goal)

  useEffect(() => {
    if (isError) {
      console.log(message)
    }
    if (!user) navigate('/login')

    dispatch(getGoals())

    return () => {
      dispatch(reset())
    }

  }, [user, isError, message, dispatch, navigate])

  if (isLoadinig) {
    return <Spinner />
  }
  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Dashboard</p>
      </section>
      <GoalForm />

      <section className="content">

        {goals.length > 0 ? (
          <div className="goals" >
            {
            goals.map((goal) => {
// console.log(goal);
           return  <GoalItem key={goal._id} goals={goal} />
              // return
            })
            }
          </div>
        ) : (
          <h3> sorry Nothing to display here</h3>
        )}

      </section>

    </>
  )
}

export default Dashboard