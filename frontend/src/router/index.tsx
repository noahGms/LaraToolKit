import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/home';
import ProjectDetails from "../pages/project-details";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
      </Routes>
    </BrowserRouter>
  );
}
