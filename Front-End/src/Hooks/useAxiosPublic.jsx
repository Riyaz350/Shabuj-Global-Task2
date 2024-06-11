import axios from "axios";

const axiosPublic = axios.create({
    baseURL:'https://sge-task2-back-end.vercel.app'
})
const useAxiosPublic = () => {
    return axiosPublic
};

export default useAxiosPublic;