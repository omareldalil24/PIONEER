// App.js
import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavbarCustom from './components/NavbarCustom';
import Login from './components/Login';
import FirstYear from './components/FirstYear';
import SecondYear from './components/SecondYear';
import ThirdYear from './components/ThirdYear';
import AdminDashboard from './components/AdminDashboard';
import Starting from './components/Starting';
import Box1 from './components/Box1';
import Box2 from './components/Box2';
import Box3 from './components/Box3';
import Box4 from './components/Box4';

// المكوّنات الجديدة الخاصة بمحتوى الصف الأول
import VideosGrade1 from './contents/grade1/VideosGrade1';
import FilesGrade1 from './contents/grade1/FilesGrade1';
import HomeworkGrade1 from './contents/grade1/HomeworkGrade1';
import ExamsGrade1 from './contents/grade1/ExamsGrade1';

// المكوّنات الجديدة الخاصة بمحتوى الصف الثاني
import VideosGrade2 from './contents/grade2/VideosGrade2';
import FilesGrade2 from './contents/grade2/FilesGrade2';
import HomeworkGrade2 from './contents/grade2/HomeworkGrade2';
import ExamsGrade2 from './contents/grade2/ExamsGrade2';

// المكوّنات الجديدة الخاصة بمحتوى الصف الثالث
import VideosGrade3 from './contents/grade3/VideosGrade3';
import FilesGrade3 from './contents/grade3/FilesGrade3';
import HomeworkGrade3 from './contents/grade3/HomeworkGrade3';
import ExamsGrade3 from './contents/grade3/ExamsGrade3';

// استيراد مكوّنات الأدمن للصفوف الثلاثة
import AdminFirstYear from './components/AdminFirstYear';
import AdminSecondYear from './components/AdminSecondYear';
import AdminThirdYear from './components/AdminThirdYear';
import './index.css'; // يمكنك إنشاء ملف index.css إن أردت

const RAW_JSON_URL = "https://raw.githubusercontent.com/workcompany177/trash/main/control/userData.json";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [usersData, setUsersData] = useState([]);

  // دالة لاستخراج كود المستخدم من الـ username
  const getUserCode = (username) => {
    const match = username?.match(/\d+/);
    return match ? parseInt(match[0], 10) : null;
  };

  // دالة لتحديد المسار الصحيح بناءً على الكود
  const getRedirectPathForUser = (user) => {
    if (!user) return '/login';
    
    if (user.isAdmin) return '/admin-dashboard';
    
    const code = getUserCode(user.username);
    if (code >= 1001 && code <= 2000) return '/first-year';
    if (code >= 2001 && code <= 3000) return '/second-year';
    if ((code >= 3001 && code <= 4000) || (code >= 4001 && code <= 5000)) return '/third-year';
    
    return '/login';
  };

  // جلب بيانات المستخدمين
  const fetchUsersFromGitHub = useCallback(async () => {
    try {
      const response = await fetch(RAW_JSON_URL);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setUsersData(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, []);

  // قراءة currentUser من LocalStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setLoadingUser(false);
    
    // تحميل بيانات المستخدمين
    fetchUsersFromGitHub();
  }, [fetchUsersFromGitHub]);

  // التحقق من أي سنة ينتمي إليها المستخدم
  const isFirstYear = () => {
    if (!currentUser || currentUser.isAdmin) return false;
    const code = getUserCode(currentUser.username);
    return code >= 1001 && code <= 2000;
  };
  const isSecondYear = () => {
    if (!currentUser || currentUser.isAdmin) return false;
    const code = getUserCode(currentUser.username);
    return code >= 2001 && code <= 3000;
  };
  const isThirdYear = () => {
    if (!currentUser || currentUser.isAdmin) return false;
    const code = getUserCode(currentUser.username);
    return (code >= 3001 && code <= 4000) || (code >= 4001 && code <= 5000);
  };

  // مكوّن حماية للسنوات (للطلاب)
  function ProtectedRoute({ children, allowedCheck }) {
    if (loadingUser) {
      return <div className="text-center p-5">جاري التحميل...</div>;
    }
    if (!currentUser || !allowedCheck()) {
      return <Navigate to="/login" replace />;
    }
    return children;
  }

  // مكوّن حماية للأدمن
  function AdminProtectedRoute({ children }) {
    if (loadingUser) {
      return <div className="text-center p-5">جاري التحميل...</div>;
    }
    if (!currentUser || !currentUser.isAdmin) {
      return <Navigate to="/login" replace />;
    }
    return children;
  }

  return (
    <Router>
      {/* إخفاء النافبار في صفحة تسجيل الدخول فقط */}
      {window.location.pathname !== '/login' && (
        <NavbarCustom currentUser={currentUser} setCurrentUser={setCurrentUser} />
      )}

      <Routes>
        {/* الصفحة الرئيسية تفحص حالة المستخدم */}
        <Route path="/" element={
          loadingUser ? (
            <div className="text-center p-5">جاري التحميل...</div>
          ) : currentUser ? (
            <Navigate to={getRedirectPathForUser(currentUser)} replace />
          ) : (
            <Navigate to="/starting" replace />
          )
        } />
        
        {/* صفحة البداية - نعرضها للمستخدمين غير المسجلين */}
        <Route path="/starting" element={<Starting />} />
        
        <Route
          path="/login"
          element={
            <Login
              setCurrentUser={setCurrentUser}
              usersData={usersData}
              setUsersData={setUsersData}
              fetchUsersFromGitHub={fetchUsersFromGitHub}
            />
          }
        />

        {/* مسارات الصفوف (محميّة) */}
        <Route
          path="/first-year"
          element={
            <ProtectedRoute allowedCheck={isFirstYear}>
              <FirstYear />
            </ProtectedRoute>
          }
        />
        <Route
          path="/second-year"
          element={
            <ProtectedRoute allowedCheck={isSecondYear}>
              <SecondYear />
            </ProtectedRoute>
          }
        />
        <Route
          path="/third-year"
          element={
            <ProtectedRoute allowedCheck={isThirdYear}>
              <ThirdYear />
            </ProtectedRoute>
          }
        />

        {/* الصف الأول - صفحات فرعية (محميّة لنفس الطلاب) */}
        <Route
          path="/first-year/videos"
          element={
            <ProtectedRoute allowedCheck={isFirstYear}>
              <VideosGrade1 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/first-year/files"
          element={
            <ProtectedRoute allowedCheck={isFirstYear}>
              <FilesGrade1 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/first-year/homework"
          element={
            <ProtectedRoute allowedCheck={isFirstYear}>
              <HomeworkGrade1 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/first-year/exams"
          element={
            <ProtectedRoute allowedCheck={isFirstYear}>
              <ExamsGrade1 />
            </ProtectedRoute>
          }
        />

        {/* الصف الثاني - صفحات فرعية */}
        <Route
          path="/second-year/videos"
          element={
            <ProtectedRoute allowedCheck={isSecondYear}>
              <VideosGrade2 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/second-year/files"
          element={
            <ProtectedRoute allowedCheck={isSecondYear}>
              <FilesGrade2 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/second-year/homework"
          element={
            <ProtectedRoute allowedCheck={isSecondYear}>
              <HomeworkGrade2 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/second-year/exams"
          element={
            <ProtectedRoute allowedCheck={isSecondYear}>
              <ExamsGrade2 />
            </ProtectedRoute>
          }
        />

        {/* الصف الثالث - صفحات فرعية */}
        <Route
          path="/third-year/videos"
          element={
            <ProtectedRoute allowedCheck={isThirdYear}>
              <VideosGrade3 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/third-year/files"
          element={
            <ProtectedRoute allowedCheck={isThirdYear}>
              <FilesGrade3 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/third-year/homework"
          element={
            <ProtectedRoute allowedCheck={isThirdYear}>
              <HomeworkGrade3 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/third-year/exams"
          element={
            <ProtectedRoute allowedCheck={isThirdYear}>
              <ExamsGrade3 />
            </ProtectedRoute>
          }
        />

        {/* لوحة تحكم الأدمن */}
        <Route
          path="/admin-dashboard"
          element={
            <AdminProtectedRoute>
              <AdminDashboard
                fetchUsersFromGitHub={fetchUsersFromGitHub}
                currentUser={currentUser}
                usersData={usersData}
                setUsersData={setUsersData}
              />
            </AdminProtectedRoute>
          }
        />

        {/* مسارات صفحات الأدمن للصفوف */}
        <Route
          path="/admin-first-year"
          element={
            <AdminProtectedRoute>
              <AdminFirstYear />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin-second-year"
          element={
            <AdminProtectedRoute>
              <AdminSecondYear />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin-third-year"
          element={
            <AdminProtectedRoute>
              <AdminThirdYear />
            </AdminProtectedRoute>
          }
        />

        {/* بقية الروابط (Box*) */}
        <Route path="/box1" element={<Box1 />} />
        <Route path="/box2" element={<Box2 />} />
        <Route path="/box3" element={<Box3 />} />
        <Route path="/box4" element={<Box4 />} />

        {/* أي مسار غير معروف */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
