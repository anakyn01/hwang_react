"use client";

import {ThemeProvider} from "styled-components";
import {theme } from "@/assets/css/theme";
import {GlobalStyle} from "@/assets/css/GlobalStyle";

export default function ThemeProviderWrapper({children} :{children: React.ReactNode}){
return(
<ThemeProvider theme={theme}>
<GlobalStyle/>
{children}
</ThemeProvider>
)    
}
