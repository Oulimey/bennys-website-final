import React, { useEffect } from 'react';

// Components
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

// Containers
import Header from './containers/Header/Header';
import About from './containers/About/About';
import Menu from './containers/Menu/Menu';
import Gallery from './containers/Gallery/Gallery';
import Ambiance from './containers/Ambiance/Ambiance';
import Testimonials from './containers/Testimonials/Testimonials';
import Contact from './containers/Contact/Contact';

// Styles
import './App.css';

function App() {
  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="app">
      <Navbar />
      <main>
        <Header />
        <About />
        <Menu />
        <Gallery />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
