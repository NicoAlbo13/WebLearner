import { computed, ref } from "vue";
import { defineStore } from "pinia";
import { authStateAsync, loginUser, logoutUser, registerUser } from "@/firebase/provider";
import { useDataStore } from "./data";

export const useUserStore = defineStore('user', ()=>{
    const useData = useDataStore()
    //state
    const status = ref('not-authenticated') //'checking', 'not-authenticated', 'authenticated'
    const userData = ref(null)

    //actions
    const register = async (email, password, displayName) => {
        status.value = 'checking';
        const res = await registerUser(email, password, displayName)
        // console.log(res);

        if (res.ok){
            status.value = 'authenticated';
            userData.value = res;
        }else{
            status.value = 'not-authenticated';
            userData.value = res;
        }
    }

    const login = async (email, password) => {
        status.value = 'checking';
        const res = await loginUser(email, password);
        // console.log(res);

        if(res.ok){
            status.value = 'authenticated';
            userData.value = res;
        }else{
            status.value = 'not-authenticated';
            userData.value = res;
        }
    }

    const logout = async () => {
        await logoutUser();
        useData.$reset();
        status.value = 'not-authenticated';
        userData.value = null;
    }

    const currentUser = async() => {
        status.value = 'checking';
        const res = await authStateAsync()
        // console.log(res);

        if(res.ok){
            status.value = 'authenticated';
            userData.value = res;
        }else{
            status.value = 'not-authenticated';
            userData.value = res;
            useData.$reset();
        }
    }

    //getters
    const isAuthenticated = computed(()=>status.value === 'authenticated')
    const isLoading = computed(()=>status.value === 'checking')

    return {
        userData,
        status,
        register,
        login,
        logout,
        currentUser,
        isAuthenticated,
        isLoading,
    }
})
