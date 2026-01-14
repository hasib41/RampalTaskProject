import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  HomePage,
  TendersPage,
  CareersPage,
  NewsPage,
  ContactPage,
  AboutPage,
  BoardPage,
  ProjectsPage,
  ProjectDetailPage,
  SustainabilityPage
} from './pages';
import {
  AdminLayout,
  AdminLogin,
  AdminDashboard,
  AdminNews,
  AdminTenders,
  AdminCareers,
  AdminMessages,
  AdminProjects,
  AdminBoard,
  AdminSustainability,
} from './pages/admin';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/about/board" element={<BoardPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:id" element={<ProjectDetailPage />} />
        <Route path="/sustainability" element={<SustainabilityPage />} />
        <Route path="/tenders" element={<TendersPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="news" element={<AdminNews />} />
          <Route path="tenders" element={<AdminTenders />} />
          <Route path="careers" element={<AdminCareers />} />
          <Route path="messages" element={<AdminMessages />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="board" element={<AdminBoard />} />
          <Route path="sustainability" element={<AdminSustainability />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
