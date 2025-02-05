// Box2.js
import React, { useState } from 'react';
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import { FaWhatsapp, FaTelegram } from 'react-icons/fa';

function Box2() {
  const [showBox2SubModal, setShowBox2SubModal] = useState(false);
  const [showBox2Player, setShowBox2Player] = useState(false);
  const [Box2PlayerId, setBox2PlayerId] = useState(null);

  const handleOpenBox2SubModal = () => setShowBox2SubModal(true);
  const handleCloseBox2SubModal = () => setShowBox2SubModal(false);

  const handleOpenBox2Player = (driveId) => {
    setBox2PlayerId(driveId);
    setShowBox2Player(true);
  };
  const handleCloseBox2Player = () => {
    setBox2PlayerId(null);
    setShowBox2Player(false);
  };

  // (1) دالة لعرض أزرار الفيديو/الملف في المودال (احتفظ بها إن كنت ستستخدمها مستقبلاً)
  const renderVideoFileButtons = (onSelectDriveId, { videoId, fileId }) => {
    return (
      <div style={{ textAlign: 'center' }}>
        <p>اختر أحد الخيارين:</p>
        <Button
          variant="primary"
          style={{ margin: '10px' }}
          onClick={() => onSelectDriveId(videoId)}
        >
          فيديو
        </Button>
        <Button
          variant="success"
          style={{ margin: '10px' }}
          onClick={() => onSelectDriveId(fileId)}
        >
          ملف
        </Button>
      </div>
    );
  };

  // (2) دالة عرض المودال مع الـ iframe لعرض الفيديو/الملف
  const renderIframeModal = (show, onClose, driveId) => {
    return (
      <Modal show={show} onHide={onClose} centered size="lg">
        <Modal.Header closeButton />
        <Modal.Body>
          {driveId && (
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
              <iframe
                title="Drive Preview"
                src={`https://drive.google.com/file/d/${driveId}/preview`}
                frameBorder="0"
                allow="autoplay; encrypted-media"
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
    );
  };

  // (3) تعليمات الاشتراك مع التأثير الزجاجي
  const renderSubscriptionInstructions = () => {
    return (
      <>
        <div
          style={{
            marginTop: '20px',
            padding: '10px',
            borderRadius: '10px',
            maxWidth: '630px',
            margin: '20px auto',
            background: 'rgba(255, 255, 255, 0.6)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
          }}
        >
          <h5
            style={{
              marginBottom: '10px',
              textAlign: 'center',
              color: '#03346E',
              fontWeight: 'bold',
            }}
          >
            كيفية الاشتراك :
          </h5>
          <div style={{ textAlign: 'right', direction: 'rtl' }}>
            <ol style={{ paddingRight: '20px', color: '#000', fontWeight: 'bold' }}>
              <li>قم بالدفع عن طريق فوادفون كاش على الرقم (01027453008)</li>
              <li>قم بارسال صورة التحويل على رقم الواتساب 01062039393</li>
              <li>ثم ارسل مع صورة التحويل بياناتك (اسمك، العام الدراسي، المدرسة، رقم للتواصل)</li>
              <li>بعد ذلك سيتم إرسال اسم المستخدم وكلمة السر الخاصة بك</li>
            </ol>
          </div>
        </div>
        <p style={{ color: '#fff', textAlign: 'center' }}>
          اذا كنت مشترك بالفعل قم بتسجيل الدخول من هنا{' '}
          <Button
            onClick={() => (window.location.href = '/login')}
            style={{
              backgroundColor: '#fff',
              border: 'none',
              color: '#000',
              fontWeight: 'bold',
            }}
            className="b1 mt-2 mt-md-0"
          >
            تسجيل الدخول
          </Button>
        </p>
      </>
    );
  };

  // (4) دالة عرض صورة ثابتة واحدة (بدلاً من صورتين) + تعليمات الاشتراك
  const renderStaticImageWithInstructions = (staticImg) => {
    return (
      <>
        <Row
          className="justify-content-center g-2"
          style={{
            marginTop: '20px',
            maxWidth: '450px', // اضبط العرض كما يناسبك
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          <Col xs={12} style={{ textAlign: 'center' }}>
            <img
              src={staticImg}
              alt="Static"
              style={{
                width: '100%',
                border: '5px dotted #fff',
                borderRadius: '15px',
              }}
            />
          </Col>
        </Row>
        {renderSubscriptionInstructions()}
      </>
    );
  };

  return (
    <>
      <Container
        fluid
        style={{
          minHeight: '100vh',
          color: '#fff',
          direction: 'rtl',
          marginTop: '10px',
          paddingTop: '20px',
          textAlign: 'center',
        }}
      >
        {/* نعرض صورة واحدة فقط "static1.jpg" */}
        {renderStaticImageWithInstructions('static/static1.png')}

        {/* إذا أردت استخدام المودال للفيديو/الملف، احتفظ بهذا المودال */}
        <Modal
          show={showBox2SubModal}
          onHide={handleCloseBox2SubModal}
          centered
          size="md"
        >
          <Modal.Header closeButton>
            <Modal.Title>اختر الفيديو أو الملف</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {renderVideoFileButtons(
              (driveId) => {
                handleCloseBox2SubModal();
                handleOpenBox2Player(driveId);
              },
              {
                videoId: 'VIDEO_3_ID_UNIQUE', // ضع المعرف المناسب
                fileId: 'FILE_3_ID_UNIQUE',   // ضع المعرف المناسب
              }
            )}
          </Modal.Body>
        </Modal>

        {renderIframeModal(showBox2Player, handleCloseBox2Player, Box2PlayerId)}
      </Container>

      {/* إضافة keyframes للأنيميشن */}
      <style>
        {`
          @keyframes floatIcon {
            0% { transform: translateY(0); }
            50% { transform: translateY(-6px); }
            100% { transform: translateY(0); }
          }
        `}
      </style>

      {/* أيقونات واتساب وتيليجرام عائمة */}
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
        {/* أيقونة واتساب */}
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

        {/* أيقونة تيليجرام */}
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

export default Box2;
