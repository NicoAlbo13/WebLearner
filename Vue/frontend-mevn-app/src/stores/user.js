import { ref } from "vue";
import { defineStore } from "pinia";

import linkApi from "@/api/linkApi";

export const useUserStore = defineStore('user', () => {
    const token = ref(null);
    const expiresIn = ref(null);

    const login = async (info={}) => {
        try {
            const { data } = await linkApi.post('/auth/login', {...info})
            token.value = data.token;
            expiresIn.value = data.expiresIn;
            setTime();
        } catch (error) {
            console.log(error);
            if(error.response){
                throw (error.response.data)
            }
        }
    }

    const register = async(info={}) => {
        try {
            const { data } = await linkApi.post('/auth/register', {...info})
            token.value = data.token;
            expiresIn.value = data.expiresIn;
            setTime();
        } catch (error) {
            console.log(error);
            if(error.response){
                throw (error.response.data)
            }
        }
    }

    const logout = async () => {
        try {
            await linkApi.get('/auth/logout');
            $reset();
        } catch (error) {
            console.log(error);
        }
    }

    const getRefreshToken = async () => {
        try {
            const { data } = await linkApi.get('/auth/refresh');
            token.value = data.token;
            expiresIn.value = data.expiresIn;
            setTime();
        } catch (error) {
            console.log(error);
        }
    }

    const setTime = () => {
        setTimeout(() => {
            getRefreshToken();
        }, (expiresIn.value * 1000)-600);
    }

    const $reset = () => {
        token.value = null;
        expiresIn.value = null;
    }

    return {
        token,
        expiresIn,
        login,
        register,
        logout,
        getRefreshToken,
        $reset,
    }
})
