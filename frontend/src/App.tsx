import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminMoviePage from './pages/AdminMoviePage';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/AdminPage" element={<AdminMoviePage />} />
          {/* <Route path="/about" element={} />
          <Route path="/contact" element={} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
