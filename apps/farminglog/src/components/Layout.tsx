import { Outlet } from "react-router";
import styled from "styled-components";
import useMediaQueries from "@/hooks/useMediaQueries";
import Header from "./HeaderVar/Header";

export default function Layout() {
  const { isMobile } = useMediaQueries();
  const headerHeight = isMobile ? 55 : 70;

  return (
    <LayoutWrapper>
      <HeaderWrapper>
        <Header/>
      </HeaderWrapper>
      <Main $paddingTop={headerHeight}>
        <Outlet />
      </Main>
    </LayoutWrapper>
  );
}

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const HeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
`;

const Main = styled.main<{ $paddingTop: number }>`
  padding-top: ${({ $paddingTop }) => `${$paddingTop}px`};
  flex: 1;
`;