import axios from "axios";

const baseURL = `https://server.templ.es/user/me`;

export const createCustomCharacter = async (selectedItem) => {
    const accessToken = localStorage.getItem('accessToken');
    try{
        const response = await axios.post(`${baseURL}/character`,
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
        const response = await axios.patch(`${baseURL}/character`,
            selectedItem, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        )
        return response.data;
    }catch(e){
        console.log(e);
    }
}

export const checkPartyReadyAndgetCharacter = async() => {

    const accessToken = localStorage.getItem('accessToken');
    try{
        const response = await axios.get(`${baseURL}/character`,{
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return response.data;
    }catch(e){
        throw new Error('캐릭터를 찾을 수 없습니다.');
    }
}

