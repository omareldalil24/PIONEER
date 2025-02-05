// contents/grade1/HomeworkGrade1.js
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Modal } from 'react-bootstrap';

function HomeworkGrade1() {
  const [homeworkData, setHomeworkData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedHomework, setSelectedHomework] = useState(null);

  useEffect(() => {
    const fetchHomework = async () => {
      try {
        const res = await fetch(
          'https://raw.githubusercontent.com/workcompany177/trash/main/control/grade1/homework.json'
        );
        if (!res.ok) throw new Error('Failed to fetch homework');
        const data = await res.json();
        setHomeworkData(data);
      } catch (error) {
        console.error('Error fetching homework:', error);
      }
    };
    fetchHomework();
  }, []);

  const handleOpenModal = (hw) => {
    setSelectedHomework(hw);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedHomework(null);
  };

  return (
    // خلفية مخصصة
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #b21f1f, #b21f1f, #3a1c71)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      <Container style={{ direction: 'rtl', color: '#fff', paddingTop: '40px' }}>
        <h2 className="mb-4" style={{ textAlign: 'center' }}>
          واجبات الصف الأول الثانوي
        </h2>

        <Row className="gy-4 justify-content-center">
          {homeworkData.slice().map((hw, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3}>
              <Card
                style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
                onClick={() => handleOpenModal(hw)}
              >
                <Card.Img
                  variant="top"
                  src={hw.thumbnail}
                  alt="Homework thumbnail"
                  style={{ borderRadius: '10%' }}
                />
              </Card>
            </Col>
          ))}
        </Row>

        {/* مودال الواجب */}
        <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
          <Modal.Header closeButton />
          <Modal.Body>
            {selectedHomework && (
              <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                <iframe
                  title="Homework Preview"
                  src={`https://drive.google.com/file/d/${selectedHomework.id}/preview`}
                  frameBorder="0"
                  allowFullScreen
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                  }}
                />
                {/* Overlay */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: '60px',
                    height: '60px',
                    zIndex: 9999,
                    cursor: 'default',
                  }}
                />
              </div>
            )}
          </Modal.Body>
        </Modal>
      </Container>
    </div>
  );
}

export default HomeworkGrade1;
