import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";
import { Router } from "./Router";
import { BrowserRouter } from "react-router-dom";
import { createContext} from "react";
import { CyclesContextProvider } from "./contexts/CyclesContext";


export function App() {
    
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        {" "}
        {/*informmações para os componentes que estão dentro dele. Para o componentes obterem informações para além do que está dentro deles*/}
        <BrowserRouter>
          {" "}
          {/*informmações para os componentes que estão dentro dele. Para o componentes obterem informações para além do que está dentro deles*/}
        <CyclesContextProvider>
          <Router />
          </CyclesContextProvider>
        </BrowserRouter>
        <GlobalStyle />
      </ThemeProvider>
    </>
  );
}
