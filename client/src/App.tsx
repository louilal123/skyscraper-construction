// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layouts/Layout';
import Home from './pages/Home';
import Mission from './pages/Mission';
import Contact from './pages/Contact';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
           <Route path="/mission" element={<Mission />} />
           <Route path="/contact" element={<Contact />} />
          {/* Placeholder routes - add later */}
          <Route path="/services" element={<div className="container mx-auto px-4 py-12"><h1 className="text-3xl font-bold">Services Page</h1><p className="mt-4">Coming soon.</p></div>} />
          <Route path="/projects" element={<div className="container mx-auto px-4 py-12"><h1 className="text-3xl font-bold">Projects Page</h1><p className="mt-4">Coming soon.</p></div>} />
          <Route path="/contact" element={<div className="container mx-auto px-4 py-12"><h1 className="text-3xl font-bold">Contact Page</h1><p className="mt-4">Coming soon.</p></div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;