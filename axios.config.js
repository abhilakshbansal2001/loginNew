import axios from "axios";

export default axios.create({
    baseURL: process.env.SERVER_URL,
    // headers: {'Content-Type': 'application/json'},
    // timeout:2000,
});