import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import goalService from './goalService'

const initialState = {
    goals: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

//CREATE goals

export const createGoal = createAsyncThunk('goal/create', async (goalData, thunkApi) => {
    try {
        const token = thunkApi.getState().auth.user.token ? thunkApi.getState().auth.user.token : null
        
        return await goalService.createGoal(goalData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
            || error.message || error.toString()

        return thunkApi.rejectWithValue(message)
    }
})


//GET user goals

export const getGoals = createAsyncThunk('goal/getAll', async (_, thunkApi) => {
    try {

        const token = thunkApi.getState().auth.user.token ? thunkApi.getState().auth.user.token : null

        return await goalService.getGoals(token)

    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
            || error.message || error.toString()

        return thunkApi.rejectWithValue(message)
    }
})

//DELETE Goal

export const deleteGoal = createAsyncThunk('goal/deleteGoal', async (id, thunkApi) => {
    try {
        
        const token = thunkApi.getState().auth.user.token ? thunkApi.getState().auth.user.token : null

        return await goalService.deleteGoal(id, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
            || error.message || error.toString()

        return thunkApi.rejectWithValue(message)
    }
})


//UPDATE goals

export const updateGoal = createAsyncThunk('goal/updateGoal', async (updateData, thunkApi) => {
    try {
        const token = thunkApi.getState().auth.user.token ? thunkApi.getState().auth.user.token : null
        // console.log(token,'from slice');
        return await goalService.updateGoal(updateData, token)

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
                state.goals.push(action.payload)
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
                state.goals = action.payload

            })

            .addCase(getGoals.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            .addCase(deleteGoal.pending, (state) => {
                state.isLoading = true
            })

            .addCase(deleteGoal.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.goals = state.goals.filter((goal) =>
                    goal._id !== action.payload.id
                )
            })

            .addCase(deleteGoal.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })

            .addCase(updateGoal.pending, (state) => {
                state.isLoading = true
            })

            .addCase(updateGoal.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true

                state.goals = [...state.goals.filter((goal) =>
                    goal._id !== action.payload.id
                ), action.payload]

            })

            .addCase(updateGoal.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }

})


export const { reset } = goalSlice.actions
export default goalSlice.reducer