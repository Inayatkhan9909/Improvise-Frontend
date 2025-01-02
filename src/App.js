import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignupPage from './features/auth/pages/SignupPage.tsx'
import LoginPage from './features/auth/pages/LoginPage.tsx'
import {UserContextProvider} from './features/Context/UserContextProvider.tsx'
import Navbar from './features/layout/Navbar.tsx'
import {HomePage} from './features/pages/HomePage.tsx'
import {ProfilePage} from './features/pages/ProfilePage.tsx'
import {CreateClassPage} from './features/instructor/pages/CreateClassPage.tsx'

function App() {
  return (
    <div className="App">
      <UserContextProvider>
       
      <Router>
      <Navbar/>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/signup" element={<SignupPage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/profile" element={<ProfilePage/>} />
          <Route path="/createclass" element={<CreateClassPage/>} />
        </Routes>
      </Router>
      </UserContextProvider>
    </div>
  );
}

export default App;
