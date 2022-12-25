import axios from "axios";
const BASE_URL = "http://localhost:5000/api/campaign";
const user = JSON.parse(localStorage.getItem('user'))

if(user) {
  var TOKEN = JSON.parse(localStorage.getItem('user')).token.toString()
}
export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});

