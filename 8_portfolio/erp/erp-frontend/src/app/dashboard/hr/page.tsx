"use client";

import {useState} from "react";
import { Layout } from "@/components/Layout";

<<<<<<< HEAD
interface Employee{
id: string;
  name: string;
  department: string;
  role: string;
  status: "active" | "leave" | "resigned";
  joinDate: string;    
}

export default function hr(){
const [employees] = useState<Employee[]>([
{ id: "EMP-001", name: "김철수", department: "개발팀", role: "수석 엔지니어", status: "active", joinDate: "2020-03-02" },
    { id: "EMP-002", name: "이영희", department: "인사팀", role: "팀장", status: "active", joinDate: "2019-11-15" },
    { id: "EMP-003", name: "박민수", department: "영업팀", role: "사원", status: "leave", joinDate: "2022-07-01" },
    { id: "EMP-004", name: "정지원", department: "디자인팀", role: "UI/UX 디자이너", status: "active", joinDate: "2021-05-20" },
]);

const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <span className="px-3 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">재직중</span>;
      case "leave":
        return <span className="px-3 py-1 text-xs font-semibold text-yellow-700 bg-yellow-100 rounded-full">휴직</span>;
      case "resigned":
        return <span className="px-3 py-1 text-xs font-semibold text-red-700 bg-red-100 rounded-full">퇴사</span>;
      default:
        return <span className="px-3 py-1 text-xs font-semibold text-gray-700 bg-gray-100 rounded-full">알수없음</span>;
    }
  };

return(
<Layout>
{/* 💡 Tailwind를 사용한 반응형 컨테이너: 최대 너비 제한, 자동 중앙 정렬, 패딩 적용 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* 헤더 영역 */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">인사 관리</h2>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors">
            + 신규 직원 등록
          </button>
        </div>

        {/* 요약 카드 영역 (Grid 레이아웃) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">총 임직원 수</h3>
            <p className="text-3xl font-bold text-gray-900">{employees.length}명</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">이번 달 신규 입사</h3>
            <p className="text-3xl font-bold text-blue-600">0명</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">현재 휴직자</h3>
            <p className="text-3xl font-bold text-yellow-600">
              {employees.filter(emp => emp.status === 'leave').length}명
            </p>
          </div>
        </div>

        {/* 테이블 영역 */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
            <h3 className="font-semibold text-gray-800">임직원 목록</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-white border-b border-gray-200">
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">사번</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">이름</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">부서</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">직급/직책</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-center">상태</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">입사일</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-center">관리</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {employees.map((emp) => (
                  <tr key={emp.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-sm text-gray-500 font-medium">{emp.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-bold">{emp.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{emp.department}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{emp.role}</td>
                    <td className="px-6 py-4 text-sm text-center">{getStatusBadge(emp.status)}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{emp.joinDate}</td>
                    <td className="px-6 py-4 text-sm text-center">
                      <button className="text-blue-600 hover:text-blue-800 font-medium mr-3">수정</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>    
=======
export default function hr(){
return(
<Layout>
    <></>
>>>>>>> 22c3fff17fb57f93f7f021f3b1250f6d651ac4d9
</Layout>
);
}