import { Routes, Route } from "react-router-dom";
import NotFound from "./404";
import Home from "./views/Home";
import Users from "./views/Users";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/users" element={<Users />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
