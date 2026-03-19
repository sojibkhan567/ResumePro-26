import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import ResumeBuilder from "./pages/ResumeBuilder";
import Login from "./pages/Login";
import Preview from "./pages/Preview";
import Layout from "./pages/Layout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="app" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="builder/:resumeId" element={<ResumeBuilder />} />
        </Route>

        <Route path="login" element={<Login />} />
        <Route path="preview/:resumeId" element={<Preview />} />
      </Routes>
    </>
  );
}

export default App;
