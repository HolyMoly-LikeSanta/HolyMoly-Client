import axios from "axios";

const baseURL = `https://server.templ.es`;

export const getUserData = async () => {
  const accessToken = localStorage.getItem('accessToken');
  try {
    const response = await axios.get(`${baseURL}/user/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    localStorage.setItem("memberId", response.data.memberId);

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const createBoard = async (accessToken) => {
  try {
    const response = await axios.post(`${baseURL}/board/create`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });


    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// 편지 내용 가져오기(사용자 화면)
export const getBoardLetter = async (accessToken) => {
  const memberId = localStorage.getItem("memberId");

  try {
    const response = await axios.get(`${baseURL}/board/${memberId}/letters`);


    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

// 편지 내용 가져오기(초대받은사람)
export const getBoardLetterInvite = async (accessToken, memberId) => {
  try {
    const response = await axios.get(`${baseURL}/board/${memberId}/letters`);


    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

/// 편지 작성하기
export const postBoardLetter = async (nickname, letter) => {
  const invitermemberId = localStorage.getItem("inviterMemberId");

  try {
    const response = await axios.post(
      `${baseURL}/board/${invitermemberId}/letter`,
      {
        content: letter,
        authorNickname: nickname,
      }
    );

    console.log(response);

    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
