import axios from "axios";

const baseURL = `https://server.templ.es/item`;

export const fetchCustomItems = async() => {
    try{
        const accessToken = localStorage.getItem('accessToken');
        const [bgItems, headItems, faceItems, clothesItems, accessoryItems] = await Promise.all([
            axios.get(`${baseURL}/bg`,{
                headers : {
                'Authorization': `Bearer ${accessToken}`,
                }})
            ,
            axios.get(`${baseURL}/head`,{
                headers:{
                    'Authorization': `Bearer ${accessToken}`
                }}),
            axios.get(`${baseURL}/face`,{
                headers:{
                    'Authorization': `Bearer ${accessToken}`
                }}),
            axios.get(`${baseURL}/clothes`,{
                headers:{
                    'Authorization': `Bearer ${accessToken}`
                }}),
            axios.get(`${baseURL}/accessory`,{
                headers:{
                    'Authorization': `Bearer ${accessToken}`
                }})   
        ]);
        const customItems = {
            bgItems: [...bgItems.data],
            headItems: [...headItems.data],
            faceItems: [...faceItems.data],
            clothesItems: [...clothesItems.data],
            accessoryItems: [...accessoryItems.data],
        }
        return customItems;
    }catch(e){
        console.log(e);
    }
}