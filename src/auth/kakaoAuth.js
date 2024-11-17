import axios from "axios";

const baseURL = `https://server.templ.es`;

export const kakaoLogin = async () => {
    try{
        const code = new URL(document.location.toString()).searchParams.get('code');
        const response = await axios.post(`${baseURL}/user/login`, 
            {'code': code}
        );
        const accessToken = response.data.accessToken;
        localStorage.removeItem('accessToken');
        localStorage.setItem('accessToken', accessToken);
    }catch(e){
        console.log(e);
    }
}
