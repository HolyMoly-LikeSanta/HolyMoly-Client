import axios from "axios";

baseURL = `http://server.templ.es/`
 
export const kakaoLogin = async () => {
    try{
        const code = new URL(document.location.toString()).searchParams.get('code');
        const response = await axios.post(`${baseURL}user/login`, {
            body: JSON.stringify({code: code}),
        });
        console.log(response);

    }catch(e){
        console.log(e);
    }
}
