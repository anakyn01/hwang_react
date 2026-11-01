"use client";

import React from "react";
import styles from "./CustomAlert.module.css";

interface CustomAlertProps {
  isOpen: boolean;
  message: string;
  onClose: () => void;
}

export const CustomAlert = ({ isOpen, message, onClose }: CustomAlertProps) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.alertBox} onClick={(e) => e.stopPropagation()}>
        <div className={styles.iconArea}>✨</div>
        <div className={styles.message}>{message}</div>
        <button className={styles.confirmButton} onClick={onClose}>
          확인
        </button>
      </div>
    </div>
  );
};