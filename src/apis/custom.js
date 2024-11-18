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
    console.log(accessToken);
    try{
        const response = await axios.get(`${baseURL}/character`,{
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        return response.data;
    }catch(e){
        // 생성된 캐릭터가 없는 경우 에러
        console.log(e);
    }
}

