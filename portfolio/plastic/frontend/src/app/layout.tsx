

import { GlobalStyle} from "@/assets/css/GlobalStyle";
import ConditinalLayout from '@/component/ConditionalLayout';
import StyledComponentsRegistry from "@/lib/registry";
import { Providers } from "@/store/Providers";

export default function RootLayout({ children }:{children:React.ReactNode}) {
  return (
    <html lang="ko">
   
      <body>
      <StyledComponentsRegistry>
      <GlobalStyle />            
      <ConditinalLayout>
        <Providers>
      {children}
      </Providers>
      </ConditinalLayout> 
      </StyledComponentsRegistry>  
      </body>
    </html>
  );
}
