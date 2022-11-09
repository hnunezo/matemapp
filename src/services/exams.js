import axios from "axios";
const baseUrl = "https://node-math-production.up.railway.app/api/exams";

const getExams = (id) => {
  const request = axios.get(`${baseUrl}/user/${id}`);
  return request.then((res) => res.data);
};

const postExam = (exam, token) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const request = axios.post(baseUrl, exam, config);
  return request.then((res) => res.data);
};

const answerExam = (id, exam, token) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const request = axios.put(`${baseUrl}/${id}`, exam, config);
  return request.then((res) => res.data);
};

export default { getExams, postExam, answerExam }; // eslint-disable-line
