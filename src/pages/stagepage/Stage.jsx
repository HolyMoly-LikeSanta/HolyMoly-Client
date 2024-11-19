import React, { useEffect, useState } from "react";
import StageBoard from "../stagepage/Stageboard";
import styled from "styled-components";
import { useGetMemberCustom } from "../../hook/customUtil";
import { CustomCharacter } from "../../components/CustomCharacter";
import { useParams } from "react-router-dom";
import { Nav } from "../../components/Nav";

const Stage = () => {
  const { memberId } = useParams(); // URL에서 id 추출
  const [load, setLoad] = useState(true);
  const { memberCharacter, fetchAndSetMemberCustom } =
    useGetMemberCustom(memberId);

  useEffect(() => {
    const getCustom = async () => {
      await fetchAndSetMemberCustom();
      setLoad(false);
    };
    if (memberId) {
      getCustom();
    }
  }, [memberId]);

  if (load) {
    return <div>로딩중임니다..^^</div>;
  }

  return (
    <Container imageUrl={memberCharacter?.bg.imageUrl}>
      <Nav isBack={false} isNoUser={true}/>
      <BoardContainer>
        <StageBoard></StageBoard>
      </BoardContainer>
      <CustomCharacterContainer>
        <ShadowImage src="/image/characterShadow.png" alt="Shadow" />
        <CustomCharacter
          selectedItem={memberCharacter}
          loadInitial={memberCharacter}
        />
      </CustomCharacterContainer>
    </Container>
  );
};

export default Stage;

const Container = styled.div`
  background-color: white;
  height: 100%;
  background-image: ${({ imageUrl }) =>
    imageUrl ? `url(${imageUrl})` : "none"};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BoardContainer = styled.div`
  margin-bottom: 10vh;
  width: 100%;

  @media screen and (max-width: 600px) {
    margin-bottom: 20vh;
  }
`
const CustomCharacterContainer = styled.div`
  position: relative; /* CustomCharacter와 ShadowImage를 겹치도록 */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ShadowImage = styled.img`
  position: absolute;
  width: 200px;
  height: 82px;
  bottom: 38px; /* 원하는 위치 조정 */
  z-index: 1; /* CustomCharacter보다 뒤에 배치 */
`;