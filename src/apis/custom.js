import axios from "axios";

const baseURL = `http://server.templ.es/item`;

export const fetchCustomItems = async() => {
    try{
        const [bgItems, headItems, faceItems, clothesItems, accessoryItems] = await Promise.all([
            axios.get(`${baseURL}/bg`),
            axios.get(`${baseURL}/head`),
            axios.get(`${baseURL}/face`),
            axios.get(`${baseURL}/clothes`),
            axios.get(`${baseURL}/accessory`)   
        ]);
        const customItems = {
            bgItems: [...bgItems],
            headItems: [...headItems],
            faceItems: [...faceItems],
            clothesItems: [...clothesItems],
            accessoryItems: [...accessoryItems],
        }
        console.log(customItems);
        return customItems;
    }catch(e){
        console.log(e);
    }
}