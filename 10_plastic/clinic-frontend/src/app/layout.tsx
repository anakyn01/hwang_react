"use client";

import { GlobalStyle} from "@/assets/css/GlobalStyle";
import ConditinalLayout from '@/component/ConditionalLayout';

export default function RootLayout({ children }:{children:React.ReactNode}) {
  return (
    <html lang="ko">
   
      <body>
      <GlobalStyle />  
          
      <ConditinalLayout>
      {children}
      </ConditinalLayout>   
      </body>
    </html>
  );
}
