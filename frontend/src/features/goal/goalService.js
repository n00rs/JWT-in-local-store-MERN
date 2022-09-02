import axios, { Axios } from 'axios'

const API_URL = '/api/goals/'


//to create goal
const createGoal = async (goalData, token)=>{
    const config = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }
    // console.log(config);
    const response = await axios.post(API_URL,goalData,config)

   return response.data
}

//TO GET GOALS
const getGoals = async (token)=>{
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL,config)
    return response.data
}


//DELETE GOAL
const deleteGoal = async (id,token)=>{
    const config = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.delete(API_URL+id, config)
    return response.data

}

//UPDATE GOAL
const updateGoal = async(updateData,token)=>{
    const config = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }
    console.log(config);

const response = await axios.put(API_URL+updateData.id,updateData, config)
return response.data
}

const goalService = {
    createGoal,
    getGoals,
    deleteGoal,
    updateGoal
}

export default goalService 