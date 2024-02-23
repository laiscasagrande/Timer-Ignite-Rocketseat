import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { History } from "./pages/History";
import { DefaultLayout } from "./layouts/DefaultLayout/index";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout/>}> {/*foi aplicado a / porque queremos aplicar ese layout em todas as rotas que começam com /*/ }
        <Route path="/" element={<Home />} />{" "}
        {/*quando estiver no caminho /, o usuario acessará a Home*/}
        <Route path="/history" element={<History />} />
      </Route>
    </Routes>
  );
}
