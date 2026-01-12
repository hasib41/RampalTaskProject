import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  HomePage,
  TendersPage,
  CareersPage,
  NewsPage,
  ContactPage,
  AboutPage
} from './pages';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/tenders" element={<TendersPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Router>
  );
}

export default App;
