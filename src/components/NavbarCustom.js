// NavbarCustom.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import './NavbarCustom.css'; // تأكد من استيراد ملف CSS أو استخدمه للتخصيص الإضافي

import logo from '../assets/aa.png';   // مثال: شعار أول
import logo2 from '../assets/logo3.png'; // مثال: شعار ثاني

function NavbarCustom({ currentUser, setCurrentUser }) {
  // دالة تسجيل الخروج
  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser'); // إزالة بيانات المستخدم من التخزين المحلي
  };

  // نمط للبوردر الخاص بالصور
  const logoStyle = {
    width: '140px',
    height: 'auto',
    border: '3px solid #fff',      // لون وسمك الحد
    borderRadius: '10px',           // زوايا منحنية
    marginLeft: '10px',            // تباعد أفقي بين الصور
    marginTop: '10px',            // تباعد أفقي بين الصور
  };

  return (
    <Navbar className="navbar-custom mb-4" expand="lg">
      <Container>
        {/* الشعاران داخل عنصر واحد */}
        <Navbar.Brand as={Link} to="/login" style={{ display: 'flex', alignItems: 'center' }}>
          {/* الشعار الأول */}
          <img
            src={logo}
            alt="Logo"
            style={{
              width: '80px',
              height: 'auto',
              border: '3px solid #fff',
            }}
          />
          {/* الشعار الثاني */}
          <img
            src={logo2}
            alt="Second Logo"
            style={logoStyle}
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {currentUser ? (
              <>
                <span className="navbar-text me-3">
                  مرحباً {currentUser.username}
                </span>
                <Button variant="outline-danger" onClick={handleLogout}>
                  تسجيل الخروج
                </Button>
              </>
            ) : (
              <Button
                variant=""
                style={{ backgroundColor: '#D71313', color: '#fff', fontWeight: 'bold' }}
                as={Link}
                to="/login"
              >
                تسجيل الدخول
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarCustom;
