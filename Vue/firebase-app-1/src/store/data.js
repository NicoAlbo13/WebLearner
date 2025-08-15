import { ref } from "vue";
import { defineStore } from "pinia";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore/lite";
import { nanoid } from "nanoid";
import { FirebaseDB } from "@/firebase/config";
import { useUserStore } from "./user";


export const useDataStore = defineStore('data', ()=>{
    //state
    const documents = ref([])
    const isLoading = ref(false)
    const useUser = useUserStore()

    function $reset() {
        documents.value = [];
        isLoading.value = false;
    }

    //actions
    const getUrls = async () => {
        if(documents.value.length !== 0){
            return;
        }

        isLoading.value = true;
        try {
            const q = query(collection(FirebaseDB, 'urls'), where('user', '==', useUser.userData.uid))
            const docs = await getDocs(q)
            docs.forEach(doc=>{
                documents.value.push({id: doc.id, ...doc.data()})
            })
            // console.log(documents.value);
        } catch (error) {
            console.log(error);
            documents.value = []
        } finally {
            isLoading.value = false;
        }
    }

    const getDocument = async (id) => {
        isLoading.value = true;
        try {
            const docRef = doc(FirebaseDB, 'urls', id);
            const docSnap = await getDoc(docRef)

            if(!docSnap.exists()){
                throw new Error('Doc not found!')
            }

            if(docSnap.data().user === useUser.userData.uid){
                return {
                    url: docSnap.data().name,
                }
            }else {
                throw new Error('Not allowed to do that action!')
            }

        } catch (error) {
            console.log(error);
            return {
                error: error.message,
            }
        } finally {
            isLoading.value = false
        }
    }

    const addUrl = async (name) => {
        try {
            const objectDoc = {
                name,
                short: nanoid(5),
                user: useUser.userData.uid,
            }
            const docRef = await addDoc(collection(FirebaseDB, "urls"), objectDoc);
            documents.value.push({id: docRef.id, ...objectDoc})
        } catch (error) {
            console.log(error);
        }
    }

    const updateUrl = async (id, name) => {
        isLoading.value = true;
        try {
            const docRef = doc(FirebaseDB, "urls", id);
            const docSnap = await getDoc(docRef);

            if (!docSnap.exists()) {
                throw new Error('Doc not found!')
            }

            if (docSnap.data().user === useUser.userData.uid) {
                await updateDoc(docRef, {name})
                documents.value = documents.value.map(item => item.id === id ? ({...item, name}): item)
            }else {
                throw new Error('Not allowed to do that action!')
            }
        } catch (error) {
            console.log(error);
        }finally {
            isLoading.value = false;
        }
    }

    const deleteUrl = async (id) => {
        try {
            const docRef = doc(FirebaseDB, 'urls', id)

            const docSnap = await getDoc(docRef)

            if(!docSnap.exists()){
                throw new Error('Doc not found!')
            }

            if(docSnap.data().user === useUser.userData.uid){
                await deleteDoc(docRef)
                documents.value = documents.value.filter(doc => doc.id != id)

            }else {
                throw new Error('Not allowed to do that action!')
            }
        } catch (error) {
            console.log(error);
        }
    }

    return {
        $reset,
        documents,
        isLoading,
        getUrls,
        getDocument,
        addUrl,
        updateUrl,
        deleteUrl,
    }
})

