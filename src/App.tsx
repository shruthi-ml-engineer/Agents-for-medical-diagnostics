import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Upload from './components/Upload';
import Demo from './components/Demo';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-black text-white font-inter">
      <div className="medical-grid min-h-screen">
        <Header />
        <Hero />
        <Features />
        <HowItWorks />
        <Upload />
        <Demo />
        <Footer />
      </div>
    </div>
  );
}

export default App;