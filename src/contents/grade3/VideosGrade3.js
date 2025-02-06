// contents/grade3/VideosGrade3.js
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Modal } from 'react-bootstrap';

function VideosGrade3() {
  const [videosData, setVideosData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch(
          'https://raw.githubusercontent.com/workcompany177/trash/main/control/grade3/videos.json'
        );
        if (!res.ok) throw new Error('Failed to fetch videos');
        const data = await res.json();
        setVideosData(data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };
    fetchVideos();
  }, []);

  const handleOpenModal = (video) => {
    setSelectedVideo(video);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedVideo(null);
  };

  return (
    // غلاف بخلفية مستقلة
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
          فيديوهات الصف الثالث الثانوي
        </h2>

        <Row className="gy-4 justify-content-center">
          {videosData.slice().map((video, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3}>
              <Card
                style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
                onClick={() => handleOpenModal(video)}
              >
                <Card.Img
                  variant="top"
                  src={video.thumbnail}
                  alt="Video thumbnail"
                  style={{ borderRadius: '10%' }}
                />
              </Card>
            </Col>
          ))}
        </Row>

        {/* مودال الفيديو */}
        <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
          <Modal.Header closeButton />
          <Modal.Body>
            {selectedVideo && (
              <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                <iframe
                  title="Video Preview"
                  src={`https://drive.google.com/file/d/${selectedVideo.id}/preview`}
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

export default VideosGrade3;
