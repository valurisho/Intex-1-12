import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminMoviePage from './pages/AdminMoviePage';
import HomePage from './pages/HomePage'; // Add this import
import PrivacyPolicy from './pages/PrivacyPolicy'; // Adjust the path if necessary
import MovieDetailPage from './pages/MovieDetailPage';
import AddMoviePage from './pages/AddMoviePage';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import EditMoviePage from './pages/EditMoviePage';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/AdminPage" element={<AdminMoviePage />} />
          <Route path="/mainPage" element={<MainPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/addMovie" element={<AddMoviePage />} />
          <Route path="/editMovie/:show_id" element={<EditMoviePage />} />
          <Route path="/movie/:id" element={<MovieDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          {/* <Route path="/about" element={} />
          <Route path="/contact" element={} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
