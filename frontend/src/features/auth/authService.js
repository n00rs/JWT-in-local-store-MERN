import axios from 'axios'

 const API_URL = '/api/users/'

 //user Signup

 const register = async (signupData) => {
    const response = await axios.post(API_URL,signupData)

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
 }

//USER LOGOUT

const logout = ()=>{
    localStorage.removeItem('user')
}


 //USER LOGIN 

 const login = async(loginData)=>{
    console.log('inside axios')
    const response = await axios.post(`${API_URL}login`, loginData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
 }

 const  authService = {register, logout, login} 

 export default authService  