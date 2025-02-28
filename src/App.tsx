import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./routes/Homepage";
import MainLayout from "./layout/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout/>}>
          <Route index element={<Homepage/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
