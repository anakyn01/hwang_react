"use client";

import { GlobalStyle} from "@/assets/css/GlobalStyle";
import ConditinalLayout from '@/component/ConditionalLayout';
import StyledComponentsRegistry from "@/lib/registry";

export default function RootLayout({ children }:{children:React.ReactNode}) {
  return (
    <html lang="ko">
   
      <body>
      <StyledComponentsRegistry>
      <GlobalStyle />            
      <ConditinalLayout>
      {children}
      </ConditinalLayout> 
      </StyledComponentsRegistry>  
      </body>
    </html>
  );
}
