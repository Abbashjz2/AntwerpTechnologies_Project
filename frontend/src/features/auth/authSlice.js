import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'
import { createCampaign } from '../campaigns/campaignSlice'
//Get user from localStorage
const user = JSON.parse(localStorage.getItem('user'))


const initialState = {
  user: user ? user : null,
  allUsers: [],
  userInbox: user?.messages,
  switchInbox: "",
  isError1: false,
  isSuccess: false,
  isLoading: false,
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
})

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
    return await authService.updateUser(userData, token)
  } catch (error) {
    const message = (error.message && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})

export const removeNotification = createAsyncThunk('user/remove-notification', async (data, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await authService.removeNotification(data, token)
  } catch (error) {
    const message = (error.message && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})
export const sendMessage = createAsyncThunk('user/send-message', async (data, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await authService.sendMessage(data, token)
  } catch (error) {
    const message = (error.message && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})
export const getMessages = createAsyncThunk('user/get-message', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token
    return await authService.getMessages(id, token)
  } catch (error) {
    const message = (error.message && error.response.data && error.response.data.message) || error.message || error.toString()
    return thunkAPI.rejectWithValue(message)
  }
})
export const changeUserInbox = createAsyncThunk('auth/change-inbox', async (data,) => {
  return await data
})
export const goToInbox = createAsyncThunk('auth/go-to-inbox', async (data,) => {
  return await data
})

export const getFromSocket = createAsyncThunk('auth/socket-inbox', async (data,) => {
  return await data
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
      .addCase(createCampaign.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createCampaign.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        action.payload.users.map((user) => {

          state.allUsers.map((allUser) => {
            if (user.toString() === allUser._id.toString()) {
              const index = state.allUsers.findIndex((u) => u._id === user)
              state.allUsers[index].notification.push(action.payload)
              // state.allUsers[index]
            }
          })
        })
      })
      .addCase(createCampaign.rejected, (state, action) => {
        state.isLoading = false
        state.isError1 = true

      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null
        state.allUsers = null
      })
      .addCase(removeNotification.pending, (state) => {
        state.isLoading = true
      })
      .addCase(removeNotification.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.user.notification = state.user.notification.filter((noti) => noti._id !== action.payload.id)
        localStorage.removeItem('user')
        localStorage.setItem('user', JSON.stringify(state.user))

      })
      .addCase(removeNotification.rejected, (state, action) => {
        state.isLoading = false
        state.isError1 = true
        state.message = action.payload
      })
      .addCase(changeUserInbox.pending, (state) => {
        state.isLoading = true
      })
      .addCase(changeUserInbox.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.switchInbox = action.payload
      })
      .addCase(changeUserInbox.rejected, (state, action) => {
        state.isLoading = false
        state.isError1 = true
        state.message = action.payload
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.userInbox.push(action.payload)
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.isLoading = false
        state.isError1 = true
        state.message = action.payload
      })
      .addCase(getFromSocket.pending, (state) => {
        state.isLoading = true
      }) 
      .addCase(getFromSocket.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.userInbox.push(action.payload)

      }) 
      .addCase(getFromSocket.rejected, (state, action) => {
        state.isLoading = false
        state.isError1 = true
        state.message = action.payload
      })
      .addCase(getMessages.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.userInbox = action.payload.messages
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.isLoading = false
        state.isError1 = true
        state.message = action.payload
      })
      .addCase(goToInbox.pending, (state) => {
        state.isLoading = true
      })
      .addCase(goToInbox.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.switchInbox = action.payload
      })
      .addCase(goToInbox.rejected, (state, action) => {
        state.isLoading = false
        state.isError1 = true
        state.message = action.payload
      })

  },
})

export const { reset } = authSlice.actions
export default authSlice.reducer