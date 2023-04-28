import axios from "axios"
import { useEffect } from "react"


export const useAPI = async (type = 'POST', url, inputData = {}, toast = false) => {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(false);
    try {

        const response = await axios.post(`${import.meta.env.VITE_API}/url`, inputData, { withCredentials: true });




    }
    catch (err) {

    }
}