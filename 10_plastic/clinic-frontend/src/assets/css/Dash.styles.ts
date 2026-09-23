"use client";
import styled from 'styled-components';

export const DashContainer = styled.div`
  width: 100%;
`;

export const DashHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

export const DashTitle = styled.h1`
  font-size: 1.5rem;
  color: #5a5c69;
  font-weight: 700;
  margin: 0;
`;

// --- 상단 4개 요약 카드 ---
export const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin-bottom: 1.5rem;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const SummaryCard = styled.div<{ $color: string }>`
  background-color: #fff;
  border-radius: 0.35rem;
  box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15);
  border-left: 0.25rem solid ${(props) => props.$color};
  padding: 1.5rem;
`;

export const SummaryCardBody = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SummaryTitle = styled.div<{ $color: string }>`
  font-size: 0.75rem;
  font-weight: 700;
  color: ${(props) => props.$color};
  text-transform: uppercase;
  margin-bottom: 0.25rem;
`;

export const SummaryValue = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
  color: #5a5c69;
`;

export const SummaryIcon = styled.div`
  color: #dddfeb;
`;

// --- 중간 그래프 영역 ---
export const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

export const ChartCard = styled.div`
  background-color: #fff;
  border-radius: 0.35rem;
  box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15);
  border: 1px solid #e3e6f0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const ChartHeader = styled.div`
  background-color: #f8f9fc;
  border-bottom: 1px solid #e3e6f0;
  padding: 1rem 1.25rem;
`;

export const ChartTitle = styled.h6`
  margin: 0;
  font-weight: 700;
  color: #4e73df;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const ChartBody = styled.div`
  padding: 1.5rem;
  flex: 1;
`;

// CSS 막대 차트
export const BarChartContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  height: 250px;
  padding-top: 1rem;
  border-bottom: 1px solid #eaecf4;
  border-left: 1px solid #eaecf4;
`;

export const BarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  width: 10%;
`;

export const BarValue = styled.div`
  font-size: 0.75rem;
  color: #858796;
  margin-bottom: 0.5rem;
`;

export const Bar = styled.div<{ $height: string }>`
  width: 100%;
  height: ${(props) => props.$height};
  background-color: #4e73df;
  border-radius: 0.2rem 0.2rem 0 0;
  transition: height 0.5s ease;

  &:hover {
    background-color: #2e59d9;
  }
`;

export const BarLabel = styled.div`
  font-size: 0.8rem;
  color: #858796;
  margin-top: 0.5rem;
`;

// CSS 도넛 차트
export const DonutChart = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: conic-gradient(
    #4e73df 0% 45%,
    #1cc88a 45% 75%,
    #36b9cc 75% 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1.5rem;

  .inner-circle {
    width: 110px;
    height: 110px;
    background-color: #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    color: #5a5c69;
  }
`;

export const LegendContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.85rem;
  color: #858796;

  .dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-right: 0.5rem;
  }
`;

// --- 하단 시스템 현황 (나머지 메뉴 모음) ---
export const SystemGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

export const SystemCard = styled(ChartCard)``;

export const StatusList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const StatusItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0.8rem;
  border-bottom: 1px dashed #eaecf4;

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  .label {
    font-size: 0.9rem;
    color: #5a5c69;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

export const Badge = styled.span<{ $active: boolean }>`
  padding: 0.3rem 0.6rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 700;
  background-color: ${(props) => (props.$active ? '#1cc88a' : '#e74a3b')};
  color: white;
`;