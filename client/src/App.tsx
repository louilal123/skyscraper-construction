// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layouts/Layout';
import Home from './pages/Home';
import Mission from './pages/Mission';
import Contact from './pages/Contact';
import Licenses from './pages/Licenses';
import Services from './pages/Services';
import Projects from './pages/Projects';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
           <Route path="/mission" element={<Mission />} />
           <Route path="/contact" element={<Contact />} />
            <Route path="/licenses" element={<Licenses />} />
             <Route path="/services" element={<Services />} />
            <Route path="/projects" element={<Projects />} />
          </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;