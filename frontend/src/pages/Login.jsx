
import { useEffect, useState } from 'react'
import { FaSignInAlt, FaUser } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import { login , reset } from '../features/auth/authSlice'
// import { Toast } from 'react-toastify/dist/components'


function Login() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user, isError, isSuccess, isLoading, message } = useSelector((state) => state.auth)

    useEffect(() => {

        if (isError) toast.error(message)

        if (isSuccess || user) navigate('/')

        dispatch(reset())

    }, [user, isError, isSuccess, message, navigate, dispatch])



    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const { email, password } = formData

    //getting logindetails

    const getvalues = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name] : e.target.value
        }))

    }


    const handleSubmit = (e) => {
        e.preventDefault()
        
        const loginData = { email, password }
        
        dispatch(login(loginData))
    }

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <section className='heading' >
                <h1>
                    <FaSignInAlt />LOGIN
                </h1>
                <p>
                    Enter Your Credentials
                </p>

            </section>
            <section className="form">

                <form  onSubmit={handleSubmit} >
                    <div className="form-group">

                        <input type='email' id='email' name='email' placeholder='Email' className='form-control' onChange={getvalues} value={email} />
                    </div>
                    <div className="form-group">

                        <input type='password' id='password' name='password' placeholder='Enter Password' className='form-control' onChange={getvalues} value={password} />
                    </div>
                    <div className="form-group">
                        <button type="submit" className='btn bn-block'>Login</button>
                    </div>
                </form>
            </section>
        </>
    )
}

export default Login