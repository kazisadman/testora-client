import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Container from "../components/Container";

const MainLayout = () => {
  return (
    <div className="flex flex-col h-screen font-poppins">
      <Header />
      <Container className="flex-grow">
        <main className="flex-grow">
          <Outlet />
        </main>
      </Container>
    </div>
  );
};

export default MainLayout;
