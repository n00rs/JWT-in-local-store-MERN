import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import goalService from './goalService'

const initialState = {
    goal: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

//xreate goals

export const createGoal = createAsyncThunk('goal/create', async (goalData, thunkApi) => {
    try {
        const token = thunkApi.getState().auth.user.token
        return await goalService.createGoal(goalData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
            || error.message || error.toString()

        return thunkApi.rejectWithValue(message)
    }
})


//get user goals

export const getGoals = createAsyncThunk('goal/getAll', async (_, thunkApi) => {
    try {

        const token = thunkApi.getState().auth.user.token
        return await goalService.getGoals(token)


    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
            || error.message || error.toString()

        return thunkApi.rejectWithValue(message)
    }
})

export const goalSlice = createSlice({
    name: 'goal',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder

            .addCase(createGoal.pending, (state) => {
                state.isLoading = true
            })

            .addCase(createGoal.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.goal.push(action.payload)
            })

            .addCase(createGoal.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            .addCase(getGoals.pending, (state) => {
                state.isLoading = true
            })

            .addCase(getGoals.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.goal = action.payload

            })

            .addCase(getGoals.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }

})


export const { reset } = goalSlice.actions
export default goalSlice.reducer