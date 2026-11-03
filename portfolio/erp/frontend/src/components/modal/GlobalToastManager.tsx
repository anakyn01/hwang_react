"use client";

import { useSchedule } from "@/context/ScheduleContext";
import * as stylex from "@stylexjs/stylex";
import { styles } from "@/assets/stylex/style.styles"; // 방금 정의한 스타일 경로

export function GlobalToastManager() {
  const { currentToast, setCurrentToast } = useSchedule();

  if (!currentToast) return null;

  return (
    <div {...stylex.props(styles.container)}>
      <div {...stylex.props(styles.iconWrapper)}>⏰</div>
      <div {...stylex.props(styles.content)}>
        <h4 {...stylex.props(styles.title)}>{currentToast.title}</h4>
        <p {...stylex.props(styles.message)}>{currentToast.content}</p>
      </div>
      <button 
        {...stylex.props(styles.closeBtn)} 
        onClick={() => setCurrentToast(null)}
      >
        확인
      </button>
    </div>
  );
}