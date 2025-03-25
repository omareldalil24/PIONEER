import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Modal } from 'react-bootstrap';

function HomeworkGrade3() {
  const [homeworkData, setHomeworkData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedHomework, setSelectedHomework] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const fetchHomework = async () => {
      try {
        const res = await fetch(
          'https://raw.githubusercontent.com/workcompany177/trash/main/control/grade3/homework.json'
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
    setIsFullScreen(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedHomework(null);
    setIsFullScreen(false);
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
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
          واجبات الصف الثالث الثانوي
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
        <Modal 
          show={showModal} 
          onHide={handleCloseModal} 
          centered 
          size={isFullScreen ? "xl" : "lg"}
          fullscreen={isFullScreen}
          className={isFullScreen ? "fullscreen-modal" : ""}
        >
          <Modal.Header closeButton>
            {selectedHomework && (
              <button
                onClick={toggleFullScreen}
                className="btn"
                style={{
                  border: '1px solid rgba(0,0,0,0.1)',
                  background: 'rgba(255,255,255,0.9)',
                  fontSize: '1.2rem',
                  position: 'absolute',
                  left: '15px',
                  top: '10px',
                  zIndex: 9999,
                  padding: '5px 10px',
                  borderRadius: '4px',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                title={isFullScreen ? "إغلاق العرض الكامل" : "عرض كامل الشاشة"}
              >
                {isFullScreen ? (
                  <i className="fas fa-compress" style={{ color: '#3a1c71' }}></i>
                ) : (
                  <i className="fas fa-expand" style={{ color: '#b21f1f' }}></i>
                )}
              </button>
            )}
          </Modal.Header>
          <Modal.Body style={{ padding: isFullScreen ? '0' : undefined }}>
            {selectedHomework && (
              <div style={{ 
                position: 'relative', 
                paddingBottom: isFullScreen ? '95vh' : '56.25%', 
                height: 0 
              }}>
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

export default HomeworkGrade3;
