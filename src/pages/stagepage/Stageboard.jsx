import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";

// 데이터: 각 아이템에 이미지와 작성자 정보 추가
const data = [
  {
    image: "/image/BackIcon.png",
    author: "Author 1",
  },
  {
    image: "/image/TopTitle.png",
    author: "Author 2",
  },
  {
    image: "/image/UserIcon.png",
    author: "Author 3",
  },
  {
    image: "/image/BackIcon.png",
    author: "Author 4",
  },
  {
    image: "/image/TopTitle.png",
    author: "Author 5",
  },
  {
    image: "/image/UserIcon.png",
    author: "Author 6",
  },
  {
    image: "/image/BackIcon.png",
    author: "Author 1",
  },
  {
    image: "/image/TopTitle.png",
    author: "Author 2",
  },
  {
    image: "/image/UserIcon.png",
    author: "Author 3",
  },
  {
    image: "/image/BackIcon.png",
    author: "Author 4",
  },
  {
    image: "/image/TopTitle.png",
    author: "Author 5",
  },
  {
    image: "/image/UserIcon.png",
    author: "Author 6",
  },
  {
    image: "/image/BackIcon.png",
    author: "Author 11",
  },
  {
    image: "/image/TopTitle.png",
    author: "Author 21",
  },
  {
    image: "/image/UserIcon.png",
    author: "Author 31",
  },
];

const Board = () => {
  const ITEMS_PER_PAGE = 3; // 한 페이지에 3개 아이템 표시

  const settings = {
    dots: true,
    infinite: true, // 무한 스크롤 활성화
    speed: 500,
    slidesToShow: 3, // 한 페이지에 1개 아이템 표시
    slidesToScroll: 3, // 한 번에 1개씩 넘기기
    arrows: true, // 좌우 화살표 표시
    rows: 2,
  };

  const navigate = useNavigate();

  const handleItemClick = (item) => {
    navigate("/letter", { state: item });
  };

  return (
    <BoardWrapper>
      <Conatiner>
        <ImgBackground>
          <div>
            <YellowCircle src="/image/PenCircle.png" alt="작성 버튼" />
          </div>
          {/* 슬라이드로 아이템을 표시 */}
          <SliderWrapper>
            <Slider {...settings}>
              {data.map((item, index) => (
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

const BoardWrapper = styled.div`
  position: relative;
  width: 100%;
  top: 120px;
  max-height: calc(
    100vh - 70px
  ); /* 화면 높이에서 TopNavBack과 패딩을 뺀 최대 높이 */
  display: flex;
  justify-content: flex-end;
  box-sizing: border-box;
`;

const Conatiner = styled.div`
  margin-right: 50px;
  padding: 1rem;
  width: 45%;
  background-color: #14532d;
  border-radius: 1rem;
  box-shadow: inset 0px 0px 20px 0px rgba(0, 0, 0, 0.5);

  @media screen and (max-width: 600px) {
    width: 60%;
    margin-right: 30px;
  }
`;

const ImgBackground = styled.div`
  position: relative;
  max-height: 300px;
  width: 100%;
  padding: 20px 10px;
  // background-image: url("image/Board.png");
  // background-position: center;
  // background-repeat: no-repeat;
  // background-size: 100% 100%;
  border-radius: 1rem;
  background-color: #d3d3d3; /* 회색 배경 */
  box-shadow: inset 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`;

const YellowCircle = styled.img`
  position: absolute;
  width: 1rem;
  top: 1rem;
  right: 1rem;
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
