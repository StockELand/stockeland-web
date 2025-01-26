"use client";

import Link from "next/link";
import Image from "next/image";
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

const Heading = styled.h1`
  font-size: 32px;
  font-weight: bold;
  color: white;
  width: fit-content;
  height: 80px;
  display: flex;
  align-items: center;
`;

const MainContainer = styled.div`
  margin: 0px 32px;
`;

const PreviewContainer = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 24px;
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  border: solid 1px #2b3139;
  padding: 24px;
  min-width: 240px;
  width: 400px;
  row-gap: 16px;

  height: fit-content;
`;

const CardTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: fit-content;
`;
const CardTitleText = styled.span`
  color: white;
  font-size: 14px;
  font-weight: bold;
`;
const PredictListContainer = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  row-gap: 12px;
`;

const PredictListItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 4px;
`;

const StockTitleConatiner = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 12px;
  align-items: center;
`;

const StockNameText = styled.span`
  color: white;
  font-size: 14px;
  font-weight: bold;
`;

const StockImageContainer = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 100%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const StockRateText = styled.span<{ $isGrowth?: boolean }>`
  color: ${({ $isGrowth }) => ($isGrowth ? "#a6fc35" : "#F6465D")};
  font-size: 16px;
  font-weight: bold;
`;

const ManualRunContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ButtonContainer = styled.div`
  background-color: #fcd535;
  color: #1e2329;
  border-radius: 10px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
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
      <MainContainer>
        <Heading>Dashboard</Heading>
        <PreviewContainer>
          <CardContainer>
            <CardTitleContainer>
              <CardTitleText>수동 실행</CardTitleText>
            </CardTitleContainer>
            <ManualRunContainer>
              <ButtonContainer>Data Parsing</ButtonContainer>
              <ButtonContainer>Model Learning</ButtonContainer>
            </ManualRunContainer>
          </CardContainer>
          <CardContainer>
            <CardTitleContainer>
              <CardTitleText>Top 5</CardTitleText>
            </CardTitleContainer>
            <PredictListContainer>
              <PredictListItemContainer>
                <StockTitleConatiner>
                  <StockImageContainer>
                    <Image
                      src="/tesla-logo.png"
                      alt={""}
                      width={24}
                      height={24}
                    />
                  </StockImageContainer>
                  <StockNameText>TSLA</StockNameText>
                </StockTitleConatiner>
                <StockRateText $isGrowth>23.19%</StockRateText>
              </PredictListItemContainer>
              <PredictListItemContainer>
                <StockTitleConatiner>
                  <StockImageContainer>
                    <Image
                      src="/tesla-logo.png"
                      alt={""}
                      width={24}
                      height={24}
                    />
                  </StockImageContainer>
                  <StockNameText>TSLA</StockNameText>
                </StockTitleConatiner>
                <StockRateText $isGrowth>23.19%</StockRateText>
              </PredictListItemContainer>
              <PredictListItemContainer>
                <StockTitleConatiner>
                  <StockImageContainer>
                    <Image
                      src="/tesla-logo.png"
                      alt={""}
                      width={24}
                      height={24}
                    />
                  </StockImageContainer>
                  <StockNameText>TSLA</StockNameText>
                </StockTitleConatiner>
                <StockRateText $isGrowth>23.19%</StockRateText>
              </PredictListItemContainer>
              <PredictListItemContainer>
                <StockTitleConatiner>
                  <StockImageContainer>
                    <Image
                      src="/tesla-logo.png"
                      alt={""}
                      width={24}
                      height={24}
                    />
                  </StockImageContainer>
                  <StockNameText>TSLA</StockNameText>
                </StockTitleConatiner>
                <StockRateText $isGrowth>23.19%</StockRateText>
              </PredictListItemContainer>
              <PredictListItemContainer>
                <StockTitleConatiner>
                  <StockImageContainer>
                    <Image
                      src="/tesla-logo.png"
                      alt={""}
                      width={24}
                      height={24}
                    />
                  </StockImageContainer>
                  <StockNameText>TSLA</StockNameText>
                </StockTitleConatiner>
                <StockRateText $isGrowth>23.19%</StockRateText>
              </PredictListItemContainer>
            </PredictListContainer>
          </CardContainer>
          <CardContainer>
            <CardTitleContainer>
              <CardTitleText>Bottom 5</CardTitleText>
            </CardTitleContainer>
            <PredictListContainer>
              <PredictListItemContainer>
                <StockTitleConatiner>
                  <StockImageContainer>
                    <Image
                      src="/tesla-logo.png"
                      alt={""}
                      width={24}
                      height={24}
                    />
                  </StockImageContainer>
                  <StockNameText>TSLA</StockNameText>
                </StockTitleConatiner>
                <StockRateText>23.19%</StockRateText>
              </PredictListItemContainer>
              <PredictListItemContainer>
                <StockTitleConatiner>
                  <StockImageContainer>
                    <Image
                      src="/tesla-logo.png"
                      alt={""}
                      width={24}
                      height={24}
                    />
                  </StockImageContainer>
                  <StockNameText>TSLA</StockNameText>
                </StockTitleConatiner>
                <StockRateText>23.19%</StockRateText>
              </PredictListItemContainer>
              <PredictListItemContainer>
                <StockTitleConatiner>
                  <StockImageContainer>
                    <Image
                      src="/tesla-logo.png"
                      alt={""}
                      width={24}
                      height={24}
                    />
                  </StockImageContainer>
                  <StockNameText>TSLA</StockNameText>
                </StockTitleConatiner>
                <StockRateText>23.19%</StockRateText>
              </PredictListItemContainer>
              <PredictListItemContainer>
                <StockTitleConatiner>
                  <StockImageContainer>
                    <Image
                      src="/tesla-logo.png"
                      alt={""}
                      width={24}
                      height={24}
                    />
                  </StockImageContainer>
                  <StockNameText>TSLA</StockNameText>
                </StockTitleConatiner>
                <StockRateText>23.19%</StockRateText>
              </PredictListItemContainer>
              <PredictListItemContainer>
                <StockTitleConatiner>
                  <StockImageContainer>
                    <Image
                      src="/tesla-logo.png"
                      alt={""}
                      width={24}
                      height={24}
                    />
                  </StockImageContainer>
                  <StockNameText>TSLA</StockNameText>
                </StockTitleConatiner>
                <StockRateText>23.19%</StockRateText>
              </PredictListItemContainer>
            </PredictListContainer>
          </CardContainer>
        </PreviewContainer>
      </MainContainer>
    </>
  );
}
