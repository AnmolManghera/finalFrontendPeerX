import axios from "axios";
import { QueryClient } from "react-query";
const url = import.meta.env.VITE_BACKEND_URL;

const apiClient = axios.create({
    baseURL:`${url}`
})

const queryClient = new QueryClient();

export {apiClient,queryClient}