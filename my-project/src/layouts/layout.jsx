// Layout.jsx
import { Outlet } from "react-router-dom";
import Header from '../pages/header.jsx'
import Footer from '../pages/footer.jsx'
export default function Layout() {
  return (
    <>
      <Header />

      <main className="min-h-screen">
        <Outlet />
      </main>

      <Footer />
    </>
  );
}