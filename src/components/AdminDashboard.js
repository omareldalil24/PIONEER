import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Form, Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

// ===================== (1) روابط RAW (للجلب كقراءة) =====================
const RAW_URLS = {
  // (أ) المستخدمين
  users: 'https://raw.githubusercontent.com/workcompany177/trash/main/control/userData.json',

  // (ب) الصف الأول (grade1)
  videos1: 'https://raw.githubusercontent.com/workcompany177/trash/main/control/grade1/videos.json',
  files1: 'https://raw.githubusercontent.com/workcompany177/trash/main/control/grade1/files.json',
  homework1: 'https://raw.githubusercontent.com/workcompany177/trash/main/control/grade1/homework.json',
  exams1: 'https://raw.githubusercontent.com/workcompany177/trash/main/control/grade1/exams.json',

  // (ج) الصف الثاني (grade2)
  videos2: 'https://raw.githubusercontent.com/workcompany177/trash/main/control/grade2/videos.json',
  files2: 'https://raw.githubusercontent.com/workcompany177/trash/main/control/grade2/files.json',
  homework2: 'https://raw.githubusercontent.com/workcompany177/trash/main/control/grade2/homework.json',
  exams2: 'https://raw.githubusercontent.com/workcompany177/trash/main/control/grade2/exams.json',

  // (د) الصف الثالث (grade3)
  videos3: 'https://raw.githubusercontent.com/workcompany177/trash/main/control/grade3/videos.json',
  files3: 'https://raw.githubusercontent.com/workcompany177/trash/main/control/grade3/files.json',
  homework3: 'https://raw.githubusercontent.com/workcompany177/trash/main/control/grade3/homework.json',
  exams3: 'https://raw.githubusercontent.com/workcompany177/trash/main/control/grade3/exams.json',

  // (هـ) الإعلانات (advertisment)
  advertisment: 'https://raw.githubusercontent.com/workcompany177/trash/main/control/advertisment/advertisment.json'
};


// ===================== (2) روابط API (للتحرير) =====================
const API_URLS = {
  // (أ) المستخدمين
  users: 'https://api.github.com/repos/workcompany177/trash/contents/control/userData.json',

  // (ب) الصف الأول
  videos1: 'https://api.github.com/repos/workcompany177/trash/contents/control/grade1/videos.json',
  files1: 'https://api.github.com/repos/workcompany177/trash/contents/control/grade1/files.json',
  homework1: 'https://api.github.com/repos/workcompany177/trash/contents/control/grade1/homework.json',
  exams1: 'https://api.github.com/repos/workcompany177/trash/contents/control/grade1/exams.json',

  // (ج) الصف الثاني
  videos2: 'https://api.github.com/repos/workcompany177/trash/contents/control/grade2/videos.json',
  files2: 'https://api.github.com/repos/workcompany177/trash/contents/control/grade2/files.json',
  homework2: 'https://api.github.com/repos/workcompany177/trash/contents/control/grade2/homework.json',
  exams2: 'https://api.github.com/repos/workcompany177/trash/contents/control/grade2/exams.json',

  // (د) الصف الثالث
  videos3: 'https://api.github.com/repos/workcompany177/trash/contents/control/grade3/videos.json',
  files3: 'https://api.github.com/repos/workcompany177/trash/contents/control/grade3/files.json',
  homework3: 'https://api.github.com/repos/workcompany177/trash/contents/control/grade3/homework.json',
  exams3: 'https://api.github.com/repos/workcompany177/trash/contents/control/grade3/exams.json',

  // (هـ) الإعلانات
  advertisment: 'https://api.github.com/repos/workcompany177/trash/contents/control/advertisment/advertisment.json'
};


// من ملف .env
const PERSONAL_ACCESS_TOKEN = process.env.REACT_APP_GITHUB_PAT;

// ...
function AdminDashboard({ currentUser }) {
  const navigate = useNavigate();  // -------------------------------------------------
  // 1) تعريف الـ states الأساسية
  // -------------------------------------------------

  // (أ) المستخدمين
  const [users, setUsers] = useState([]);
  const [usersSha, setUsersSha] = useState(null);
  const [savingUsers, setSavingUsers] = useState(false);

  // (ب) الصف الأول
  const [videos1, setVideos1] = useState([]);
  const [files1, setFiles1] = useState([]);
  const [homework1, setHomework1] = useState([]);
  const [exams1, setExams1] = useState([]);

  const [videos1Sha, setVideos1Sha] = useState(null);
  const [files1Sha, setFiles1Sha] = useState(null);
  const [homework1Sha, setHomework1Sha] = useState(null);
  const [exams1Sha, setExams1Sha] = useState(null);

  const [savingVideos1, setSavingVideos1] = useState(false);
  const [savingFiles1, setSavingFiles1] = useState(false);
  const [savingHomework1, setSavingHomework1] = useState(false);
  const [savingExams1, setSavingExams1] = useState(false);

  // (ج) الصف الثاني
  const [videos2, setVideos2] = useState([]);
  const [files2, setFiles2] = useState([]);
  const [homework2, setHomework2] = useState([]);
  const [exams2, setExams2] = useState([]);

  const [videos2Sha, setVideos2Sha] = useState(null);
  const [files2Sha, setFiles2Sha] = useState(null);
  const [homework2Sha, setHomework2Sha] = useState(null);
  const [exams2Sha, setExams2Sha] = useState(null);

  const [savingVideos2, setSavingVideos2] = useState(false);
  const [savingFiles2, setSavingFiles2] = useState(false);
  const [savingHomework2, setSavingHomework2] = useState(false);
  const [savingExams2, setSavingExams2] = useState(false);

  // (د) الصف الثالث
  const [videos3, setVideos3] = useState([]);
  const [files3, setFiles3] = useState([]);
  const [homework3, setHomework3] = useState([]);
  const [exams3, setExams3] = useState([]);

  const [videos3Sha, setVideos3Sha] = useState(null);
  const [files3Sha, setFiles3Sha] = useState(null);
  const [homework3Sha, setHomework3Sha] = useState(null);
  const [exams3Sha, setExams3Sha] = useState(null);

  const [savingVideos3, setSavingVideos3] = useState(false);
  const [savingFiles3, setSavingFiles3] = useState(false);
  const [savingHomework3, setSavingHomework3] = useState(false);
  const [savingExams3, setSavingExams3] = useState(false);

  // (هـ) الإعلانات
  const [advertismentData, setAdvertismentData] = useState([]);
  const [advertismentSha, setAdvertismentSha] = useState(null);
  const [savingAd, setSavingAd] = useState(false);

  // مفاتيح للفصل بين الأقسام الرئيسية (Panels)
  const [openTable, setOpenTable] = useState({
    users: false,
    grade1: false,
    grade2: false,
    grade3: false,
    advertisment: false,
  });

  const toggleMainSection = (key) => {
    setOpenTable((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // -----------------------------------------------------------
  // 2) دوال لجلب وحفظ البيانات من/إلى GitHub
  // -----------------------------------------------------------

  /**
   * دالة لتحويل string مع محارف عربية أو أي Unicode إلى base64
   * عبر Encode + btoa
   */
  function toBase64Unicode(str) {
    // 1) encodeURIComponent => يحوّل المحارف غير اللاتينية لصيغة %D8%..
    // 2) unescape => يرجعها لصيغة يستطيع btoa التعامل معها
    // 3) btoa => الناتج Base64
    return btoa(unescape(encodeURIComponent(str)));
  }

  // جلب البيانات JSON + جلب الـ sha
  async function fetchDataFromGitHub(type) {
    try {
      // 1) جلب المحتوى JSON (Raw)
      const rawRes = await fetch(RAW_URLS[type]);
      if (!rawRes.ok) throw new Error('Failed to fetch raw data: ' + type);
      let rawData = await rawRes.json();

      // 2) لو ليس users => نضيف لكل عنصر notes إن لم يكن موجود
      if (type !== 'users') {
        rawData = rawData.map((item) => ({
          ...item,
          notes: item.notes || ''
        }));
      }

      // 3) تخزين في الـ state
      switch (type) {
        case 'users': setUsers(rawData); break;

        case 'videos1': setVideos1(rawData); break;
        case 'files1': setFiles1(rawData); break;
        case 'homework1': setHomework1(rawData); break;
        case 'exams1': setExams1(rawData); break;

        case 'videos2': setVideos2(rawData); break;
        case 'files2': setFiles2(rawData); break;
        case 'homework2': setHomework2(rawData); break;
        case 'exams2': setExams2(rawData); break;

        case 'videos3': setVideos3(rawData); break;
        case 'files3': setFiles3(rawData); break;
        case 'homework3': setHomework3(rawData); break;
        case 'exams3': setExams3(rawData); break;

        case 'advertisment': setAdvertismentData(rawData); break;

        default:
          break;
      }

      // 4) جلب sha من API
      const apiRes = await fetch(API_URLS[type], {
        headers: { Authorization: `Bearer ${PERSONAL_ACCESS_TOKEN}` },
      });
      const apiData = await apiRes.json();
      if (!apiRes.ok || !apiData.sha) {
        throw new Error(`Failed to get sha for ${type}`);
      }

      // 5) تخزين sha
      switch (type) {
        case 'users': setUsersSha(apiData.sha); break;

        case 'videos1': setVideos1Sha(apiData.sha); break;
        case 'files1': setFiles1Sha(apiData.sha); break;
        case 'homework1': setHomework1Sha(apiData.sha); break;
        case 'exams1': setExams1Sha(apiData.sha); break;

        case 'videos2': setVideos2Sha(apiData.sha); break;
        case 'files2': setFiles2Sha(apiData.sha); break;
        case 'homework2': setHomework2Sha(apiData.sha); break;
        case 'exams2': setExams2Sha(apiData.sha); break;

        case 'videos3': setVideos3Sha(apiData.sha); break;
        case 'files3': setFiles3Sha(apiData.sha); break;
        case 'homework3': setHomework3Sha(apiData.sha); break;
        case 'exams3': setExams3Sha(apiData.sha); break;

        case 'advertisment': setAdvertismentSha(apiData.sha); break;

        default:
          break;
      }
    } catch (error) {
      console.error('fetchDataFromGitHub error:', error, type);
    }
  }

  useEffect(() => {
    // (أ) users
    fetchDataFromGitHub('users');

    // (ب) الصف الأول
    fetchDataFromGitHub('videos1');
    fetchDataFromGitHub('files1');
    fetchDataFromGitHub('homework1');
    fetchDataFromGitHub('exams1');

    // (ج) الصف الثاني
    fetchDataFromGitHub('videos2');
    fetchDataFromGitHub('files2');
    fetchDataFromGitHub('homework2');
    fetchDataFromGitHub('exams2');

    // (د) الصف الثالث
    fetchDataFromGitHub('videos3');
    fetchDataFromGitHub('files3');
    fetchDataFromGitHub('homework3');
    fetchDataFromGitHub('exams3');

    // (هـ) الإعلانات
    fetchDataFromGitHub('advertisment');
  }, []);

  // تحرير حقل
  function handleEditField(type, index, field, value) {
    let updated;
    switch (type) {
      case 'users':
        updated = [...users];
        updated[index][field] = value;
        setUsers(updated);
        break;

      // grade1
      case 'videos1': updated = [...videos1]; updated[index][field] = value; setVideos1(updated); break;
      case 'files1': updated = [...files1]; updated[index][field] = value; setFiles1(updated); break;
      case 'homework1': updated = [...homework1]; updated[index][field] = value; setHomework1(updated); break;
      case 'exams1': updated = [...exams1]; updated[index][field] = value; setExams1(updated); break;

      // grade2
      case 'videos2': updated = [...videos2]; updated[index][field] = value; setVideos2(updated); break;
      case 'files2': updated = [...files2]; updated[index][field] = value; setFiles2(updated); break;
      case 'homework2': updated = [...homework2]; updated[index][field] = value; setHomework2(updated); break;
      case 'exams2': updated = [...exams2]; updated[index][field] = value; setExams2(updated); break;

      // grade3
      case 'videos3': updated = [...videos3]; updated[index][field] = value; setVideos3(updated); break;
      case 'files3': updated = [...files3]; updated[index][field] = value; setFiles3(updated); break;
      case 'homework3': updated = [...homework3]; updated[index][field] = value; setHomework3(updated); break;
      case 'exams3': updated = [...exams3]; updated[index][field] = value; setExams3(updated); break;

      case 'advertisment':
        updated = [...advertismentData];
        updated[index][field] = value;
        setAdvertismentData(updated);
        break;

      default:
        break;
    }
  }

  // إضافة عنصر جديد
  function handleAddItem(type) {
    let newItem;

    // لو المستخدمين => {username, password}
    if (type === 'users') {
      newItem = { username: '', password: '' };
      setUsers([...users, newItem]);
      return;
    }

    // لو الاعلانات => { thumbnail, notes }
    if (type === 'advertisment') {
      newItem = { thumbnail: '', notes: '' };
      setAdvertismentData([...advertismentData, newItem]);
      return;
    }

    // لو exams => { link, thumbnail, notes }
    if (type.includes('exams')) {
      newItem = { link: '', thumbnail: '', notes: '' };
    } else {
      // videos / files / homework => { id, thumbnail, notes }
      newItem = { id: '', thumbnail: '', notes: '' };
    }

    switch (type) {
      // grade1
      case 'videos1': setVideos1([...videos1, newItem]); break;
      case 'files1': setFiles1([...files1, newItem]); break;
      case 'homework1': setHomework1([...homework1, newItem]); break;
      case 'exams1': setExams1([...exams1, newItem]); break;

      // grade2
      case 'videos2': setVideos2([...videos2, newItem]); break;
      case 'files2': setFiles2([...files2, newItem]); break;
      case 'homework2': setHomework2([...homework2, newItem]); break;
      case 'exams2': setExams2([...exams2, newItem]); break;

      // grade3
      case 'videos3': setVideos3([...videos3, newItem]); break;
      case 'files3': setFiles3([...files3, newItem]); break;
      case 'homework3': setHomework3([...homework3, newItem]); break;
      case 'exams3': setExams3([...exams3, newItem]); break;

      default:
        break;
    }
  }

  // حذف عنصر
  function handleDeleteItem(type, index) {
    let updated;
    switch (type) {
      case 'users':
        updated = [...users];
        updated.splice(index, 1);
        setUsers(updated);
        return;

      case 'advertisment':
        updated = [...advertismentData];
        updated.splice(index, 1);
        setAdvertismentData(updated);
        return;

      // grade1
      case 'videos1': updated = [...videos1]; updated.splice(index, 1); setVideos1(updated); break;
      case 'files1': updated = [...files1]; updated.splice(index, 1); setFiles1(updated); break;
      case 'homework1': updated = [...homework1]; updated.splice(index, 1); setHomework1(updated); break;
      case 'exams1': updated = [...exams1]; updated.splice(index, 1); setExams1(updated); break;

      // grade2
      case 'videos2': updated = [...videos2]; updated.splice(index, 1); setVideos2(updated); break;
      case 'files2': updated = [...files2]; updated.splice(index, 1); setFiles2(updated); break;
      case 'homework2': updated = [...homework2]; updated.splice(index, 1); setHomework2(updated); break;
      case 'exams2': updated = [...exams2]; updated.splice(index, 1); setExams2(updated); break;

      // grade3
      case 'videos3': updated = [...videos3]; updated.splice(index, 1); setVideos3(updated); break;
      case 'files3': updated = [...files3]; updated.splice(index, 1); setFiles3(updated); break;
      case 'homework3': updated = [...homework3]; updated.splice(index, 1); setHomework3(updated); break;
      case 'exams3': updated = [...exams3]; updated.splice(index, 1); setExams3(updated); break;

      default:
        break;
    }
  }

  // حفظ إلى GitHub
  async function saveToGitHub(type) {
    let dataArr, sha, setSavingFn;
    switch (type) {
      case 'users':
        dataArr = users; sha = usersSha; setSavingFn = setSavingUsers;
        break;

      // grade1
      case 'videos1': dataArr = videos1; sha = videos1Sha; setSavingFn = setSavingVideos1; break;
      case 'files1': dataArr = files1; sha = files1Sha; setSavingFn = setSavingFiles1; break;
      case 'homework1': dataArr = homework1; sha = homework1Sha; setSavingFn = setSavingHomework1; break;
      case 'exams1': dataArr = exams1; sha = exams1Sha; setSavingFn = setSavingExams1; break;

      // grade2
      case 'videos2': dataArr = videos2; sha = videos2Sha; setSavingFn = setSavingVideos2; break;
      case 'files2': dataArr = files2; sha = files2Sha; setSavingFn = setSavingFiles2; break;
      case 'homework2': dataArr = homework2; sha = homework2Sha; setSavingFn = setSavingHomework2; break;
      case 'exams2': dataArr = exams2; sha = exams2Sha; setSavingFn = setSavingExams2; break;

      // grade3
      case 'videos3': dataArr = videos3; sha = videos3Sha; setSavingFn = setSavingVideos3; break;
      case 'files3': dataArr = files3; sha = files3Sha; setSavingFn = setSavingFiles3; break;
      case 'homework3': dataArr = homework3; sha = homework3Sha; setSavingFn = setSavingHomework3; break;
      case 'exams3': dataArr = exams3; sha = exams3Sha; setSavingFn = setSavingExams3; break;

      case 'advertisment':
        dataArr = advertismentData; sha = advertismentSha; setSavingFn = setSavingAd;
        break;

      default:
        return;
    }

    if (!sha) {
      alert(`لا يمكن الحفظ لأننا لم نحصل على SHA الخاص بـ ${type}!`);
      return;
    }
    setSavingFn(true);

    try {
      // استخدمنا toBase64Unicode بدل btoa مباشرة
      const jsonString = JSON.stringify(dataArr, null, 2);
      const base64Content = toBase64Unicode(jsonString);

      const response = await fetch(API_URLS[type], {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${PERSONAL_ACCESS_TOKEN}`,
        },
        body: JSON.stringify({
          message: `Update ${type}.json from Admin Dashboard`,
          content: base64Content,
          sha: sha,
        }),
      });

      const result = await response.json();
      if (result.content) {
        alert(`تم حفظ ${type}.json بنجاح على GitHub!`);
        const newSha = result.content.sha;

        switch (type) {
          case 'users': setUsersSha(newSha); break;

          // grade1
          case 'videos1': setVideos1Sha(newSha); break;
          case 'files1': setFiles1Sha(newSha); break;
          case 'homework1': setHomework1Sha(newSha); break;
          case 'exams1': setExams1Sha(newSha); break;

          // grade2
          case 'videos2': setVideos2Sha(newSha); break;
          case 'files2': setFiles2Sha(newSha); break;
          case 'homework2': setHomework2Sha(newSha); break;
          case 'exams2': setExams2Sha(newSha); break;

          // grade3
          case 'videos3': setVideos3Sha(newSha); break;
          case 'files3': setFiles3Sha(newSha); break;
          case 'homework3': setHomework3Sha(newSha); break;
          case 'exams3': setExams3Sha(newSha); break;

          case 'advertisment': setAdvertismentSha(newSha); break;
          default:
            break;
        }
      } else {
        console.error('Error saving:', result);
        alert('حدث خطأ أثناء الحفظ على GitHub!\n' + (result.message || ''));
      }
    } catch (error) {
      console.error('Error in saveToGitHub:', error);
      alert('حصل خطأ أثناء حفظ البيانات!\n' + error.message);
    } finally {
      setSavingFn(false);
    }
  }

  // -----------------------------------------------------------
  // 3) التحقق من صلاحية الأدمن
  // -----------------------------------------------------------
  if (!currentUser || !currentUser.isAdmin) {
    return (
      <h2 style={{ color: '#fff', textAlign: 'center' }}>
        ليس لديك صلاحية الوصول لهذه الصفحة.
      </h2>
    );
  }

  // -----------------------------------------------------------
  // 4) واجهة لوحة التحكم
  // -----------------------------------------------------------
  return (
    <Container style={{ direction: 'rtl', textAlign: 'right', color: '#fff' }}>
      <h2 className="mb-4">لوحة التحكم الشاملة</h2>

      {/* قسم البطاقات الخاصة بالصفوف الدراسية */}
      <Row className="mb-4">
        <Col xs={12} md={4}>
          <Card
            className="mb-3"
            onClick={() => navigate('/admin-first-year')}
            style={{ cursor: 'pointer', backgroundColor: '#444', color: '#fff' }}
          >
            <Card.Body>
              <Card.Title>الصف الأول الثانوي</Card.Title>
              <Card.Text>
                اضغط هنا لعرض محتوى الصف الأول
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={4}>
          <Card
            className="mb-3"
            onClick={() => navigate('/admin-second-year')}
            style={{ cursor: 'pointer', backgroundColor: '#444', color: '#fff' }}
          >
            <Card.Body>
              <Card.Title>الصف الثاني الثانوي</Card.Title>
              <Card.Text>
                اضغط هنا لعرض محتوى الصف الثاني
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={4}>
          <Card
            className="mb-3"
            onClick={() => navigate('/admin-third-year')}
            style={{ cursor: 'pointer', backgroundColor: '#444', color: '#fff' }}
          >
            <Card.Body>
              <Card.Title>الصف الثالث الثانوي</Card.Title>
              <Card.Text>
                اضغط هنا لعرض محتوى الصف الثالث
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* (أ) قسم إدارة المستخدمين ---------------------------------------- */}
      <div style={{ marginBottom: '20px' }}>
        <div
          onClick={() => toggleMainSection('users')}
          style={{
            cursor: 'pointer',
            backgroundColor: '#333',
            color: '#fff',
            padding: '10px',
            borderRadius: '5px',
            width: 'fit-content',
            marginBottom: '10px',
          }}
        >
          لوحة التحكم - تعديل بيانات المستخدمين
          <span style={{ marginRight: '8px' }}>
            {openTable.users ? '▲' : '▼'}
          </span>
        </div>

        {openTable.users && (
          <>
            <Button
              variant="info"
              onClick={() => handleAddItem('users')}
              style={{ marginBottom: '10px' }}
            >
              إضافة مستخدم
            </Button>

            {users.length === 0 ? (
              <p>...جاري التحميل أو لا يوجد بيانات</p>
            ) : (
              <Table bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>اسم المستخدم</th>
                    <th>كلمة المرور</th>
                    <th>حذف</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>
                        <Form.Control
                          type="text"
                          value={u.username}
                          onChange={(e) =>
                            handleEditField('users', i, 'username', e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <Form.Control
                          type="text"
                          value={u.password}
                          onChange={(e) =>
                            handleEditField('users', i, 'password', e.target.value)
                          }
                        />
                      </td>
                      <td>
                        <Button
                          variant="danger"
                          onClick={() => handleDeleteItem('users', i)}
                        >
                          حذف
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}

            <Button
              variant="success"
              onClick={() => saveToGitHub('users')}
              disabled={savingUsers || !usersSha}
            >
              {savingUsers ? 'جاري الحفظ...' : 'حفظ التعديلات'}
            </Button>
          </>
        )}
      </div>

      {/* (ب) لوحة التحكم - الإعلانات (advertisment) ---------------------- */}
      <div style={{ marginBottom: '20px' }}>
        <div
          onClick={() => toggleMainSection('advertisment')}
          style={{
            cursor: 'pointer',
            backgroundColor: '#333',
            color: '#fff',
            padding: '10px',
            borderRadius: '5px',
            width: 'fit-content',
            marginBottom: '10px',
          }}
        >
          لوحة التحكم - الإعلانات (advertisment)
          <span style={{ marginRight: '8px' }}>
            {openTable.advertisment ? '▲' : '▼'}
          </span>
        </div>

        {openTable.advertisment && (
          <SectionTable
            title="الإعلانات (advertisment.json)"
            dataArray={advertismentData}
            type="advertisment"
            sha={advertismentSha}
            savingState={savingAd}
            handleAddItem={handleAddItem}
            handleEditField={handleEditField}
            handleDeleteItem={handleDeleteItem}
            saveToGitHub={saveToGitHub}
          />
        )}
      </div>

      {/* (ج) الصف الأول الثانوي ------------------------------------------ */}
      <div style={{ marginBottom: '20px' }}>
        <div
          onClick={() => toggleMainSection('grade1')}
          style={{
            cursor: 'pointer',
            backgroundColor: '#333',
            color: '#fff',
            padding: '10px',
            borderRadius: '5px',
            width: 'fit-content',
            marginBottom: '10px',
          }}
        >
          لوحة التحكم - الصف الأول الثانوي
          <span style={{ marginRight: '8px' }}>
            {openTable.grade1 ? '▲' : '▼'}
          </span>
        </div>

        {openTable.grade1 && (
          <>
            <SectionTable
              title="الفيديوهات - أولى ثانوي (videos.json)"
              dataArray={videos1}
              type="videos1"
              sha={videos1Sha}
              savingState={savingVideos1}
              handleAddItem={handleAddItem}
              handleEditField={handleEditField}
              handleDeleteItem={handleDeleteItem}
              saveToGitHub={saveToGitHub}
            />

            <SectionTable
              title="الملفات - أولى ثانوي (files.json)"
              dataArray={files1}
              type="files1"
              sha={files1Sha}
              savingState={savingFiles1}
              handleAddItem={handleAddItem}
              handleEditField={handleEditField}
              handleDeleteItem={handleDeleteItem}
              saveToGitHub={saveToGitHub}
            />

            <SectionTable
              title="الواجبات - أولى ثانوي (homework.json)"
              dataArray={homework1}
              type="homework1"
              sha={homework1Sha}
              savingState={savingHomework1}
              handleAddItem={handleAddItem}
              handleEditField={handleEditField}
              handleDeleteItem={handleDeleteItem}
              saveToGitHub={saveToGitHub}
            />

            <SectionTable
              title="الامتحانات - أولى ثانوي (exams.json)"
              dataArray={exams1}
              type="exams1"
              sha={exams1Sha}
              savingState={savingExams1}
              handleAddItem={handleAddItem}
              handleEditField={handleEditField}
              handleDeleteItem={handleDeleteItem}
              saveToGitHub={saveToGitHub}
            />
          </>
        )}
      </div>

      {/* (د) الصف الثاني الثانوي ------------------------------------------ */}
      <div style={{ marginBottom: '20px' }}>
        <div
          onClick={() => toggleMainSection('grade2')}
          style={{
            cursor: 'pointer',
            backgroundColor: '#333',
            color: '#fff',
            padding: '10px',
            borderRadius: '5px',
            width: 'fit-content',
            marginBottom: '10px',
          }}
        >
          لوحة التحكم - الصف الثاني الثانوي
          <span style={{ marginRight: '8px' }}>
            {openTable.grade2 ? '▲' : '▼'}
          </span>
        </div>

        {openTable.grade2 && (
          <>
            <SectionTable
              title="الفيديوهات - ثانية ثانوي (videos.json)"
              dataArray={videos2}
              type="videos2"
              sha={videos2Sha}
              savingState={savingVideos2}
              handleAddItem={handleAddItem}
              handleEditField={handleEditField}
              handleDeleteItem={handleDeleteItem}
              saveToGitHub={saveToGitHub}
            />

            <SectionTable
              title="الملفات - ثانية ثانوي (files.json)"
              dataArray={files2}
              type="files2"
              sha={files2Sha}
              savingState={savingFiles2}
              handleAddItem={handleAddItem}
              handleEditField={handleEditField}
              handleDeleteItem={handleDeleteItem}
              saveToGitHub={saveToGitHub}
            />

            <SectionTable
              title="الواجبات - ثانية ثانوي (homework.json)"
              dataArray={homework2}
              type="homework2"
              sha={homework2Sha}
              savingState={savingHomework2}
              handleAddItem={handleAddItem}
              handleEditField={handleEditField}
              handleDeleteItem={handleDeleteItem}
              saveToGitHub={saveToGitHub}
            />

            <SectionTable
              title="الامتحانات - ثانية ثانوي (exams.json)"
              dataArray={exams2}
              type="exams2"
              sha={exams2Sha}
              savingState={savingExams2}
              handleAddItem={handleAddItem}
              handleEditField={handleEditField}
              handleDeleteItem={handleDeleteItem}
              saveToGitHub={saveToGitHub}
            />
          </>
        )}
      </div>

      {/* (هـ) الصف الثالث الثانوي ----------------------------------------- */}
      <div style={{ marginBottom: '20px' }}>
        <div
          onClick={() => toggleMainSection('grade3')}
          style={{
            cursor: 'pointer',
            backgroundColor: '#333',
            color: '#fff',
            padding: '10px',
            borderRadius: '5px',
            width: 'fit-content',
            marginBottom: '10px',
          }}
        >
          لوحة التحكم - الصف الثالث الثانوي
          <span style={{ marginRight: '8px' }}>
            {openTable.grade3 ? '▲' : '▼'}
          </span>
        </div>

        {openTable.grade3 && (
          <>
            <SectionTable
              title="الفيديوهات - ثالثة ثانوي (videos.json)"
              dataArray={videos3}
              type="videos3"
              sha={videos3Sha}
              savingState={savingVideos3}
              handleAddItem={handleAddItem}
              handleEditField={handleEditField}
              handleDeleteItem={handleDeleteItem}
              saveToGitHub={saveToGitHub}
            />

            <SectionTable
              title="الملفات - ثالثة ثانوي (files.json)"
              dataArray={files3}
              type="files3"
              sha={files3Sha}
              savingState={savingFiles3}
              handleAddItem={handleAddItem}
              handleEditField={handleEditField}
              handleDeleteItem={handleDeleteItem}
              saveToGitHub={saveToGitHub}
            />

            <SectionTable
              title="الواجبات - ثالثة ثانوي (homework.json)"
              dataArray={homework3}
              type="homework3"
              sha={homework3Sha}
              savingState={savingHomework3}
              handleAddItem={handleAddItem}
              handleEditField={handleEditField}
              handleDeleteItem={handleDeleteItem}
              saveToGitHub={saveToGitHub}
            />

            <SectionTable
              title="الامتحانات - ثالثة ثانوي (exams.json)"
              dataArray={exams3}
              type="exams3"
              sha={exams3Sha}
              savingState={savingExams3}
              handleAddItem={handleAddItem}
              handleEditField={handleEditField}
              handleDeleteItem={handleDeleteItem}
              saveToGitHub={saveToGitHub}
            />
          </>
        )}
      </div>
    </Container>
  );
}

/** مكوّن فرعي لإدارة أي جدول (Videos / Files / Homework / Exams / advertisment)
    مع حقل notes مضمن في نفس العنصر */
function SectionTable({
  title,
  dataArray,
  type,
  sha,
  savingState,
  handleAddItem,
  handleEditField,
  handleDeleteItem,
  saveToGitHub,
}) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <h5 style={{ color: '#ff0', marginBottom: '10px' }}>{title}</h5>

      <Button
        variant="info"
        onClick={() => handleAddItem(type)}
        style={{ marginBottom: '10px' }}
      >
        إضافة عنصر جديد
      </Button>

      {dataArray.length === 0 ? (
        <p>لا توجد بيانات (أو جاري التحميل)...</p>
      ) : (
        <Table bordered hover variant="dark">
          <thead>
            {type === 'advertisment' ? (
              // الإعلانات: thumbnail, notes
              <tr>
                <th>#</th>
                <th>thumbnail</th>
                <th>notes</th>
                <th>حذف</th>
              </tr>
            ) : type.includes('exams') ? (
              // exams: link, thumbnail, notes
              <tr>
                <th>#</th>
                <th>link</th>
                <th>thumbnail</th>
                <th>notes</th>
                <th>حذف</th>
              </tr>
            ) : (
              // videos / files / homework => id, thumbnail, notes
              <tr>
                <th>#</th>
                <th>id</th>
                <th>thumbnail</th>
                <th>notes</th>
                <th>حذف</th>
              </tr>
            )}
          </thead>

          <tbody>
            {dataArray.map((item, index) => {
              if (type === 'advertisment') {
                // { thumbnail, notes }
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <Form.Control
                        type="text"
                        value={item.thumbnail || ''}
                        onChange={(e) =>
                          handleEditField(type, index, 'thumbnail', e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        value={item.notes || ''}
                        onChange={(e) => handleEditField(type, index, 'notes', e.target.value)}
                      />
                    </td>
                    <td>
                      <Button variant="danger" onClick={() => handleDeleteItem(type, index)}>
                        حذف
                      </Button>
                    </td>
                  </tr>
                );
              } else if (type.includes('exams')) {
                // { link, thumbnail, notes }
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <Form.Control
                        type="text"
                        value={item.link || ''}
                        onChange={(e) => handleEditField(type, index, 'link', e.target.value)}
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="text"
                        value={item.thumbnail || ''}
                        onChange={(e) =>
                          handleEditField(type, index, 'thumbnail', e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        value={item.notes || ''}
                        onChange={(e) => handleEditField(type, index, 'notes', e.target.value)}
                      />
                    </td>
                    <td>
                      <Button variant="danger" onClick={() => handleDeleteItem(type, index)}>
                        حذف
                      </Button>
                    </td>
                  </tr>
                );
              } else {
                // videos / files / homework => { id, thumbnail, notes }
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <Form.Control
                        type="text"
                        value={item.id || ''}
                        onChange={(e) =>
                          handleEditField(type, index, 'id', e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="text"
                        value={item.thumbnail || ''}
                        onChange={(e) =>
                          handleEditField(type, index, 'thumbnail', e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        value={item.notes || ''}
                        onChange={(e) => handleEditField(type, index, 'notes', e.target.value)}
                      />
                    </td>
                    <td>
                      <Button variant="danger" onClick={() => handleDeleteItem(type, index)}>
                        حذف
                      </Button>
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </Table>
      )}

      <Button
        variant="success"
        onClick={() => saveToGitHub(type)}
        disabled={savingState || !sha}
      >
        {savingState ? 'جاري الحفظ...' : `حفظ ${type}`}
      </Button>
    </div>

    
  );
}

export default AdminDashboard;
