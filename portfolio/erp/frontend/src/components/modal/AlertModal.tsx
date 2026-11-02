"use client";

import { useState, useEffect } from "react";
import * as stylex from "@stylexjs/stylex";
import { styles } from "@/assets/stylex/style.styles";

interface AlertModalProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;    
}

export const AlertModal = ({ isOpen, message, onClose }: AlertModalProps) => {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
    }
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <div 
      {...stylex.props(styles.overlay)} 
      className={isClosing ? "overlay-fadeOut" : "overlay-fadeIn"}
    >
      <div 
        {...stylex.props(styles.alertBox)} 
        className={isClosing ? "alertBox-scaleDown" : "alertBox-scaleUp"}
      >
        {/* 💡 별표 마크가 있던 자리를 깔끔한 애플 스타일 체크 애니메이션으로 완전 교체 */}
        <div className="check-icon-wrapper">
          <svg className="check-svg" viewBox="0 0 52 52">
            <circle className="check-circle" cx="26" cy="26" r="25" fill="none" />
            <path className="check-path" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
          </svg>
        </div>

        <p {...stylex.props(styles.message)}>{message}</p>
        <button 
          {...stylex.props(styles.confirmButton)} 
          onClick={handleClose}
        >
          확인
        </button>        
      </div>
    </div>
  );
};