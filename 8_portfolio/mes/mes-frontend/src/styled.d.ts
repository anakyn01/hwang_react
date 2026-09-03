// src/styled.d.ts
import "styled-components";
import { Theme } from "@/app/styles/theme"; // 💡 실제 theme.ts 파일 경로로 맞추세요

// styled-components의 기본 테마(DefaultTheme)를 우리가 만든 Theme 타입으로 덮어씌웁니다.
declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}