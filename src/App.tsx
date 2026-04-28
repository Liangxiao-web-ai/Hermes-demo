/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Skills from "./pages/Skills";
import Input from "./pages/Input";
import Analyzing from "./pages/Analyzing";
import Result from "./pages/Result";
import CreateSkill from "./pages/CreateSkill";
import Layout from "./components/Layout";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/input" element={<Input />} />
          <Route path="/analyzing" element={<Analyzing />} />
          <Route path="/result" element={<Result />} />
          <Route path="/create-skill" element={<CreateSkill />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
