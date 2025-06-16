import { ref } from 'vue'
import axios from 'axios'
import { Notyf } from 'notyf'

axios.defaults.baseURL = import.meta.env.VITE_API_URL

const notyf = new Notyf({
    duration: 3000,
    position: {
        x: 'center',
        y: 'top'
    }
})

export const usePayment = () => {

}