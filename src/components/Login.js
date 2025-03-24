// TROUBLESHOOTING SCRIPT
// Run this in your console to debug the login issue

// Step 1: Check if usersData is being loaded correctly
console.log("Number of users loaded:", usersData ? usersData.length : 0);

// Step 2: Check if the specific user exists
const targetUsername = "khadijamohamed4003";
const targetPassword = "4511725048";
const foundUser = usersData.find(
  user => user.username === targetUsername
);

if (foundUser) {
  console.log("User found in database:", foundUser);
  console.log("Password matches:", foundUser.password === targetPassword);
} else {
  console.log("User not found in database");
  
  // Let's try to find similar usernames to check for typos
  const similarUsers = usersData.filter(
    user => user.username.includes("khadija") || user.username.includes("4003")
  );
  console.log("Similar users found:", similarUsers);
}

// Step 3: Test the getUserCode function
const getUserCode = (uname) => {
  const match = uname.match(/\d+/);
  const code = match ? parseInt(match[0], 10) : null;
  console.log(`Extracting code from ${uname}: ${code}`);
  return code;
};

const userCode = getUserCode(targetUsername);

// Step 4: Check where the user should be redirected
if (userCode >= 1001 && userCode <= 2000) {
  console.log("Should redirect to: /first-year");
} else if (userCode >= 2001 && userCode <= 3000) {
  console.log("Should redirect to: /second-year");
} else if (userCode >= 3001 && userCode <= 5000) {
  console.log("Should redirect to: /third-year");
} else {
  console.log("Code doesn't match any year range");
}

// FIXED LOGIN COMPONENT

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

  // IMPROVED getUserCode function
  const getUserCode = (uname) => {
    const match = uname.match(/\d+/);
    const code = match ? parseInt(match[0], 10) : null;
    console.log(`Extracted code ${code} from username ${uname}`); // Debug log
    return code;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Check for admin login
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

      // Check if usersData is loaded
      if (!usersData || usersData.length === 0) {
        console.log("No users data available"); // Debug log
        setError('لم يتم تحميل بيانات المستخدمين بعد. حاول مجددًا.');
        return;
      }

      console.log(`Searching for user: ${username}`); // Debug log
      console.log(`Total users available: ${usersData.length}`); // Debug log

      // Find user by username and password
      const foundUser = usersData.find(
        (user) => user.username === username && user.password === password
      );

      if (foundUser) {
        console.log("User found:", foundUser); // Debug log
        setCurrentUser(foundUser);
        localStorage.setItem('currentUser', JSON.stringify(foundUser));

        const userCode = getUserCode(foundUser.username);
        console.log(`User code: ${userCode}`); // Debug log

        // IMPORTANT: Make sure we actually have a code before trying to use it
        if (!userCode) {
          setError('لم يتم العثور على كود صالح في اسم المستخدم!');
          return;
        }

        console.log(`Checking code ${userCode} for redirection`); // Debug log
        
        // For debugging: Let's see exactly what path is being chosen
        if (userCode >= 1001 && userCode <= 2000) {
          console.log("Redirecting to first year");
          navigate('/first-year');
        } else if (userCode >= 2001 && userCode <= 3000) {
          console.log("Redirecting to second year");
          navigate('/second-year');
        } else if (userCode >= 3001 && userCode <= 5000) {
          console.log("Redirecting to third year");
          navigate('/third-year');
        } else {
          console.log("Code doesn't match any year range");
          setError(`الكود الخاص بك (${userCode}) غير موجود ضمن السنوات المحددة!`);
        }
      } else {
        // Check if username exists but password is wrong
        const userExists = usersData.find(user => user.username === username);
        if (userExists) {
          console.log("Username found but password incorrect"); // Debug log
          setError('كلمة المرور غير صحيحة!');
        } else {
          console.log("Username not found"); // Debug log
          setError('اسم المستخدم غير موجود!');
        }
      }
    } catch (err) {
      console.error("Login error:", err); // Debug log
      setError('حدث خطأ أثناء تسجيل الدخول. حاول مرة أخرى.');
    } finally {
      setIsLoading(false);
    }
  };

  // Load users data immediately when component mounts
  useEffect(() => {
    console.log("Fetching users data..."); // Debug log
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
