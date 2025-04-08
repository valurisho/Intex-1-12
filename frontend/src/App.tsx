import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminMoviePage from './pages/AdminMoviePage';
import MainPage from './pages/mainPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import MovieDetailPage from './pages/MovieDetailPage';
import AddMoviePage from './pages/AddMoviePage';

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* <Route path="/" element={<HomePage />} /> */}
          <Route path="/AdminPage" element={<AdminMoviePage />} />
          <Route path="/mainPage" element={<MainPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/addMovie" element={<AddMoviePage />} />
          <Route path="/movie/:id" element={<MovieDetailPage />} />
          {/* <Route path="/about" element={} />
          <Route path="/contact" element={} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
