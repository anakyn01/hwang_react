const express = require('express');
const cors = require('cors');
const { Sequelize, DataTypes, Op } = require('sequelize');
const bcrypt = require('bcrypt');

// 모델 임포트
const sequelize = require('./config/database');
const User = require('./models/User');
const Match = require('./models/Match');
const Diary = require('./models/Diary');
const Admin = require('./models/Admin');

const app = express();

app.use(cors());
app.use(express.json());

const multer = require('multer');
const path = require('path');
const fs = require('fs');

// 업로드 폴더가 없으면 자동 생성
if(!fs.existsSync('uploads')) fs.mkdirSync('uploads');
app.use('/uploads', express.static('uploads'));

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'), 
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))  
});
const upload = multer({ storage });

// 회원가입
app.post('/api/signup', upload.array('photos', 3), async (req, res) => {
  const { email, password, nickname, age, gender, bio } = req.body;
  
  if (!email || !password || !nickname || !age || !gender) {
    return res.status(400).json({
      success: false,
      message: '필수 정보를 모두 입력해 주세요.'
    });
  }

  const t = await sequelize.transaction();
  try {
    let profile_image_main = req.files[0] ? `/uploads/${req.files[0].filename}` : null;
    let profile_image_sub1 = req.files[1] ? `/uploads/${req.files[1].filename}` : null;
    let profile_image_sub2 = req.files[2] ? `/uploads/${req.files[2].filename}` : null;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email, 
      password: hashedPassword, 
      nickname, 
      age, 
      gender, 
      bio,
      profile_image_main,
      profile_image_sub1,
      profile_image_sub2,
      status: 'PENDING' // 가입 직후 수질검사(승인) 대기 상태
    }, { transaction: t });

    await t.commit(); 

    res.json({
      success: true,
      message: '회원가입이 완료되었습니다! 수질 검사(승인) 대기 중입니다.',
      newUserId: newUser.id
    });
  } catch (error) {
    await t.rollback();
    console.error(error);
    
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({
        success: false,
        message: '이미 가입된 이메일이 존재합니다.'
      });
    } 

    res.status(500).json({
      success: false, 
      message: '회원가입 처리 중 서버 에러가 발생했습니다.'
    });
  }
});

// 2차 회원가입 (추가 정보 입력)
app.patch('/api/users/:id/secondary-signup', async (req, res) => {
  const userId = req.params.id;
  const { phone_number, occupation, address } = req.body; 
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: '유저를 찾을 수 없습니다.' });
    }
    await user.update({ phone_number, occupation, address });
    res.json({ success: true, message: '추가 정보 입력이 완료되었습니다.' });
  } catch (error) {
    console.error("2차 회원가입 에러:", error);
    res.status(500).json({ success: false, message: '정보 저장 중 에러가 발생했습니다.' });    
  }   
});

// 로그인
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ success: false, message: '이메일이나 비밀번호가 틀렸습니다.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: '이메일이나 비밀번호가 틀렸습니다.' });    
    }
 
    // 상태 검사 1: 관리자 승인 대기 상태
    if (user.status === 'PENDING') {
      return res.status(403).json({
        success: false, 
        message: '수질 검사(승인)가 진행 중입니다. 조금만 기다려주세요!'       
      });
    }

    // 상태 검사 2: 영구 정지 상태
    if (user.status === 'BANNED') {
      return res.status(403).json({
        success: false,
        message: '이용 수칙 위반으로 영구 정지된 계정입니다.'
      });
    }

    res.json({ success: true, message: '로그인 성공', user });
  } catch (error) {
    console.error("로그인 에러:", error);
    res.status(500).json({ success: false, message: '서버 에러가 발생했습니다.' });   
  }
});

// 매칭 수락 및 포인트 차감
app.post('/api/match/accept', async (req, res) => {
  const { match_id, user_id } = req.body;
  const t = await sequelize.transaction();
  try {
    const user = await User.findByPk(user_id);
    if (user.points < 10000) {
      throw new Error('포인트가 부족합니다. 충전해 주세요!');
    }
    await user.update({ points: user.points - 10000 }, { transaction: t });
    await Match.update({ status: 'ACCEPTED' }, { where: { id: match_id }, transaction: t });

    await t.commit();
    res.json({ success: true, message: '수락 완료! 연락처가 열렸습니다.' });
  } catch (error) {
    await t.rollback();
    res.status(400).json({ success: false, message: error.message });
  }
});

// 노쇼 신고 접수
app.post('/api/match/noshow', async (req, res) => {
  const { match_id, target_user_id } = req.body;
  await Match.update({ status: 'NO_SHOW' }, { where: { id: match_id } });
  
  const targetUser = await User.findByPk(target_user_id);
  const newCount = targetUser.no_show_count + 1;
  
  if (newCount >= 3) {
    await targetUser.update({ no_show_count: newCount, status: 'BANNED' });
  } else {
    await targetUser.update({ no_show_count: newCount });    
  }
  res.json({ success: true, message: '신고 접수 완료! 강력하게 제재하겠습니다.' });
});

// 마이페이지
app.get('/api/mypage/:user_id', async (req, res) => {
  const userId = req.params.user_id;
  const user = await User.findByPk(userId);

  const receivedLikes = await Match.count({ where: { receiver_id: userId, status: 'REQUESTED' } });
  const matchedCount = await Match.count({
    where: {
      [Op.or]: [{ sender_id: userId }, { receiver_id: userId }],
      status: 'ACCEPTED'    
    }    
  });
  const diaryCount = await Diary.count({ where: { user_id: userId } });

  res.json({
    ...user.toJSON(),
    received_likes: receivedLikes,
    matches: matchedCount,
    diaries: diaryCount
  });
});

// 관리자 로그인
app.post('/api/admin/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ where: { email } });
    if (!admin) {
      return res.status(401).json({ success: false, message: '관리자 이메일이 틀렸습니다.' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: '비밀번호가 틀렸습니다.' });    
    }

    res.json({ success: true, name: admin.name, message: '관리자 대시보드에 로그인하셨습니다.' });
  } catch(error) {
    console.error("어드민 로그인 에러", error);
    res.status(500).json({ success: false, message: '서버 통신 에러' });
  }
});

// 유저 목록 조회
app.get('/api/admin/users', async (req, res) => {
  try {
    const users = await User.findAll({ order: [['id', 'DESC']] });
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: '유저 목록 로딩 실패' });
  }
});

// 유저 승인 (수질 검사 통과)
app.patch('/api/admin/users/:id/approve', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ success: false, message: '유저를 찾을 수 없습니다.' });
    
    await user.update({ status: 'ACTIVE' });
    res.json({ success: true, message: '승인 완료' });
  } catch(error) {
    res.status(500).json({ success: false, message: '승인 처리 실패' });
  }
});

const PORT = 3000;
app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    await sequelize.sync({ force: true });
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

    const adminCount = await Admin.count();
    if (adminCount === 0) {
      const hashedAdminPassword = await bcrypt.hash('1234', 10);
      await Admin.create({
        email: 'test@test.com',
        password: hashedAdminPassword,
        name: '최고관리자'    
      });
      console.log('기본 관리자 계정 생성 완료 (test@test.com / 1234)');
    }

    console.log("데이터베이스 연결 확인 완료");
    console.log(`백엔드 서버가 http://localhost:${PORT} 에서 열심히 돌아가고 있습니다.`);
  } catch (err) {
    console.error('서버 시작 중 데이터베이스 연결 에러 발생:', err);
  }
});