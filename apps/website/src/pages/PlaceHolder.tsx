import styled from "styled-components";

export default function PlaceHolder() {
  return (
    <PlaceHolderContainer>

    </PlaceHolderContainer>
  );
};

const PlaceHolderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 2rem;
  color: --Farmsystem_LightGrey;
`;