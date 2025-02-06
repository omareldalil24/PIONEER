// FirstYear.js
import React, { useState } from 'react';
import { Container, Row, Col, Card, Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';

function FirstYear() {
  const navigate = useNavigate();
  // حالة (State) للتحكم في ظهور مودال الأرقام
  const [showNumbers, setShowNumbers] = useState(false);

  // الأرقام الثلاثة المطلوب عرضها
  const whatsappNumbers = [
    '01508833552',
    '01508833122',
    '01551013615',
  ];
  return (
    <>
      <Container style={{ direction: 'rtl', textAlign: 'right', color: '#fff' }} className="my-4">
        <h2 className="mb-4" style={{ textAlign: 'center', marginTop: '60px', fontWeight: 'bold' }}>
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

      {/* شيفرة الـ animation الخاصة بالأيقونات */}
      <style>
        {`
                @keyframes floatIcon {
                  0% { transform: translateY(0); }
                  50% { transform: translateY(-6px); }
                  100% { transform: translateY(0); }
                }
              `}
      </style>

      {/* أيقونة واتساب عائمة واحدة */}
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
        <div
          onClick={() => setShowNumbers(true)}
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
            cursor: 'pointer',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.15)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <FaWhatsapp />
        </div>
      </div>

      {/* مودال لاختيار أحد الأرقام الثلاثة */}
      <Modal show={showNumbers} onHide={() => setShowNumbers(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>أرقام واتساب</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {whatsappNumbers.map((number) => (
            <div key={number} style={{ marginBottom: '10px' }}>
              <Button
                variant="success"
                style={{ width: '100%' }}
                onClick={() => window.open(`https://wa.me/${number}`, '_blank')}
              >
                تواصل على واتساب: {number}
              </Button>
            </div>
          ))}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default FirstYear;
