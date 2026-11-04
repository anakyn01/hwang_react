"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Layout } from "@/components/Layout";
import { CustomAlert } from "@/components/common/CustomAlert";
import * as stylex from "@stylexjs/stylex";
import { styles } from "@/assets/stylex/style.styles";

export default function MyPageClient() {
    const router = useRouter();
    
    // 💡 탭 상태 관리 ("profile" | "password" | "message" | "schedule")
    const [activeTab, setActiveTab] = useState("profile");

    // 개인정보 상태 (전화번호, 주소 등)
    const [phone, setPhone] = useState("010-1234-5678");
    const [address, setAddress] = useState("서울시 강남구 테헤란로 123");
    const role = "생산 관리자 (Production Manager)"; // 내 권한 표시

    // 비밀번호 상태
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    // 쪽지 상태
    const [messageContent, setMessageContent] = useState("");

    // 알럿 상태
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");

    const showAlert = (msg: string) => {
        setAlertMessage(msg);
        setIsAlertOpen(true);
    };

    // 비밀번호 변경 핸들러
    const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        if (!token) {
            showAlert("로그인이 필요합니다.");
            router.push("/");
            return;
        }

        try {
            await axios.post(
                "http://127.0.0.1:8080/api/members/change-password",
                { oldPassword, newPassword },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            showAlert("비밀번호가 성공적으로 변경되었습니다. 다시 로그인해주세요.");
            localStorage.removeItem("token");
            delete axios.defaults.headers.common["Authorization"];
            router.push("/");
        } catch (error: any) {
            showAlert(error.response?.data || "비밀번호 변경에 실패했습니다.");
        }
    };

    // 개인정보 수정 저장 핸들러
    const handleSaveProfile = (e: React.FormEvent) => {
        e.preventDefault();
        showAlert("회원 정보가 성공적으로 수정되었습니다.");
    };

    // 관리자 쪽지 전송 핸들러
    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!messageContent.trim()) {
            showAlert("쪽지 내용을 입력해주세요.");
            return;
        }
        showAlert("관리자에게 쪽지가 성공적으로 전송되었습니다.");
        setMessageContent("");
    };

    return (
        <Layout>
            <div {...stylex.props(styles.container)}>
                <div {...stylex.props(styles.headerWrapper)}>
                    <h2 {...stylex.props(styles.title)}>마이페이지</h2>
                </div>

                <div {...stylex.props(styles.settingsContentLayout)}>
                    {/* 💡 좌측 사이드바 탭 메뉴 */}
                    <div {...stylex.props(styles.settingsSidebar)}>
                        <ul {...stylex.props(styles.sidebarMenuUl)}>
                            <li 
                                {...stylex.props(styles.sidebarItem, activeTab === "profile" && styles.sidebarItemActive)}
                                onClick={() => setActiveTab("profile")}
                            >
                                내 정보 및 권한 관리
                            </li>
                            <li 
                                {...stylex.props(styles.sidebarItem, activeTab === "password" && styles.sidebarItemActive)}
                                onClick={() => setActiveTab("password")}
                            >
                                비밀번호 변경
                            </li>
                            <li 
                                {...stylex.props(styles.sidebarItem, activeTab === "message" && styles.sidebarItemActive)}
                                onClick={() => setActiveTab("message")}
                            >
                                관리자에게 쪽지 보내기
                            </li>
                            <li 
                                {...stylex.props(styles.sidebarItem, activeTab === "schedule" && styles.sidebarItemActive)}
                                onClick={() => setActiveTab("schedule")}
                            >
                                일정 관리 (회의 및 업무)
                            </li>
                        </ul>
                    </div>

                    {/* 💡 우측 메인 패널 */}
                    <div {...stylex.props(styles.settingsMainPanel)}>
                        <h3 {...stylex.props(styles.panelTitle)}>
                            {activeTab === "profile" && "내 정보 및 권한 관리"}
                            {activeTab === "password" && "비밀번호 변경"}
                            {activeTab === "message" && "관리자에게 쪽지 보내기"}
                            {activeTab === "schedule" && "일정 및 회의 현황"}
                        </h3>

                        {/* 1. 내 정보 및 권한 관리 탭 */}
                        {activeTab === "profile" && (
                            <form onSubmit={handleSaveProfile} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                                <div {...stylex.props(styles.formGroup)}>
                                    <label {...stylex.props(styles.formLabel)}>시스템 권한 (RBAC)</label>
                                    <div>
                                        <span {...stylex.props(styles.permissionBadgeBox)}>{role}</span>
                                    </div>
                                </div>

                                <div {...stylex.props(styles.formGroup)}>
                                    <label {...stylex.props(styles.formLabel)}>전화번호</label>
                                    <div {...stylex.props(styles.inputWrapper)}>
                                        <input 
                                            type="text" 
                                            value={phone} 
                                            onChange={(e) => setPhone(e.target.value)} 
                                            {...stylex.props(styles.formInput)} 
                                        />
                                    </div>
                                </div>

                                <div {...stylex.props(styles.formGroup)}>
                                    <label {...stylex.props(styles.formLabel)}>주소</label>
                                    <div {...stylex.props(styles.inputWrapper)}>
                                        <input 
                                            type="text" 
                                            value={address} 
                                            onChange={(e) => setAddress(e.target.value)} 
                                            {...stylex.props(styles.formInput)} 
                                        />
                                    </div>
                                </div>

                                <button type="submit" {...stylex.props(styles.saveButton)}>
                                    정보 수정 저장
                                </button>
                            </form>
                        )}

                        {/* 2. 비밀번호 변경 탭 */}
                        {activeTab === "password" && (
                            <form onSubmit={handleChangePassword} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                                <div {...stylex.props(styles.formGroup)}>
                                    <label {...stylex.props(styles.formLabel)}>기존(또는 임시) 비밀번호</label>
                                    <div {...stylex.props(styles.inputWrapper)}>
                                        <input 
                                            type="password" 
                                            value={oldPassword} 
                                            onChange={(e) => setOldPassword(e.target.value)} 
                                            placeholder="기존 비밀번호를 입력하세요"
                                            required 
                                            {...stylex.props(styles.formInput)} 
                                        />
                                    </div>
                                </div>

                                <div {...stylex.props(styles.formGroup)}>
                                    <label {...stylex.props(styles.formLabel)}>새 비밀번호</label>
                                    <div {...stylex.props(styles.inputWrapper)}>
                                        <input 
                                            type="password" 
                                            value={newPassword} 
                                            onChange={(e) => setNewPassword(e.target.value)} 
                                            placeholder="새 비밀번호를 입력하세요"
                                            required 
                                            {...stylex.props(styles.formInput)} 
                                        />
                                    </div>
                                </div>

                                <button type="submit" {...stylex.props(styles.saveButton)}>
                                    비밀번호 변경하기
                                </button>
                            </form>
                        )}

                        {/* 3. 관리자에게 쪽지 보내기 탭 */}
                        {activeTab === "message" && (
                            <form onSubmit={handleSendMessage} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                                <div {...stylex.props(styles.formGroup)}>
                                    <label {...stylex.props(styles.formLabel)}>받는 사람</label>
                                    <div {...stylex.props(styles.inputWrapper)}>
                                        <input type="text" value="시스템 최고 관리자" disabled {...stylex.props(styles.formInput)} style={{ color: "#86868B" }} />
                                    </div>
                                </div>

                                <div {...stylex.props(styles.formGroup)}>
                                    <label {...stylex.props(styles.formLabel)}>쪽지 내용</label>
                                    <div {...stylex.props(styles.inputWrapper)} style={{ height: "140px", alignItems: "flex-start", padding: "8px" }}>
                                        <textarea 
                                            value={messageContent}
                                            onChange={(e) => setMessageContent(e.target.value)}
                                            placeholder="관리자에게 전달할 문의사항이나 요청사항을 입력하세요..."
                                            {...stylex.props(styles.mypageTextArea)}
                                        />
                                    </div>
                                </div>

                                <button type="submit" {...stylex.props(styles.saveButton)}>
                                    관리자에게 쪽지 전송
                                </button>
                            </form>
                        )}

                        {/* 4. 일정 관리 탭 (등록된 일정 / 완료 / 취소 / 주간·월간 회의) */}
                        {activeTab === "schedule" && (
                            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                                <span style={{ fontSize: "13px", color: "#86868B" }}>본인이 등록한 일정 및 참여 회의 현황입니다.</span>
                                
                                <div {...stylex.props(styles.scheduleCardItem)}>
                                    <div>
                                        <div style={{ fontSize: "14px", fontWeight: "600", color: "#1D1D1F" }}>[주간 회의] 부서별 생산 진척도 점검</div>
                                        <div style={{ fontSize: "12px", color: "#86868B", marginTop: "4px" }}>2026-11-09 (월) 10:00 AM</div>
                                    </div>
                                    <span style={{ fontSize: "12px", fontWeight: "600", color: "#0066CC", backgroundColor: "rgba(0,102,204,0.08)", padding: "4px 10px", borderRadius: "8px" }}>등록됨</span>
                                </div>

                                <div {...stylex.props(styles.scheduleCardItem)}>
                                    <div>
                                        <div style={{ fontSize: "14px", fontWeight: "600", color: "#1D1D1F" }}>[월간 회의] 11월 경영 실적 및 자재 수급 대책</div>
                                        <div style={{ fontSize: "12px", color: "#86868B", marginTop: "4px" }}>2026-11-30 (월) 02:00 PM</div>
                                    </div>
                                    <span style={{ fontSize: "12px", fontWeight: "600", color: "#0066CC", backgroundColor: "rgba(0,102,204,0.08)", padding: "4px 10px", borderRadius: "8px" }}>등록됨</span>
                                </div>

                                <div {...stylex.props(styles.scheduleCardItem)}>
                                    <div>
                                        <div style={{ fontSize: "14px", fontWeight: "600", color: "#1D1D1F" }}>10월 재고 실사 검토 미팅</div>
                                        <div style={{ fontSize: "12px", color: "#86868B", marginTop: "4px" }}>2026-10-31 (토) 04:00 PM</div>
                                    </div>
                                    <span style={{ fontSize: "12px", fontWeight: "600", color: "#34C759", backgroundColor: "rgba(52,199,89,0.08)", padding: "4px 10px", borderRadius: "8px" }}>완료됨</span>
                                </div>

                                <div {...stylex.props(styles.scheduleCardItem)}>
                                    <div>
                                        <div style={{ fontSize: "14px", fontWeight: "600", color: "#1D1D1F" }}>협력사 신규 단가 협의 미팅</div>
                                        <div style={{ fontSize: "12px", color: "#86868B", marginTop: "4px" }}>2026-11-02 (월) 11:00 AM</div>
                                    </div>
                                    <span style={{ fontSize: "12px", fontWeight: "600", color: "#FF3B30", backgroundColor: "rgba(255,59,48,0.08)", padding: "4px 10px", borderRadius: "8px" }}>취소됨</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* 커스텀 알럿 모달 */}
            <CustomAlert 
                isOpen={isAlertOpen}
                message={alertMessage}
                onClose={() => setIsAlertOpen(false)}
            />
        </Layout>
    );
}