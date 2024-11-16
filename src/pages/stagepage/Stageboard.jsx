import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

// 반복될 이미지
const images = [
  "/image/letterImg/Letter1.png",
  "/image/letterImg/Letter5.png",
  "/image/letterImg/Letter2.png",
  "/image/letterImg/Letter4.png",
  "/image/letterImg/Letter3.png",
  "/image/letterImg/Letter6.png",
];

const backendData = [
  {
    author: "Author 1",
    content:
      "죽는 날까지 하늘을 우러러한 점 부끄럼이 없기를,잎새에 이는 바람에도나는 괴로워했다.별을 노래하는 마음으로모든 죽어 가는 것을 사랑해야지그리고 나한테 주어진 길을걸어가야겠다.오늘 밤에도 별이 바람에 스치운다.죽는 날까지 하늘을 우러러한 점 부끄럼이 없기를,잎새에 이는 바람에도나는 괴로워했다.별을 노래하는 마음으로모든 죽어 가는 것을 사랑해야지그리고 나한테 주어진 길을걸어가야겠다.오늘 밤에도 별이 바람에 스치운다.죽는 날까지 하늘을 우러러한 점 부끄럼이 없기를,잎새에 이는 바람에도나는 괴로워했다.별을 노래하는 마음으로모든 죽어 가는 것을 사랑해야지그리고 나한테 주어진 길을걸어가야겠다.오늘 밤에도 별이 바람에 스치운다.",
  },
  { author: "Author 2", content: "Content2" },
  { author: "Author 3", content: "Content3" },
  { author: "Author 4", content: "Content4" },
  { author: "Author 5", content: "Content5" },
  { author: "Author 6", content: "Content6" },
  { author: "Author 7", content: "Content7" },
  { author: "Author 8", content: "Content8" },
  { author: "Author 9", content: "Content9" },
  // ... 더 많은 데이터
];

const Board = () => {
  const { nickname } = useParams(); // Grabbing the nickname from the URL
  const [data, setData] = useState(null);

  // useEffect(() => {
  //   // Fetch data from the backend using the nickname
  //   const fetchData = async () => {
  //     try {
  //       // Adjust the URL below to match your backend's structure
  //       const response = await axios.get(`/api/data/${nickname}`); // Replace with your backend URL
  //       setData(response.data); // Set the fetched data
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData(); // Fetch data on component mount
  // }, [nickname]); // Run the effect whenever the nickname changes

  // // Check if data is still loading or has been fetched
  // if (!data) {
  //   return <div>Loading...</div>;
  // }

  const ITEMS_PER_PAGE = 3; // 한 페이지에 3개 아이템 표시

  const settings = {
    dots: true,
    infinite: true, // 무한 스크롤 활성화
    speed: 500,
    slidesToShow: 3, // 한 페이지에 1개 아이템 표시
    slidesToScroll: 3, // 한 번에 1개씩 넘기기
    arrows: true, // 좌우 화살표 표시
    rows: 2,
    prevArrow: <CustomPrevArrow />, // 커스텀 이전 화살표
    nextArrow: <CustomNextArrow />, // 커스텀 다음 화살표
  };

  const navigate = useNavigate();

  //나중에 받아온 데이터를 열거해서 추가적인 image속성을 더해준다.
  const dataWithImages = backendData.map((item, index) => ({
    ...item,
    image: images[index % images.length], // 6개의 이미지를 반복해서 할당
  }));

  const handleItemClick = (item) => {
    navigate("/letter", { state: item });
  };

  return (
    <BoardWrapper>
      <SantaUp src="/image/BoardSanta1.png" alt="" />
      <SantaDown src="/image/BoardSanta2.png" alt="" />
      <Conatiner>
        <ImgBackground>
          <WriteBtn
            src="/image/WriteBtn.png"
            alt=""
            onClick={() => {
              navigate("/letterwrite");
            }}
          />
          {/* 슬라이드로 아이템을 표시 */}
          <SliderWrapper>
            <Slider {...settings}>
              {dataWithImages.map((item, index) => (
                <ItemRow>
                  <BoardItem onClick={() => handleItemClick(item)}>
                    <ItemImage src={item.image} alt={`Item ${index + 1}`} />
                    <ItemText>{item.author}</ItemText>
                  </BoardItem>
                </ItemRow>
              ))}
            </Slider>
          </SliderWrapper>
        </ImgBackground>
      </Conatiner>
    </BoardWrapper>
  );
};

export default Board;

// 커스텀 이전 화살표
const CustomPrevArrow = ({ onClick }) => {
  return (
    <ArrowButton onClick={onClick} direction="left">
      <ArrowImage src="/image/PrevArrow.png" alt="Previous" />
    </ArrowButton>
  );
};

// 커스텀 다음 화살표
const CustomNextArrow = ({ onClick }) => {
  return (
    <ArrowButton onClick={onClick} direction="right">
      <ArrowImage src="/image/NextArrow.png" alt="Next" />
    </ArrowButton>
  );
};

// 공통 스타일
const ArrowButton = styled.div`
  position: absolute;
  top: 50%;
  ${({ direction }) => (direction === "left" ? "left: -30px" : "right: -30px")};
  background-color: transparent;
  border: none;
  cursor: pointer;
  transform: translateY(-50%);
  z-index: 10;
`;

const ArrowImage = styled.img`
  width: 1.5rem;
`;

const BoardWrapper = styled.div`
  position: relative;
  width: 100%;
  top: 100px;
  max-height: calc(
    100vh - 70px
  ); /* 화면 높이에서 TopNavBack과 패딩을 뺀 최대 높이 */
  display: flex;
  justify-content: center;
  box-sizing: border-box;

  @media screen and (max-width: 600px) {
    top: 120px;
  }
`;

const Conatiner = styled.div`
  position: relative;
  padding: 12px;
  width: 70%;
  background: linear-gradient(180deg, #fe7686 -19.58%, #14532d 100%);
  border-radius: 1.5rem;

  @media screen and (max-width: 600px) {
  }
`;

const SantaUp = styled.img`
  position: absolute;
  top: -55px;
  left: 15%;
  z-index: 10;
  width: 120px;
`;

const SantaDown = styled.img`
  position: absolute;
  z-index: 0;
  width: 12%;
  bottom: -15%;
  right: 18%;
`;

const ImgBackground = styled.div`
  position: relative;
  max-height: 300px;
  width: 100%;
  padding: 20px 10px;
  border-radius: 1rem;
  background-color: white;
  box-shadow: inset 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`;

const WriteBtn = styled.img`
  position: absolute;
  width: 1rem;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
`;

const SliderWrapper = styled.div`
  width: 80%; /* 슬라이더의 넓이를 80%로 설정 */
  margin: 0 auto; /* 중앙 정렬 */
`;

const ItemRow = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap; /* 아이템들이 한 줄에 2개씩 나열되도록 설정 */
`;
const BoardItem = styled.div`
  position: relative; /* 자식 요소의 절대 위치를 기준으로 설정 */
  background-color: rgba(255, 255, 255, 0.8); /* 반투명 배경 */
  border-radius: 10px;
  padding: 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 5px; /* 아이템 간 간격 */
  box-sizing: border-box;

  &::after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }
  @media screen and (max-width: 600px) {
    padding: 5px;
  }
`;

const ItemImage = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  object-fit: cover; /* 이미지가 잘리지 않도록 비율을 유지 */
`;

const ItemText = styled.div`
  position: absolute; /* 이미지 위에 위치하도록 설정 */
  top: 50%; /* 수직 중앙 정렬 */
  left: 50%; /* 수평 중앙 정렬 */
  transform: translate(-50%, -50%); /* 정확한 중앙 위치로 조정 */
  font-size: 10px;
  font-weight: bold;
  color: #000; /* 텍스트 색상 */
  z-index: 10; /* 이미지 위로 텍스트 표시 */
  text-shadow: 0px 0px 10px black;
`;
