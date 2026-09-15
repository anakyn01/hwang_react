require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const AppDataSource = require("./db"); // db.js 파일 경로 확인
const Member = require("./src/entity/Member"); // Member.js 파일 경로 확인

const app = express();

// 1. CORS 설정 (프론트엔드 3000번 포트의 접근만 안전하게 허용)
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(express.json());

// 2. TypeORM 오라클 DB 연결
AppDataSource.initialize()
    .then(() => {
        console.log("✅ 오라클 DB가 성공적으로 연결되었습니다.");
    })
    .catch((error) => {
        console.error("❌ DB 연결 실패:", error);
    });

// 3. 헬스 체크 API (서버 상태 확인용)
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: '성형외과 백엔드 서버가 정상 작동 중입니다.' });
});

// 4. 회원가입 API
app.post('/api/register', async (req, res) => {
    try {
        // 프론트엔드에서 보낸 데이터 분해
        const {
            userName,
            userId,
            userPw,
            email,
            isMailAgreed,
            phone,
            isSnsAgreed,
            gender,
            residentNum,
            zipcode,
            address1,
            address2,
        } = req.body;

        // 🎯 [추가됨] 필수값 검증 로직: 하나라도 없으면 DB까지 안 가고 서버에서 바로 차단
        if (!userName || !userId || !userPw || !email || !phone || !residentNum) {
            return res.status(400).json({
                success: false,
                message: '필수 입력값이 누락되었습니다. (이름, 아이디, 비밀번호, 이메일, 휴대폰번호, 주민등록번호)'
            });
        }

        // 비밀번호 암호화 (소금 뿌리기)
        const salt = await bcrypt.genSalt(10);
        const hashedPw = await bcrypt.hash(userPw, salt);

        // DB 저장을 위한 레포지토리 가져오기
        const memberRepository = AppDataSource.getRepository(Member);

        // DB 컬럼에 맞게 데이터 조립 (IS_ADMIN은 DB 기본값 0으로 자동 세팅됨)
        const newMember = {
            USER_NAME: userName,
            USER_ID: userId,
            USER_PW: hashedPw,
            EMAIL: email,
            IS_MAIL_AGREED: isMailAgreed ? 'Y' : 'N', // 💡 DB에 IS_MAIL_AGREED 컬럼 필수!
            PHONE: phone,
            IS_SNS_AGREED: isSnsAgreed ? 'Y' : 'N',
            GENDER: gender,
            RESIDENT_NUM: residentNum,
            ZIPCODE: zipcode,
            ADDRESS1: address1,
            ADDRESS2: address2,
        };

        // DB에 저장 실행
        await memberRepository.save(newMember);

        // 성공 응답
        res.status(201).json({ success: true, message: '회원가입이 완료되었습니다.' });

    } catch (error) {
        // 🎯 오라클 UNIQUE 제약조건 위배 에러 (아이디 중복 처리)
        if (error.message && error.message.includes('ORA-00001')) {
            console.error('회원가입 에러: 중복된 아이디입니다.');
            return res.status(409).json({ success: false, message: '이미 사용 중인 아이디입니다.' });
        }

        // 그 외 서버 에러 처리
        console.error('회원가입 에러:', error);
        res.status(500).json({ success: false, message: '회원가입 중 서버 오류가 발생했습니다.' });
    }
});

// 5. 서버 실행
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});