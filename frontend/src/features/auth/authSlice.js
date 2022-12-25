import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import authService from './authService'

//Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))


const initialState = {
    user: user ? user : null,
    allUsers: [],
    isError1 : false,
    isSuccess : false,
    isLoading : false,
    message: ''
}

export const getUsers = createAsyncThunk('users/getAll', async (_, thunkAPI) => {
  try {
      const token = thunkAPI.getState().auth.user.token
        return await authService.getUsers(token)
    } catch (error) {
        const message = (error.message && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
} )

//Register USER 
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try {
        return await authService.register(user)
    } catch (error) {
        const message = (error.message && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})
//Login USER 
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
      return await authService.login(user)
  } catch (error) {
      const message = (error.message && error.response.data && error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
  }
})
// Get AllData
export const updateUser = createAsyncThunk('user/update', async (userData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await authService.updateUser(userData ,token)
  } catch (error) {
      const message = (error.message && error.response.data && error.response.data.message) || error.message || error.toString()
      return thunkAPI.rejectWithValue(message)
  }
})

export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout()
  })

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError1 = false
            state.isSuccess = false
            state.message = ''
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(getUsers.pending, (state) => {
          state.isLoading = true
      })
      .addCase(getUsers.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.allUsers = action.payload
        })
      .addCase(getUsers.rejected, (state, action) => {
           state.isLoading = false
           state.isError1 = true
           state.message = action.payload
      })
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
          state.isError1 = true
          state.message = action.payload
          state.user = null
        })
        .addCase(login.pending, (state) => {
          state.isLoading = true
        })
        .addCase(login.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.user = action.payload
        })
        .addCase(login.rejected, (state, action) => {
          state.isLoading = false
          state.isError1 = true
          state.message = action.payload
          state.user = null
        })
        .addCase(updateUser.pending, (state) => {
          state.isLoading = true
        })
        .addCase(updateUser.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.user = action.payload
        })
        .addCase(updateUser.rejected, (state, action) => {
          state.isLoading = false
          state.isError1 = true
          state.message = action.payload
          state.user = null
        })
        .addCase(logout.fulfilled, (state) => {
            state.user = null
            state.allUsers = null
          })
          
    },
  })
  
  export const { reset } = authSlice.actions
  export default authSlice.reducer