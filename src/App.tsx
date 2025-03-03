import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./routes/Homepage";
import MainLayout from "./layout/MainLayout";
import Generate from "./components/Generate";
import Dashboard from "./routes/Dashboard";
import CreateEditPage from "./routes/CreateEditPage";
import Login from "./routes/Login";
import Register from "./routes/Register";
import ProtectedRoutes from "./layout/ProtectedRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Homepage />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          element={
            <ProtectedRoutes>
              <Generate />
            </ProtectedRoutes>
          }
          path="/generate"
        >
          <Route index element={<Dashboard />} />
          <Route path=":interviewId" element={<CreateEditPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
