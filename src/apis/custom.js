import axios from "axios";

const baseURL = `https://server.templ.es/user`;

export const createCustomCharacter = async (selectedItem) => {
    const accessToken = localStorage.getItem('accessToken');
    try{
        const response = await axios.post(`${baseURL}/me/character`,
            selectedItem, {
                headers: {Authorization: `Bearer ${accessToken}`}
            }
        )
    }catch(e){
        console.log(e);
    }
}

export const updateCustomCharacter = async (selectedItem) => {
    const accessToken = localStorage.getItem('accessToken');
    try{
        const response = await axios.patch(`${baseURL}/me/character`,
            selectedItem, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        )
    }catch(e){
        console.log(e);
    }
}

export const checkPartyReadyAndgetCharacter = async() => {

    const accessToken = localStorage.getItem('accessToken');
    try{
        const response = await axios.get(`${baseURL}/me/character`,{
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return response.data;
    }catch(e){
        throw new Error('캐릭터를 찾을 수 없습니다.');
    }
}

export const getMemberCustom = async (id) => {
    try{
        const response = await axios.get(`${baseURL}/${id}/character`)
        return response.data;
    }catch(e){
        console.log(e);
    }
}