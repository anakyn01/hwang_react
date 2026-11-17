"use client";

import { useState } from "react";
import { AlertModal } from "@/components/modal/AlertModal";
import axios from "axios";
import Link from "next/link";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      setAlertMessage("이메일 주소를 입력해주세요.");
      setIsAlertOpen(true);
      return;
    }

    try {
      await axios.post("http://localhost:4000/api/auth/forgot", { email });
      setAlertMessage("비밀번호 재설정 링크가 이메일로 전송되었습니다.");
      setIsAlertOpen(true);
      setEmail("");
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "요청 처리 중 오류가 발생했습니다.";
      setAlertMessage(errorMessage);
      setIsAlertOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-blue-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row">
        
        {/* 좌측 이미지 영역 */}
        <div className="hidden md:block md:w-1/2 bg-gray-100 bg-cover bg-center" />

        {/* 우측 패스워드 찾기 폼 영역 */}
        <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Forgot Your Password?
          </h1>
          
          <p className="text-sm text-gray-600 mb-6 leading-relaxed">
            We get it, stuff happens. Just enter your email address below 
            and we'll send you a link to reset your password!
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <input 
              type="email" 
              id="exampleInputEmail" 
              placeholder="Enter Email Address..." 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-400"
            />
            
            <button 
              type="submit" 
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-md text-sm"
            >
              Reset Password
            </button>
          </form>
          
          <hr className="my-6 border-gray-200" />
          
          <div className="space-y-2 text-center md:text-left text-sm">
            <div>
              <Link href="/member" className="text-blue-600 hover:underline">
                Create an Account!
              </Link>
            </div>
            <div>
              <Link href="/" className="text-blue-600 hover:underline">
                Already have an account? Login!
              </Link>
            </div>
          </div>
        </div>
      </div>

      <AlertModal 
        isOpen={isAlertOpen}
        message={alertMessage}
        onClose={() => setIsAlertOpen(false)}
      />
    </div>
  );
}