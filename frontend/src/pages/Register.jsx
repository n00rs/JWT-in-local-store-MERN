
// import { useEffect } from "react"
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";
import { register, reset } from '../features/auth/authSlice'
import Spinner from "../components/Spinner";

function Register() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    )
    
    
    useEffect(() => {
        if(isError) toast.error(message)
        
        if (isSuccess || user) navigate('/')
        
        dispatch(reset())
        
    }, [user, isError, isSuccess, message, navigate, dispatch ])
    
    const [formData, setFormdata] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const { name, email, password, password2 } = formData


    const getValues = (e) => {
        setFormdata((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (password !== password2)
            toast.error('passwords do not match')
        else {
            const userData = { name, email, password }

            dispatch(register(userData))
        }
    }

if(isLoading) {
    return <Spinner />
}

    return (
        <>
            <section className="heading">
                <h1>
                    <FaUser /> Register
                </h1>
                <p>
                    Create An Account
                </p>
            </section>
            <section className="form">
                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <input type="text" className="form-control" id="name" name="name" placeholder="Enter your name" onChange={getValues} value={name} />
                    </div>
                    <div className="form-group">
                        <input type="email" className="form-control" id="email" name="email" placeholder="Enter your email" onChange={getValues} value={email} />
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" id="password" name="password" placeholder="Enter your Password" onChange={getValues} value={password} />
                    </div>

                    <div className="form-group">
                        <input type="password" className="form-control" id="password2" name="password2" placeholder="Confirm Password" onChange={getValues} value={password2} />
                        <div className="form-group">
                            <button type="submit" value="" className="btn btn-block" >Submit</button>
                        </div>
                    </div>
                </form>
            </section>
        </>
        // <div>Register</div>
    )
}

export default Register