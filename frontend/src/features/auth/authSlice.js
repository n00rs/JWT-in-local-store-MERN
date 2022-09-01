import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

//USER SIGNUP

export const register = createAsyncThunk('auth/register', async (signupData, thunkApi) => {
    try {
        // console.log('fromreg');
        return await authService.register(signupData)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message)
            || error.message || error.toString()

        return thunkApi.rejectWithValue(message)
    }
})


//USER LOGOUT
export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout()
})


//USER LOGIN

export const login = createAsyncThunk('auth/login', async (loginData, thunkApi) => {
    try {
        console.log('insidethnun');
        return await authService.login(loginData)
    } catch (error) {

        const loginError = (error.response && error.response.data && error.response.data.message)
            || error.message || error.toString()

        return thunkApi.rejectWithValue(loginError)
    }
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isError = false
            state.isSuccess = false
            state.isLoading = false
            state.message = ''

        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
            })
            .addCase(login.pending, (state => state.isLoading = true))
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.message = action.payload
                state.user = null
            })

    }
})


export const { reset } = authSlice.actions
export default authSlice.reducer