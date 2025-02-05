// FirstYear.js
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaWhatsapp, FaTelegram } from 'react-icons/fa';

function FirstYear() {
  const navigate = useNavigate();

  return (
    <>
      <Container style={{ direction: 'rtl', textAlign: 'right', color: '#fff' }} className="my-4">
        <h2 className="mb-4" style={{ textAlign: 'center', marginTop: '60px',fontWeight:'bold' }}>
          الصف الأول الثانوي
        </h2>

        <Row className="gy-4 justify-content-center">
          {/* بوكس الفيديوهات */}
          <Col xs={12} sm={6} md={5} lg={4}>
            <Card
              style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
              onClick={() => navigate('/first-year/videos')}
            >
              <Card.Img
                variant="top"
                src="ContentPages/videos.png"
                alt="بوكس الفيديوهات"
                style={{ borderRadius: '20px', background: 'transparent' }}
              />
            </Card>
          </Col>

          {/* بوكس الملفات */}
          <Col xs={12} sm={6} md={5} lg={4}>
            <Card
              style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
              onClick={() => navigate('/first-year/files')}
            >
              <Card.Img
                variant="top"
                src="ContentPages/files.png"
                alt="بوكس الملفات"
                style={{ borderRadius: '20px', background: 'transparent' }}
              />
            </Card>
          </Col>
        </Row>

        <Row className="gy-4 justify-content-center" style={{ marginTop: '20px' }}>
          {/* بوكس الواجبات */}
          <Col xs={12} sm={6} md={5} lg={4}>
            <Card
              style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
              onClick={() => navigate('/first-year/homework')}
            >
              <Card.Img
                variant="top"
                src="ContentPages/homework.png"
                alt="بوكس الواجبات"
                style={{ borderRadius: '20px', background: 'transparent' }}
              />
            </Card>
          </Col>

          {/* بوكس الامتحانات */}
          <Col xs={12} sm={6} md={5} lg={4}>
            <Card
              style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
              onClick={() => navigate('/first-year/exams')}
            >
              <Card.Img
                variant="top"
                src="ContentPages/exams.png"
                alt="بوكس الامتحانات"
                style={{ borderRadius: '20px', background: 'transparent' }}
              />
            </Card>
          </Col>
        </Row>
      </Container>

      {/* أيقونات واتساب وتيليجرام عائمة في أسفل يمين الصفحة */}
      <style>
        {`
          @keyframes floatIcon {
            0% { transform: translateY(0); }
            50% { transform: translateY(-6px); }
            100% { transform: translateY(0); }
          }
        `}
      </style>
      <div
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          zIndex: 9999,
        }}
      >
        <a
          href="https://wa.me/201062039393"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            width: '60px',
            height: '60px',
            backgroundColor: '#25D366',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: '30px',
            textDecoration: 'none',
            animation: 'floatIcon 2s ease-in-out infinite',
            transition: 'transform 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.15)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <FaWhatsapp />
        </a>

        <a
          href="https://t.me/201062039393"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            width: '60px',
            height: '60px',
            backgroundColor: '#0088cc',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: '30px',
            textDecoration: 'none',
            animation: 'floatIcon 2.2s ease-in-out infinite',
            transition: 'transform 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.15)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <FaTelegram />
        </a>
      </div>
    </>
  );
}

export default FirstYear;
