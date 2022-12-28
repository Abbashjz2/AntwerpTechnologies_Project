 import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import CampaignService from './campaignService'

const initialState = {
    campaigns: [], 
    isError: false,
    isLoading: false,
    isSuccess: false,
    message : ''
}
//create new Campaign
export const createCampaign = createAsyncThunk('campaign/create', async(campaignData, thunkAPI) => {
    try {
      
      const token = thunkAPI.getState().auth.user.token
        return await CampaignService.createCampaign(campaignData, token)
    } catch (error) {
        const message = (error.message && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
  })

  export const updateCampaign = createAsyncThunk('campaign/update', async(campaignData, thunkAPI) => {
    try {
      
      const token = thunkAPI.getState().auth.user.token
        return await CampaignService.updateCampaign(campaignData, token)
    } catch (error) {
        const message = (error.message && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
  })

  //Get user Campaigns
  export const getCmapaigns = createAsyncThunk('campaigns/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
          return await CampaignService.getCmapaigns(token)
      } catch (error) {
          const message = (error.message && error.response.data && error.response.data.message) || error.message || error.toString()
          return thunkAPI.rejectWithValue(message)
      }
  } )

  //delete Campaign
  export const deleteCampaign = createAsyncThunk('campaign/delete', async(id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
        return await CampaignService.deleteCampaign(id, token)
    } catch (error) {
        const message = (error.message && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
  })
  
  


export const campaignSlice = createSlice({
    name: 'campaigns',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
    builder
        .addCase(createCampaign.pending, (state) => {
            state.isLoading = true
        })
        .addCase(createCampaign.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            state.campaigns.push(action.payload)
            console.log(action.payload);
          })
        .addCase(createCampaign.rejected, (state, action) => {
             state.isLoading = false
             state.isError = true
             state.isSuccess = false
             state.message = action.payload
             console.log(action.payload)
        })
        .addCase(getCmapaigns.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getCmapaigns.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            state.campaigns = action.payload
          })
        .addCase(getCmapaigns.rejected, (state, action) => {
             state.isLoading = false
             state.isError = true
             state.message = action.payload
        })
        .addCase(deleteCampaign.pending, (state) => {
            state.isLoading = true
        })
        .addCase(deleteCampaign.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.isError = false
            state.campaigns = state.campaigns.filter((campaign) => campaign._id !== action.payload.id)
          })
        .addCase(deleteCampaign.rejected, (state, action) => {
             state.isLoading = false
             state.isError = true
             state.message = action.payload
        })
        .addCase(updateCampaign.pending, (state) => {
          state.isLoading = true
      })
      .addCase(updateCampaign.fulfilled, (state, action) => {
          state.isLoading = false
          state.isSuccess = true
          state.isError = false
          const index = state.campaigns.findIndex((campaign) => campaign._id === action.payload.campaignId)
          console.log(index);
          state.campaigns[index] = action.payload.newCmapaign
        })
      .addCase(updateCampaign.rejected, (state, action) => {
           state.isLoading = false
           state.isError = true
           state.message = action.payload
      })
    } 
})

export const {reset} = campaignSlice.actions
export default campaignSlice.reducer