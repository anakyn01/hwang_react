"use client";

import React, { useState, useEffect } from "react";
import * as S from "@/assets/css/Style.style";

export interface Schedule {
  id: string;
  year: number;
  month: number;
  date: number;
  time: string;
  title: string;
  content: string;
  status: "대기" | "진행" | "완료";
  createdAt: string;
}

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  year?: number;
  month: number;
  selectedDate: number | null;
  schedules: Schedule[];
  setSchedules: React.Dispatch<React.SetStateAction<Schedule[]>>;
}

export default function ScheduleModal({
  isOpen,
  onClose,
  year = new Date().getFullYear(),
  month,
  selectedDate,
  schedules,
  setSchedules,
}: ScheduleModalProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [ampm, setAmpm] = useState<"AM" | "PM">("AM");
  const [hour, setHour] = useState("09");
  const [minute, setMinute] = useState("00");
  const [status, setStatus] = useState<"대기" | "진행" | "완료">("대기");
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen, selectedDate, month, year]);

  const resetForm = () => {
    setTitle("");
    setContent("");
    setAmpm("AM");
    setHour("09");
    setMinute("00");
    setStatus("대기");
    setEditingId(null);
  };

  if (!isOpen || selectedDate === null) return null;

  // 💡 현재 선택된 연, 월, 일과 정확히 일치하는 일정만 필터링
  const dailySchedules = schedules.filter(
    (sch) =>
      Number(sch.year) === Number(year) &&
      Number(sch.month) === Number(month) &&
      Number(sch.date) === Number(selectedDate)
  );

  const handleSave = () => {
    if (!title.trim() && !content.trim()) return;

    let h24 = parseInt(hour, 10);
    if (ampm === "PM" && h24 < 12) h24 += 12;
    if (ampm === "AM" && h24 === 12) h24 = 0;
    const formattedTime = `${String(h24).padStart(2, "0")}:${minute}`;

    if (editingId) {
      setSchedules((prev) =>
        prev.map((sch) =>
          sch.id === editingId
            ? {
                ...sch,
                title: title.trim() || "제목 없음",
                content: content.trim(),
                time: formattedTime,
                status,
              }
            : sch
        )
      );
    } else {
      const newSchedule: Schedule = {
        id: Date.now().toString(),
        year: Number(year),
        month: Number(month),
        date: Number(selectedDate),
        time: formattedTime,
        title: title.trim() || "제목 없음",
        content: content.trim(),
        status,
        createdAt: new Date().toISOString(),
      };
      setSchedules((prev) => [...prev, newSchedule]);
    }

    resetForm();
  };

  const handleEditClick = (sch: Schedule) => {
    setEditingId(sch.id);
    setTitle(sch.title || "");
    setContent(sch.content || "");
    
    if (sch.time && sch.time.includes(":")) {
      const [hStr, mStr] = sch.time.split(":");
      let h = parseInt(hStr, 10);
      if (h >= 12) {
        setAmpm("PM");
        if (h > 12) h -= 12;
      } else {
        setAmpm("AM");
        if (h === 0) h = 12;
      }
      setHour(String(h).padStart(2, "0"));
      setMinute(mStr || "00");
    }

    setStatus(sch.status);
  };

  const handleDeleteClick = (id: string) => {
    setSchedules((prev) => prev.filter((sch) => sch.id !== id));
    if (editingId === id) {
      resetForm();
    }
  };

  return (
    <S.Overlay onClick={onClose}>
      <S.ModalBox onClick={(e) => e.stopPropagation()}>
        <S.Header>
          <h3>
            {month}월 {selectedDate}일 일정 관리
          </h3>
          {editingId && <S.EditBadge>일정 수정 중</S.EditBadge>}
        </S.Header>

        {/* 1. 등록된 일정 리스트 (이 부분이 데이터가 매칭되면 모달 상단에 나타납니다) */}
        {dailySchedules.length > 0 && (
          <S.ScheduleList>
            {dailySchedules.map((sch) => {
              const [hStr, mStr] = (sch.time || "09:00").split(":");
              let h = parseInt(hStr, 10);
              const ap = h >= 12 ? "오후" : "오전";
              if (h > 12) h -= 12;
              if (h === 0) h = 12;
              const displayTime = `${ap} ${String(h).padStart(2, "0")}:${mStr}`;

              return (
                <S.ScheduleItem
                  key={sch.id}
                  $isEditing={editingId === sch.id}
                  onClick={() => handleEditClick(sch)}
                >
                  <S.ItemTop>
                    <S.StatusTag $status={sch.status}>{sch.status}</S.StatusTag>
                    <span style={{ fontSize: "12px", fontWeight: "600", color: "#0066CC" }}>
                      [{displayTime}]
                    </span>
                    <S.ItemTitle>{sch.title || sch.content}</S.ItemTitle>
                    <S.ActionGroup onClick={(e) => e.stopPropagation()}>
                      <S.ActionBtn onClick={() => handleEditClick(sch)}>편집</S.ActionBtn>
                      <S.ActionBtn $isDelete onClick={() => handleDeleteClick(sch.id)}>
                        삭제
                      </S.ActionBtn>
                    </S.ActionGroup>
                  </S.ItemTop>
                  {sch.content && <S.ItemContent>{sch.content}</S.ItemContent>}
                </S.ScheduleItem>
              );
            })}
          </S.ScheduleList>
        )}

        {/* 2. 입력 및 수정 폼 */}
        <S.FormSection>
          <S.StatusRow>
            {(["대기", "진행", "완료"] as const).map((st) => (
              <S.StatusSelectBtn
                key={st}
                type="button"
                $active={status === st}
                onClick={() => setStatus(st)}
              >
                {st}
              </S.StatusSelectBtn>
            ))}
          </S.StatusRow>

          <S.TimeSelectorWrapper>
            <S.TimeLabel>
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
              </svg>
              알람 시간
            </S.TimeLabel>
            <S.TimeSelectGroup>
              <S.StyledSelect value={ampm} onChange={(e) => setAmpm(e.target.value as "AM" | "PM")}>
                <option value="AM">오전</option>
                <option value="PM">오후</option>
              </S.StyledSelect>

              <S.StyledSelect value={hour} onChange={(e) => setHour(e.target.value)}>
                {Array.from({ length: 12 }, (_, i) => {
                  const h = String(i + 1).padStart(2, "0");
                  return <option key={h} value={h}>{h}시</option>;
                })}
              </S.StyledSelect>

              <S.TimeColon>:</S.TimeColon>

<S.StyledSelect value={minute} onChange={(e) => setMinute(e.target.value)}>
  {["00", "05", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55"].map((m) => (
    <option key={m} value={m}>{m}분</option>
  ))}
</S.StyledSelect>
            </S.TimeSelectGroup>
          </S.TimeSelectorWrapper>

          <S.TitleInput
            type="text"
            placeholder="일정 제목을 입력하세요..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <S.ContentTextarea
            placeholder="상세 내용을 입력하세요..."
            rows={2}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </S.FormSection>

        {/* 3. 버튼 영역 */}
        <S.ButtonRow>
          {editingId ? (
            <S.CancelBtn type="button" onClick={resetForm}>
              새 일정 작성
            </S.CancelBtn>
          ) : (
            <div />
          )}

          <S.RightBtns>
            <S.CancelBtn type="button" onClick={onClose}>
              닫기
            </S.CancelBtn>
            <S.SaveBtn type="button" onClick={handleSave}>
              {editingId ? "수정 완료" : "저장"}
            </S.SaveBtn>
          </S.RightBtns>
        </S.ButtonRow>
      </S.ModalBox>
    </S.Overlay>
  );
}