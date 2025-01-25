"use client";

import Link from "next/link";
import styled from "styled-components";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 64px;
  padding: 0px 24px;
`;

const LogoContainer = styled.div`
  display: flex;
  width: fit-content;
  height: 100%;
  padding: 0px 12px;
  align-items: center;
`;
const LogoText = styled.span`
  color: #a6fc35;
  font-size: 16px;
  font-weight: bold;
`;

const NavContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: fit-content;
  height: 100%;
  padding: 0px 24px;
`;
const NavItemContainer = styled.div`
  display: flex;
  width: fit-content;
  height: 100%;
  padding: 0px 12px;
  align-items: center;
`;
const NavText = styled.span`
  color: white;
  font-size: 14px;
  font-weight: bold;
`;

export default function Home() {
  return (
    <>
      <HeaderContainer>
        <LogoContainer>
          <Link href={"/"}>
            <LogoText>StockELand</LogoText>
          </Link>
        </LogoContainer>
        <NavContainer>
          <NavItemContainer>
            <NavText>Dashboard</NavText>
          </NavItemContainer>
          <NavItemContainer>
            <NavText>설정</NavText>
          </NavItemContainer>
        </NavContainer>
      </HeaderContainer>
    </>
  );
}
