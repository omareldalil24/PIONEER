// Login.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

import logo from '../assets/aa.png'; // تأكد من صحة مسار الصورة

function Login({ setCurrentUser, usersData, setUsersData, fetchUsersFromGitHub }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  // استخراج رقم المستخدم من الـ username
  const getUserCode = (uname) => {
    const match = uname.match(/\d+/);
    return match ? parseInt(match[0], 10) : null;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // حالة الأدمن
    if (
      username === 'rabea$#@@admin.dashboard' &&
      password === 'admin$#@galaldashboard'
    ) {
      const adminUser = { username, isAdmin: true };
      setCurrentUser(adminUser);
      localStorage.setItem('currentUser', JSON.stringify(adminUser));
      navigate('/admin-dashboard');
      return;
    }

    // إذا لم يكن أدمن => ابحث في usersData
    if (!usersData || usersData.length === 0) {
      setError('لم يتم تحميل بيانات المستخدمين بعد. حاول مجددًا.');
      return;
    }

    const foundUser = usersData.find(
      (user) => user.username === username && user.password === password
    );

    if (foundUser) {
      setCurrentUser(foundUser);
      localStorage.setItem('currentUser', JSON.stringify(foundUser));

      const userCode = getUserCode(foundUser.username);
      if (userCode >= 1001 && userCode <= 2000) {
        navigate('/first-year');
      } else if (userCode >= 2001 && userCode <= 3000) {
        navigate('/second-year');
      } else if (userCode >= 3001 && userCode <= 4000) {
        navigate('/third-year');
      } else {
        setError('الكود الخاص بك غير موجود ضمن السنوات المحددة!');
      }
    } else {
      setError('اسم المستخدم أو كلمة المرور غير صحيحة!');
    }
  };

  // جلب بيانات المستخدمين (مرة واحدة عند التحميل)
  useEffect(() => {
    fetchUsersFromGitHub();
  }, [fetchUsersFromGitHub]);

  return (
    <Container
      fluid
      style={{
        direction: 'rtl',
        textAlign: 'right',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        /* يمكنك وضع خلفية متدرجة هنا إن أردت */
      }}
    >
      <Row className="justify-content-center" style={{ width: '100%' }}>
        <Col xs={12} sm={8} md={6} lg={4}>
          <Card
            className="shadow"
            style={{
              borderRadius: '20px',
              border: 'none',
              background: 'rgba(255, 255, 255, 0.6)', // خلفية شفافة
              backdropFilter: 'blur(10px)',            // تأثير الزجاج
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)', // ظل ناعم
              color: '#333',
            }}
          >
            <Card.Body>
              {/* اللوجو في الأعلى */}
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <img
                  src={logo}
                  alt="Logo"
                  style={{ width: '150px', height: 'auto' }}
                />
              </div>

              {/* تم إزالة عنوان "تسجيل الدخول" */}
              {error && <div className="alert alert-danger">{error}</div>}

              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label style={{ fontWeight: '500' }}>اسم المستخدم :</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="أدخل اسم المستخدم"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    style={{ textAlign: 'right' }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label style={{ fontWeight: '500' }}>كلمة المرور :</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="أدخل كلمة المرور"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ textAlign: 'right' }}
                  />
                </Form.Group>

                <Button
                  type="submit"
                  className="w-100"
                  style={{
                    backgroundColor: '#000',
                    border: 'none',
                    fontWeight: 'bold',
                  }}
                >
                  دخول
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
