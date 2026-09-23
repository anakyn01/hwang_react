"use client";
import React from "react";
import { Layout } from "../Layout";
// 💡 직통 임포트(Direct Import)를 사용하여 스타일 깨짐 방지
import * as S from "@/assets/css/Style.style";
import { 
    FiMessageSquare, FiUsers, FiStar, FiClipboard, 
    FiTrendingUp, FiPieChart, FiLayout, FiLayers, 
    FiImage, FiVideo, FiShield, FiSettings 
} from "react-icons/fi";

export default function Dash() {
    // 임시 차트 데이터
    const monthlyData = [
        { month: "1월", value: 40 }, { month: "2월", value: 65 },
        { month: "3월", value: 45 }, { month: "4월", value: 80 },
        { month: "5월", value: 55 }, { month: "6월", value: 90 },
        { month: "7월", value: 75 }
    ];

    return (
        <Layout>
            <S.DashContainer>
                <S.DashHeader>
                    <S.DashTitle>대시보드 (통합 관리 현황)</S.DashTitle>
                </S.DashHeader>

                {/* 🎯 1. 최상단 요약 카드 (SB Admin 2 Style) */}
                <S.SummaryGrid>
                    {/* 상담신청관리 */}
                    <S.SummaryCard $color="#4e73df">
                        <S.SummaryCardBody>
                            <div>
                                <S.SummaryTitle $color="#4e73df">신규 상담 신청 (월간)</S.SummaryTitle>
                                <S.SummaryValue>150 건</S.SummaryValue>
                            </div>
                            <S.SummaryIcon>
                                <FiMessageSquare size={32} />
                            </S.SummaryIcon>
                        </S.SummaryCardBody>
                    </S.SummaryCard>

                    {/* 회원관리 */}
                    <S.SummaryCard $color="#1cc88a">
                        <S.SummaryCardBody>
                            <div>
                                <S.SummaryTitle $color="#1cc88a">총 가입 회원</S.SummaryTitle>
                                <S.SummaryValue>2,450 명</S.SummaryValue>
                            </div>
                            <S.SummaryIcon>
                                <FiUsers size={32} />
                            </S.SummaryIcon>
                        </S.SummaryCardBody>
                    </S.SummaryCard>

                    {/* 이벤트랭킹관리 */}
                    <S.SummaryCard $color="#36b9cc">
                        <S.SummaryCardBody>
                            <div>
                                <S.SummaryTitle $color="#36b9cc">진행중인 이벤트</S.SummaryTitle>
                                <S.SummaryValue>8 개</S.SummaryValue>
                            </div>
                            <S.SummaryIcon>
                                <FiStar size={32} />
                            </S.SummaryIcon>
                        </S.SummaryCardBody>
                    </S.SummaryCard>

                    {/* 게시판관리 */}
                    <S.SummaryCard $color="#f6c23e">
                        <S.SummaryCardBody>
                            <div>
                                <S.SummaryTitle $color="#f6c23e">답변 대기 게시물</S.SummaryTitle>
                                <S.SummaryValue>12 건</S.SummaryValue>
                            </div>
                            <S.SummaryIcon>
                                <FiClipboard size={32} />
                            </S.SummaryIcon>
                        </S.SummaryCardBody>
                    </S.SummaryCard>
                </S.SummaryGrid>

                {/* 🎯 2. 차트 영역 (그래프) */}
                <S.ChartGrid>
                    <S.ChartCard>
                        <S.ChartHeader>
                            <S.ChartTitle><FiTrendingUp /> 월별 상담 신청 추이</S.ChartTitle>
                        </S.ChartHeader>
                        <S.ChartBody>
                            <S.BarChartContainer>
                                {monthlyData.map((data, idx) => (
                                    <S.BarWrapper key={idx}>
                                        <S.BarValue>{data.value}</S.BarValue>
                                        <S.Bar $height={`${data.value}%`} />
                                        <S.BarLabel>{data.month}</S.BarLabel>
                                        </S.BarWrapper>
                                ))}
                            </S.BarChartContainer>
                        </S.ChartBody>
                    </S.ChartCard>

                    <S.ChartCard>
                        <S.ChartHeader>
                            <S.ChartTitle><FiPieChart /> 시술 관심도 분포</S.ChartTitle>
                        </S.ChartHeader>
                        <S.ChartBody style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <S.DonutChart>
                                <div className="inner-circle">
                                    <span>TOP 3</span>
                                </div>
                            </S.DonutChart>
                            <S.LegendContainer>
                                <S.LegendItem><span className="dot" style={{ background: '#4e73df' }}></span>눈성형 (45%)</S.LegendItem>
                                <S.LegendItem><span className="dot" style={{ background: '#1cc88a' }}></span>코성형 (30%)</S.LegendItem>
                                <S.LegendItem><span className="dot" style={{ background: '#36b9cc' }}></span>안티에이징 (25%)</S.LegendItem>
                            </S.LegendContainer>
                        </S.ChartBody>
                    </S.ChartCard>
                </S.ChartGrid>

                {/* 🎯 3. 시스템 운영 현황 (나머지 메뉴들 요약) */}
                <S.SystemGrid>
                    <S.SystemCard>
                        <S.ChartHeader>
                            <S.ChartTitle><FiSettings /> 프론트 UI / 설정 상태</S.ChartTitle>
                        </S.ChartHeader>
                        <S.ChartBody>
                            <S.StatusList>
                                <S.StatusItem>
                                    <div className="label"><FiLayout /> 톤앤매너 관리</div>
                                    <S.Badge $active={true}>정상동작</S.Badge>
                                </S.StatusItem>
                                <S.StatusItem>
                                    <div className="label"><FiLayers /> 내비게이션 관리</div>
                                    <S.Badge $active={true}>업데이트 완료</S.Badge>
                                </S.StatusItem>
                                <S.StatusItem>
                                    <div className="label"><FiLayout /> 푸터 관리</div>
                                    <S.Badge $active={true}>설정됨</S.Badge>
                                </S.StatusItem>
                            </S.StatusList>
                        </S.ChartBody>
                    </S.SystemCard>

                    <S.SystemCard>
                        <S.ChartHeader>
                            <S.ChartTitle><FiImage /> 미디어 / 마케팅 모듈</S.ChartTitle>
                        </S.ChartHeader>
                        <S.ChartBody>
                            <S.StatusList>
                                <S.StatusItem>
                                    <div className="label"><FiImage /> 팝업 관리</div>
                                    <S.Badge $active={true}>활성 2건</S.Badge>
                                </S.StatusItem>
                                <S.StatusItem>
                                    <div className="label"><FiMessageSquare /> 뉴스티커 관리</div>
                                    <S.Badge $active={false}>비활성</S.Badge>
                                </S.StatusItem>
                                <S.StatusItem>
                                    <div className="label"><FiImage /> 셀피 관리</div>
                                    <S.Badge $active={true}>신규 5건</S.Badge>
                                </S.StatusItem>
                            </S.StatusList>
                        </S.ChartBody>
                    </S.SystemCard>

                    <S.SystemCard>
                        <S.ChartHeader>
                            <S.ChartTitle><FiVideo /> 비디오 / 특수 모듈</S.ChartTitle>
                        </S.ChartHeader>
                        <S.ChartBody>
                            <S.StatusList>
                                <S.StatusItem>
                                    <div className="label"><FiVideo /> VLOG 관리</div>
                                    <S.Badge $active={true}>영상 12개</S.Badge>
                                </S.StatusItem>
                                <S.StatusItem>
                                    <div className="label"><FiShield /> 안전마취 관리</div>
                                    <S.Badge $active={true}>시스템 정상</S.Badge>
                                </S.StatusItem>
                            </S.StatusList>
                        </S.ChartBody>
                    </S.SystemCard>
                </S.SystemGrid>

            </S.DashContainer>
        </Layout>
    );
}