import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/layout.jsx";
import Welcome from "./pages/welcome.jsx";
import BuildCv from "./pages/buildcv.jsx";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Welcome />} />

          <Route path="build-cv" element={<BuildCv />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}