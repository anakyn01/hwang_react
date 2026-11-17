"use client";
import React, {useState, useEffect} from "react";
import axios from "axios";
import { Layout } from "../Layout";
// 💡 직통 임포트(Direct Import)를 사용하여 스타일 깨짐 방지
import * as S from "@/assets/css/admin/Admin.style";
import { 
    FiMessageSquare, FiUsers, FiStar, FiClipboard, 
    FiTrendingUp, FiPieChart, FiLayout, FiLayers, 
    FiImage, FiVideo, FiShield, FiSettings 
} from "react-icons/fi";

//대시 보드 통계 인터페이스
interface DashboardStats{
 consultationsCount:0,
 membersCount:0,
 eventsCount:0,
 boardsCount:0,
 popupsCount:0,
 selfiesCount:0,
 vlogsCount:0,
 safetyCount:0,   
}





export default function Dash() {

// 🎯 상태 관리: 대시보드 통계 데이터 (초기값 0)
    const [stats, setStats] = useState<DashboardStats>({
        consultationsCount: 0,
        membersCount: 0,
        eventsCount: 0,
        boardsCount: 0,
        popupsCount: 0,
        selfiesCount: 0,
        vlogsCount: 0,
        safetyCount: 0,
    });    


//병목현상 방지를 위해 프로미스올 사용
useEffect(() => {
    const fetchAllData = async () => {
        try{
// Promise.all을 사용하여 여러 API를 동시에 호출 (로딩 속도 최적화)
const [
consultRes, usersRes, eventsRes, boardsRes, 
popupsRes, selfiesRes, vlogsRes, safetyRes    
] = await Promise.all([
axios.get("http://localhost:4000/api/admin/consult").catch(() => ({ data: { data: [] } })),
axios.get("http://localhost:4000/api/admin/users").catch(() => ({ data: { pagination: { totalCount: 0 } } })),
axios.get("http://localhost:4000/api/admin/events").catch(() => ({ data: { data: [] } })),
axios.get("http://localhost:4000/api/admin/boards").catch(() => ({ data: { data: [] } })),
axios.get("http://localhost:4000/api/admin/popups").catch(() => ({ data: { popups: [] } })),
axios.get("http://localhost:4000/api/admin/selfies").catch(() => ({ data: { data: [] } })),
axios.get("http://localhost:4000/api/admin/vlogs").catch(() => ({ data: { data: [] } })),
axios.get("http://localhost:4000/api/admin/safety").catch(() => ({ data: { data: [] } }))
]);
// 응답받은 실제 DB 데이터의 길이나 totalCount를 바탕으로 통계 업데이트
setStats({
consultationsCount: consultRes.data.data?.length || 0,
// 💡 users API는 pagination 구조 안에 totalCount가 있으므로 이를 활용!
membersCount: usersRes.data.pagination?.totalCount || 0,
eventsCount: eventsRes.data.data?.length || 0,
boardsCount: boardsRes.data.data?.length || 0,
// 💡 popups API는 응답 구조가 { popups: [...] } 임을 반영
popupsCount: popupsRes.data.popups?.length || 0,
selfiesCount: selfiesRes.data.data?.length || 0,
vlogsCount: vlogsRes.data.data?.length || 0,
safetyCount: safetyRes.data.data?.length || 0,
});

        }catch(error){
console.error("대시보드 실제 데이터 연동 실패:", error);
        }
    }
    fetchAllData();
},[])

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

                {/* 🎯 1. 최상단 요약 카드 (실제 DB 연동 완료) */}
                <S.SummaryGrid>
                    {/* 상담신청관리 */}
                    <S.SummaryCard $color="#4e73df">
                        <S.SummaryCardBody>
                            <div>
                                <S.SummaryTitle $color="#4e73df">신규 상담 신청 (누적)</S.SummaryTitle>
                                <S.SummaryValue>{stats.consultationsCount.toLocaleString()} 건</S.SummaryValue>
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
                                <S.SummaryValue>{stats.membersCount.toLocaleString()} 명</S.SummaryValue>
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
                                <S.SummaryValue>{stats.eventsCount.toLocaleString()} 개</S.SummaryValue>
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
                                <S.SummaryTitle $color="#f6c23e">운영 중인 게시판</S.SummaryTitle>
                                <S.SummaryValue>{stats.boardsCount.toLocaleString()} 개</S.SummaryValue>
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

                {/* 🎯 3. 시스템 운영 현황 (실제 DB 연동 완료) */}
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
                                    <S.Badge $active={stats.popupsCount > 0}>활성 {stats.popupsCount}건</S.Badge>
                                </S.StatusItem>
                                <S.StatusItem>
                                    <div className="label"><FiMessageSquare /> 뉴스티커 관리</div>
                                    <S.Badge $active={false}>비활성</S.Badge>
                                </S.StatusItem>
                                <S.StatusItem>
                                    <div className="label"><FiImage /> 셀피 관리</div>
                                    <S.Badge $active={stats.selfiesCount > 0}>총 {stats.selfiesCount}건 등록됨</S.Badge>
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
                                    <S.Badge $active={stats.vlogsCount > 0}>영상 {stats.vlogsCount}개</S.Badge>
                                </S.StatusItem>
                                <S.StatusItem>
                                    <div className="label"><FiShield /> 안전마취 관리</div>
                                    <S.Badge $active={stats.safetyCount > 0}>
                                        {stats.safetyCount > 0 ? `등록 ${stats.safetyCount}건 (정상)` : '등록 대기'}
                                    </S.Badge>
                                </S.StatusItem>
                            </S.StatusList>
                        </S.ChartBody>
                    </S.SystemCard>
                </S.SystemGrid>

            </S.DashContainer>
        </Layout>
    );
}