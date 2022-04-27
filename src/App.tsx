import { BrowserRouter, Route, Routes } from "react-router-dom";
// import logo from "./logo.svg";
import "./App.css";
import { RootRouter } from "./pages/RootRouter";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<RootRouter />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
