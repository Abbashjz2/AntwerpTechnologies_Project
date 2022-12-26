  import axios from "axios";

const API_URL = 'http://localhost:5000/api/campaign/'

// create new goal
const createCampaign = async (campaignData, token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      }, 
    }
    const response = await axios.post(API_URL, campaignData, config)
    return response.data
  }
  const updateCampaign = async (campaignData, token) => {
    const id = campaignData.id
    const data = campaignData.newItem
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        }, 
      }
      const response = await axios.put(API_URL + id, data, config)
      return response.data
    }

  // get Campaigns
const getCmapaigns = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}
//Delete Campaign
const deleteCampaign = async (campaignId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + campaignId, config)

  return response.data
}

const CampaignService = {
    createCampaign,
    getCmapaigns,
    deleteCampaign,
    updateCampaign
}

export default CampaignService