import axios from "axios";
const baseUrl =
  "https://handsomely-territory-production.up.railway.app/api/users";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((res) => res.data);
};

const registerUser = (user) => {
  console.log(user);
  const request = axios.post(baseUrl, user);
  return request.then((res) => res.data);
};

export default { getAll, registerUser }; // eslint-disable-line
