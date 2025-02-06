// Box4.js
import React, { useState } from 'react';
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import { FaWhatsapp } from 'react-icons/fa';

function Box4() {
  // حالات (State) خاصة بالـ Modal الخاص بالفيديو/الملف
  const [showBox4SubModal, setShowBox4SubModal] = useState(false);
  const [showBox4Player, setShowBox4Player] = useState(false);
  const [box4PlayerId, setBox4PlayerId] = useState(null);

  // لإظهار/إخفاء مودال أرقام الواتساب
  const [showNumbers, setShowNumbers] = useState(false);

  // أرقام الواتساب الثلاثة
  const whatsappNumbers = [
    '+201508833552',
    '+201508833122',
    '+201551013615',
  ];

  const handleOpenBox4SubModal = () => setShowBox4SubModal(true);
  const handleCloseBox4SubModal = () => setShowBox4SubModal(false);

  const handleOpenBox4Player = (driveId) => {
    setBox4PlayerId(driveId);
    setShowBox4Player(true);
  };
  const handleCloseBox4Player = () => {
    setBox4PlayerId(null);
    setShowBox4Player(false);
  };

  // (1) إن احتجت مستقبلاً لزرّي فيديو/ملف
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

  // (2) دالة عرض Iframe ضمن مودال (للفيديو/الملف) إن احتجته
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
            </div>
          )}
        </Modal.Body>
      </Modal>
    );
  };

  // (3) تعليمات الاشتراك (Glassy Box)
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
              <li>
                {/* السطر الأول: فودافون كاش */}
                يمكنكم الدفع عن طريق:
                <br />
                <img
                  src="/icons/vodafone.png"
                  alt="Vodafone Cash Icon"
                  style={{
                    width: '40px',
                    verticalAlign: 'middle',
                    marginRight: '0px',
                  }}
                />
                فودافون كاش (<strong>01505426422</strong>)
                <br />

                {/* السطر الثاني: إنستا باي */}
                أو عن طريق:
                <br />
                <img
                  src="/icons/instapay.png"
                  alt="InstaPay Icon"
                  style={{
                    width: '30px',
                    verticalAlign: 'middle',
                    backgroundColor: '#fff', // خلفية بيضاء
                    borderRadius: '5px',
                    padding: '0px',
                    marginRight: '4px',
                  }}
                />
                {" "}إنستا باي (<strong>01060700430</strong>)
              </li>

              <li>
                قم بإرسال صورة التحويل على أحد أرقام الواتساب الحالية:
                <ul style={{ marginTop: '5px', listStyleType: 'none', padding: 0 }}>
                  <li><strong>01508833552</strong></li>
                  <li><strong>01508833122</strong></li>
                  <li><strong>01551013615</strong></li>
                </ul>
              </li>

              <li>
                ثم أرسل مع صورة التحويل بياناتك (اسمك، العام الدراسي، المدرسة، رقم للتواصل)
              </li>

              <li>
                بعد ذلك سيتم إرسال اسم المستخدم وكلمة السر الخاصة بك
              </li>
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

  // (4) دالة تعرض صورة ثابتة واحدة + تعليمات الاشتراك
  const renderStaticImageWithInstructions = (staticImg) => {
    return (
      <>
        <Row
          className="justify-content-center g-2"
          style={{
            marginTop: '20px',
            maxWidth: '450px',
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

  // (5) الواجهة الأساسية
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
        {/* نعرض صورة ثابتة واحدة فقط (بدلاً من صورتين) */}
        {renderStaticImageWithInstructions('static/static3.gif')}

        {/* مودال الفيديو/الملف (إذا احتجته مستقبلاً) */}
        <Modal show={showBox4SubModal} onHide={handleCloseBox4SubModal} centered size="md">
          <Modal.Header closeButton>
            <Modal.Title>اختر الفيديو أو الملف</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {renderVideoFileButtons(
              (driveId) => {
                handleCloseBox4SubModal();
                handleOpenBox4Player(driveId);
              },
              {
                videoId: 'VIDEO_4_ID_UNIQUE', // ضع المعرف المناسب
                fileId: 'FILE_4_ID_UNIQUE',   // ضع المعرف المناسب
              }
            )}
          </Modal.Body>
        </Modal>

        {renderIframeModal(showBox4Player, handleCloseBox4Player, box4PlayerId)}
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

      {/* استبدال أيقونة تليجرام وجعل أيقونة واتساب تفتح مودال الأرقام */}
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
        {/* أيقونة واتساب واحدة */}
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

      {/* مودال اختيار أرقام الواتساب */}
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

export default Box4;
