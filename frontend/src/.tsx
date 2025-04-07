import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" />
          {/* <Route path="/about" element={} />
          <Route path="/contact" element={} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
