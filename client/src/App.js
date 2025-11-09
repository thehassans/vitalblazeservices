import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Features from './components/Features';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CRMPOSModal from './components/CRMPOSModal';
import ServiceDetailPage from './pages/ServiceDetailPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminCurrency from './pages/AdminCurrency';
import './App.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <LanguageProvider>
      <Router>
        <div className="App">
          <Routes>
          {/* Admin Routes - No Navbar/Footer */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/currency" element={<AdminCurrency />} />
          
          {/* Main Site Routes - With Navbar/Footer */}
          <Route path="/*" element={
            <>
              <Navbar onGetStarted={() => setIsModalOpen(true)} />
              <Routes>
                <Route path="/" element={
                  <>
                    <Hero onGetStarted={() => setIsModalOpen(true)} />
                    <Services />
                    <Features />
                    <Contact />
                  </>
                } />
                <Route path="/service/:id" element={<ServiceDetailPage />} />
              </Routes>
              <Footer />
              <CRMPOSModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            </>
          } />
        </Routes>
      </div>
    </Router>
    </LanguageProvider>
  );
}

export default App;
