import React, { useEffect, useState } from "react";
import StageBoard from "../stagepage/Stageboard";
import styled from "styled-components";
import TopNavBackNoUser from "../../components/TopNavNoUser";
import { useGetMemberCustom } from "../../hook/customUtil";
import { CustomCharacter } from "../../components/CustomCharacter";
import { useParams } from "react-router-dom";

const Stage = () => {
  const { memberId } = useParams(); // URL에서 id 추출
  const [loadInitial, setLoadInitial] = useState(false);
  const [load, setLoad] = useState(true);
  const [selectedItem, setSelectedItem] = useState({});
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
      <TopNavBackNoUser></TopNavBackNoUser>
      <BoardContainer>
        <StageBoard></StageBoard>
      </BoardContainer>
      <CustomCharacter
        selectedItem={memberCharacter}
        loadInitial={memberCharacter}
      ></CustomCharacter>
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
`;
