// Starting.js
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaWhatsapp, FaTelegram } from 'react-icons/fa';

const advertisment_URL =
  'https://raw.githubusercontent.com/workcompany177/trash/main/advertisment/advertisment.json';


function Starting() {
  const navigate = useNavigate();

  const [adData, setAdData] = useState([]);
  const [showAdModal, setShowAdModal] = useState(false);

  useEffect(() => {
    async function fetchAd() {
      try {
        const res = await fetch(advertisment_URL);
        if (!res.ok) throw new Error('Failed to fetch advertisment data');
        const data = await res.json();
        setAdData(data);
      } catch (err) {
        console.error('Error fetching advertisment:', err);
      }
    }
    fetchAd();
  }, []);

  useEffect(() => {
    if (adData && adData.length > 0) {
      setShowAdModal(true);
    }
  }, [adData]);

  return (
    <>
      {/* مودال إعلان */}
      <Modal show={showAdModal} onHide={() => setShowAdModal(false)} centered size="md">
        <Modal.Header closeButton>
          <Modal.Title>إعلان</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: 'center' }}>
          {adData && adData[0] && (
            <img
              src={adData[0].thumbnail}
              alt="إعلان"
              style={{ maxWidth: '100%', borderRadius: '10px' }}
            />
          )}
        </Modal.Body>
      </Modal>

      <Container
        fluid
        style={{
          minHeight: '100vh',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          direction: 'rtl',
          marginTop: '10px',
        }}
      >
        <Row
          className="gy-4 gx-5 justify-content-center"
          style={{ marginTop: '10px' }}
        >
          {/* بوكس الثاني */}
          <Col xs={12} sm={6} md={5} lg={4} style={{ textAlign: 'center' }}>
            <img
              src="Boxes/box2.png"
              alt="box2"
              style={{
                width: '90%',
                border: '4px dotted #fff',
                borderRadius: '15px',
                cursor: 'pointer',
              }}
              onClick={() => navigate('/box2')}
            />
          </Col>
        </Row>

        <Row
          className="gy-4 gx-4 justify-content-center"
          style={{ marginTop: '10px' }}
        >
          {/* بوكس الثالث */}
          <Col
            xs={12}
            sm={6}
            md={5}
            lg={4}
            style={{ textAlign: 'center' }}
          >
            <img
              src="Boxes/box3.jpg"
              alt="box3"
              style={{
                width: '90%',
                border: '4px dotted #fff',
                borderRadius: '15px',
                cursor: 'pointer',
              }}
              onClick={() => navigate('/box3')}
            />
          </Col>

          {/* بوكس الرابع */}
          <Col
            xs={12}
            sm={6}
            md={5}
            lg={4}
            style={{ textAlign: 'center' }}
          >
            <img
              src="Boxes/box4.jpg"
              alt="box4"
              style={{
                width: '90%',
                border: '4px dotted #fff',
                borderRadius: '15px',
                cursor: 'pointer',
              }}
              onClick={() => navigate('/box4')}
            />
          </Col>
        </Row>

      </Container>
      {/* Inline keyframes for floating animation */}
      <style>
        {`
          @keyframes floatIcon {
            0%   { transform: translateY(0); }
            50%  { transform: translateY(-6px); }
            100% { transform: translateY(0); }
          }
        `}
      </style>

      {/* WhatsApp & Telegram floating icons */}
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
        {/* WhatsApp icon */}
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

        {/* Telegram icon */}
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

export default Starting;
