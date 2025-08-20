import { ref } from "vue";
import { defineStore } from "pinia";

import linkApi from "@/api/linkApi";
import { useUserStore } from "./user";

export const useLinkStore = defineStore('link', () => {

    const userStore = useUserStore()
    const links = ref([])

    const createLink = async (url) => {
        try {
            const { data } = await linkApi({
                url: '/links',
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + userStore.token,
                },
                data: {
                    fullLink: url,
                }
            })
            // console.log(data);
            links.value.push(data.link)
            return data;
        } catch (error) {
            // console.log(error);
            if(error.response?.data){
                throw (error.response.data)
            }
        }
    }

    const getLinks = async () => {
        console.log('hello links');
        try {
            const { data } = await linkApi({
                url: '/links',
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + userStore.token,
                }
            })
            // console.log(data);
            links.value = [...data.links];
        } catch (error) {
            console.log(error);
        }
    }

    const editLink = async (id, newLink) => {
        try {
            const { data } = await linkApi({
                url: `/links/${id}`,
                method: 'PATCH',
                headers: {
                    'Authorization': 'Bearer ' + userStore.token,
                },
                data: {
                    fullLink: newLink,
                }
            })
            // console.log(data);
            links.value = links.value.map(item=>item._id===data.link._id?data.link:item)
            return data;
        } catch (error) {
            console.log(error);
            if(error.response?.data){
                throw (error.response.data)
            }
        }
    }

    const deleteLink = async (id) => {
        try {
            const { data } = await linkApi({
                url: `/links/${id}`,
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + userStore.token,
                }
            })
            links.value = links.value.filter(item=>item._id != data.link._id)
        } catch (error) {
            console.log(error);
        }
    }

    getLinks();

    return {
        links,
        createLink,
        getLinks,
        editLink,
        deleteLink,
    }
})
