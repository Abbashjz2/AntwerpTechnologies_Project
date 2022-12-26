import axios from "axios";
const BASE_URL = "http://localhost:5000/api/campaign";
const user = JSON.parse(localStorage.getItem('user'))

export var TOKEN = JSON.parse(localStorage.getItem('user'))?.token?.toString()
if(user) {
  console.log(TOKEN);
}
export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});

