import axios from 'axios'

const API_URL = 'http://localhost:5000/api/user/'

const getUsers = async (token) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  
    const response = await axios.get(API_URL + 'getall', config)
  
    return response.data
  }

// Register User 
const register = async (userData) => {
    const response = await axios.post(API_URL, userData)

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

//Login user
const login = async (userData) => {
    const response = await axios.post(API_URL + 'login', userData)

    if(response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

const updateUser = async (userData, token) => {
    const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    const id = userData.id
    const data = userData.data
    console.log(data.get('file'))
      const response = await axios.put(API_URL + id, data, config)
      console.log(response);
      localStorage.removeItem('user')
      localStorage.setItem('user', JSON.stringify(response.data))
    return response.data


}

const logout =  () => {
    localStorage.removeItem('user')
}

const authService = {
    register,
    getUsers,
    logout,
    login,
    updateUser
}

export default authService