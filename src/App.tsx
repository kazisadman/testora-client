import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./routes/Homepage";
import MainLayout from "./layout/MainLayout";
import Generate from "./components/Generate";
import Dashboard from "./routes/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Homepage />} />
        </Route>
        <Route element={<Generate />} path="/generate">
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
