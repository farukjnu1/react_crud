// src/App.js
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Crud from './pages/Crud';
import Sale from './pages/Sale';
import SaleWebApi from './pages/SaleWebApi';

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> |{' '}
        <Link to="/about">About</Link> |{' '}
        <Link to="/contact">Contact</Link> |{' '}
        <Link to="/crud">CRUD</Link> |{' '}
        <Link to="/sale">Sale (JSON Server)</Link>|{' '}
        <Link to="/SaleWebApi">Sale (Web API)</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/crud" element={<Crud />} />
        <Route path="/sale" element={<Sale />} />
        <Route path="/SaleWebApi" element={<SaleWebApi />} />
        <Route path="*" element={<h2>404 - Page Not Found</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
