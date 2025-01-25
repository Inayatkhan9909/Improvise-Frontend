import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignupPage from './features/auth/pages/SignupPage.tsx';
import LoginPage from './features/auth/pages/LoginPage.tsx';
import { UserContextProvider } from './features/Context/user/UserContextProvider.tsx';
import { ClassContextProvider } from './features/Context/class/ClassContextProvider.tsx';
import { CourseContextProvider } from './features/Context/course/CourseContextProvider.tsx';
import Navbar from './features/layout/Navbar.tsx';
import Footer from './features/layout/Footer.tsx';
import { HomePage } from './features/pages/HomePage.tsx';
import { ProfilePage } from './features/pages/ProfilePage.tsx';
import { CreateClassPage } from './features/instructor/pages/CreateClassPage.tsx';
import { Unauthorized } from './features/pages/Unauthorized.tsx';
import { AlredyLoggedIn } from './features/pages/AlreadyLoggedIn.tsx';
import { PageNotFound } from './features/pages/PageNotFound.tsx';
import { CoursesPage } from './features/pages/CoursesPage.tsx'
import { AboutUs } from './features/pages/AboutUs.tsx'
import AuthRoutes from './features/routes/AuthRoutes.tsx';
import InstructorRoutes from './features/routes/InstructorRoutes.tsx';


function App() {
  return (
    <div className="App">
      <UserContextProvider>
        <ClassContextProvider>
          <CourseContextProvider>
            <Router>
              <Navbar />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/courses" element={<CoursesPage />} />
                <Route path="/about" element={<AboutUs />} />

                <Route element={<AuthRoutes />}>
                  <Route path="/signup" element={<SignupPage />} />
                  <Route path="/login" element={<LoginPage />} />
                </Route>

                <Route path="/profile" element={<ProfilePage />} />

                <Route element={<InstructorRoutes />}>
                  <Route path="/createclass" element={<CreateClassPage />} />
                </Route>

                <Route path="/unauthorized" element={<Unauthorized />} />
                <Route path="/alredyloggedin/:currentPath" element={<AlredyLoggedIn />} />
                <Route path="*" element={<PageNotFound/>} />
              </Routes>
              <Footer />
            </Router>
          </CourseContextProvider>
        </ClassContextProvider>
      </UserContextProvider>
    </div>
  );
}

export default App;
