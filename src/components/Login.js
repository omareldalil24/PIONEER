// Login.js - FIXED VERSION
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

import logo from '../assets/aa.png';

function Login({ setCurrentUser, usersData, setUsersData, fetchUsersFromGitHub }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // استخراج رقم المستخدم من الـ username
  const getUserCode = (uname) => {
    // نبحث عن أرقام في اسم المستخدم
    const match = uname.match(/\d+/);
    if (match) {
      // تحويل إلى رقم
      const code = parseInt(match[0], 10);
      console.log(`Username: ${uname}, Extracted code: ${code}`);
      return code;
    }
    console.log(`No code found in username: ${uname}`);
    return null;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
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
        console.log("No users data loaded");
        setError('لم يتم تحميل بيانات المستخدمين بعد. حاول مجددًا.');
        setIsLoading(false);
        return;
      }

      console.log(`Attempting login for user: ${username}`);
      console.log(`Total users in database: ${usersData.length}`);

      // البحث عن المستخدم
      const foundUser = usersData.find(
        (user) => user.username === username && user.password === password
      );

      if (foundUser) {
        console.log(`User authenticated: ${foundUser.username}`);
        setCurrentUser(foundUser);
        localStorage.setItem('currentUser', JSON.stringify(foundUser));

        // استخراج الكود من اسم المستخدم
        const userCode = getUserCode(foundUser.username);
        
        if (!userCode) {
          console.log("No valid code found in username");
          setError('لم يتم العثور على كود صالح في اسم المستخدم!');
          setIsLoading(false);
          return;
        }

        // توجيه المستخدم بناءً على الكود
        console.log(`Redirecting user with code ${userCode}`);
        
        if (userCode >= 1001 && userCode <= 2000) {
          console.log("Redirecting to first year");
          navigate('/first-year');
        } else if (userCode >= 2001 && userCode <= 3000) {
          console.log("Redirecting to second year");
          navigate('/second-year');
        } else if (userCode >= 3001 && userCode <= 5000) {
          // تأكيد أن هذا الشرط يشمل الكود 4001 إلى 5000
          console.log(`Redirecting to third year with code ${userCode}`);
          navigate('/third-year');
        } else {
          console.log(`Code ${userCode} doesn't match any year range`);
          setError(`الكود الخاص بك (${userCode}) غير موجود ضمن السنوات المحددة!`);
        }
      } else {
        // التحقق ما إذا كان المستخدم موجودًا لكن كلمة المرور خاطئة
        const userExists = usersData.find(user => user.username === username);
        if (userExists) {
          console.log("Username exists but password is incorrect");
          setError('كلمة المرور غير صحيحة!');
        } else {
          console.log("Username not found in database");
          setError('اسم المستخدم غير موجود!');
        }
      }
    } catch (err) {
      console.error("Login error:", err);
      setError('حدث خطأ أثناء تسجيل الدخول. حاول مرة أخرى.');
    } finally {
      setIsLoading(false);
    }
  };

  // جلب بيانات المستخدمين (مرة واحدة عند التحميل)
  useEffect(() => {
    console.log("Fetching users data...");
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
      }}
    >
      <Row className="justify-content-center" style={{ width: '100%' }}>
        <Col xs={12} sm={8} md={6} lg={4}>
          <Card
            className="shadow"
            style={{
              borderRadius: '20px',
              border: 'none',
              background: 'rgba(255, 255, 255, 0.6)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
              color: '#333',
            }}
          >
            <Card.Body>
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <img
                  src={logo}
                  alt="Logo"
                  style={{ width: '150px', height: 'auto' }}
                />
              </div>

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
                  disabled={isLoading}
                  style={{
                    backgroundColor: '#000',
                    border: 'none',
                    fontWeight: 'bold',
                  }}
                >
                  {isLoading ? 'جاري تسجيل الدخول...' : 'دخول'}
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
