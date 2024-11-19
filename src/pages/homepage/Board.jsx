import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate, useParams } from "react-router-dom";
import { getBoardLetter, getBoardLetterInvite } from "../../apis/api";

// 반복될 이미지
const images = [
  "/image/letterImg/Letter1.png",
  "/image/letterImg/Letter5.png",
  "/image/letterImg/Letter2.png",
  "/image/letterImg/Letter4.png",
  "/image/letterImg/Letter3.png",
  "/image/letterImg/Letter6.png",
];

const Board = () => {
  const { memberId } = useParams();
  const [letterdata, setLetterData] = useState(null);
  const navigate = useNavigate();
  const [isSlideEnabled, setIsSlideEnabled] = useState(false); // 슬라이드 활성화 여부

  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    console.log(memberId);

    const fetchData = async () => {
      try {
        const data = await getBoardLetter(accessToken);
        console.log(data); // 데이터를 출력

        setLetterData(data); // state에 저장

        // 데이터 개수가 7개 이상일 때만 슬라이드 활성화
        if (data.length > 6) {
          setIsSlideEnabled(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [memberId, accessToken]);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    slidesPerRow: 3, // 각 행에 3개의 아이템씩 보여주기
    arrows: isSlideEnabled,
    rows: 2,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  // 데이터와 이미지를 결합
  const dataWithImages = letterdata?.map((item, index) => ({
    ...item,
    image: images[index % images.length],
  }));

  const handleItemClick = (item) => {
    navigate("/letter", { state: item });
  };
  return (
    <BoardWrapper>
      <SantaUp src="/image/BoardSanta1.png" alt="산타머리" />
      <SantaDown src="/image/BoardSanta2.png" alt="산타다리" />
      <Container>
        <ImgBackground>
          <SliderWrapper>
            <Slider {...settings}>
              {dataWithImages?.map((item, index) => (
                <ItemRow key={index}>
                  <BoardItem onClick={() => handleItemClick(item)}>
                    <ItemImage src={item.image} alt={`Item ${index + 1}`} />
                    <ItemText>{item.authorNickname}</ItemText>
                  </BoardItem>
                </ItemRow>
              ))}
            </Slider>
          </SliderWrapper>
        </ImgBackground>
      </Container>
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

const Container = styled.div`
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
  top: -50px;
  left: 15%;
  z-index: 10;
  width: 80px;
`;

const SantaDown = styled.img`
  position: absolute;
  z-index: 0;
  width: 70px;
  bottom: -40px;
  right: 15%;
`;

const ImgBackground = styled.div`
  position: relative;
  min-height: 180px;
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
  width: 80%;
  margin: 0 auto; /* 중앙 정렬 */
`;

const ItemRow = styled.div`
  display: flex;
  justify-content: center;
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
  font-size: 8px;
  font-weight: bold;
  color: #000; /* 텍스트 색상 */
  z-index: 10; /* 이미지 위로 텍스트 표시 */
  text-shadow: 0px 0px 10px black;
`;
