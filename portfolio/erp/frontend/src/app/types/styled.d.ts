import 'styled-components';

// styled-components의 기본 DefaultTheme 인터페이스를 확장(병합)합니다.
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      [key: string]: string; 
      // 만약 정확한 타입 체크를 원하시면 아래처럼 명시하셔도 됩니다.
      // background?: string;
      // text?: string;
      // primary?: string;
    };
    // 필요하다면 다른 속성(fonts, margins 등)도 여기에 추가할 수 있습니다.
  }
}