import Navbar from './Navbar.tsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Services from './Services';
import About from './About';
import NotReal from './NotReal/NotReal.tsx';
import Create from './Create';
import NotFound from './NotFound';
import ServiceDetails from './ServiceDetails.tsx';

const App: React.FC = () => {
    const handleClick = (yo: string, e: React.MouseEvent<HTMLButtonElement>) => {
      console.log(yo + "  -  " + e.target);
  };
  return (
    <>
      <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home handleClick={handleClick} />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/create" element={<Create />} />
            <Route path="/notreal" element={<NotReal />} />
            <Route path="/services/:id" element={<ServiceDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>
    </>

      
  );
};

export default App;