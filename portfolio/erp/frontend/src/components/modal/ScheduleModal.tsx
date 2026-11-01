"use client";

import React, { useState } from "react";
import styles from "../ScheduleModal.module.css";

interface Schedule {
  id: string;
  date: number;
  content: string;
  status: "대기" | "진행" | "완료";
  createdAt: string;
}

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  month: number;
  selectedDate: number | null;
  schedules: Schedule[];
  setSchedules: React.Dispatch<React.SetStateAction<Schedule[]>>;
}

export default function ScheduleModal({
  isOpen,
  onClose,
  month,
  selectedDate,
  schedules,
  setSchedules,
}: ScheduleModalProps) {
  const [content, setContent] = useState("");

  if (!isOpen || selectedDate === null) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    const newSchedule: Schedule = {
      id: Date.now().toString(),
      date: selectedDate,
      content,
      status: "대기",
      createdAt: new Date().toISOString(),
    };

    setSchedules((prev) => [...prev, newSchedule]);
    setContent("");
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
        <h3 className={styles.modalTitle}>
          {month}월 {selectedDate}일 일정 관리
        </h3>
        
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <input
            type="text"
            className={styles.input}
            placeholder="등록할 일정을 입력하세요..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            autoFocus
          />

          <div className={styles.buttonGroup}>
            <button 
              type="button" 
              className={`${styles.button} ${styles.cancelButton}`} 
              onClick={onClose}
            >
              취소
            </button>
            <button 
              type="submit" 
              className={`${styles.button} ${styles.submitButton}`}
            >
              저장
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}