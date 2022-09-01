
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import GoalForm from "../components/GoalForm"
import { getGoals, reset } from "../features/goal/goalSlice"
// import Sp from "../components/Spinner";
import Spinner from "../components/Spinner"


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
        <GoalForm />


      </section>
    </>
  )
}

export default Dashboard