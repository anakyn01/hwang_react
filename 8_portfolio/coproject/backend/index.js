const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

//파일올릴경우 추가
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());
//프론트엔드에서 보내는 JSON 데이터를 읽기 위한 설정입니다.


//업로드할 폴더(uploads)가 없으면 자동으로 만들어주는 코드
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}

// multer 설정 (파일을 어디에, 어떤 이름으로 저장할지 정함)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); //uploads 폴더에 저장
    },
    filename:(req, file, cb) => {
      // 한글 이름 깨짐과 중복 방지를 위해 
      // '현재시간.확장자' 형태로 저장 (예: 1691234567.jpg)  
      const ext = path.extname(file.originalname);
      cb(null, Date.now() + ext);
    }
});
// 최대 8장까지 업로드 가능한 multer 미들웨어 준비
const upload = multer({storage: storage});
// 🌟 아주 중요! 프론트엔드에서 
// uploads 폴더 안의 이미지를 볼 수 있게 권한을 열어줍니다.
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'1234',
    database:'company'
});

db.connect((err) => {
    if(err) throw err;
    console.log('MySql (company) connected');
});

app.post('/api/users/register',(req, res) => {
    //1) 프론트에서 보낸 7가지 정보를 꺼내 옵니다
    const { firstName, lastName, email, password, zipCode, address, detailAddress} = req.body;
//2)DB의 users테이블에 이정보를 넣으라는 내용
const sql =`
INSERT INTO users (first_name, last_name, email, password, zip_code, address, detail_address)
VALUES (?, ?, ?, ?, ?, ?, ?)
`;

//? 자리에서 꺼내온 정보들을 순서대로 매칭해서 DB에 넣어주세용
db.query(sql,[firstName, lastName, email, password, zipCode, address, detailAddress], (err, result) => {
    if(err) {
        console.error('회원가입 에러:', err);
        if (err.code === 'ER_DUP_ENTRY'){
        return res.status(400).json({message:'이미 존재하는 이메일입니다'});
        }
        return res.status(500).json({message:'서버 오류가 발생했습니다'});
    }
//저장이 무사히 끝났다면 성공했다고 알려줌
res.status(201).json({message:'회원가입이 완료되었습니다'});
});
});

//login
app.post('/api/users/login',(req, res) => {
    //1)
    const {email, password} = req.body;

    //2)
    const sql ='SELECT * FROM users WHERE email = ? AND password = ?';

    //3)
    db.query(sql,[email, password], (err, results) => {

        if(err) {
            console.error('로그인 에러:',err);
            return res.status(500).json({message:'서버 오류가 발생했습니다'});
        }
        if(results.length === 0) {
return res.status(401).json({message:'이메일 또는 비밀번호가 올바르지 않습니다'})
        }
const user = results[0];//검색된 첫번째 회원 정보
res.status(200).json({
    message:'로그인 성공!',
    name:user.first_name
})        
    })
})

//회원목록조회 API
app.get('/api/users', (req, res) => {
    //비밀번호를 제외한 회원 정보들을 최근 가입순으로 가져옵니다
    const sql=`
SELECT id, first_name, last_name, email, zip_code, address, detail_address
FROM users
ORDER BY id DESC    
    `;

    db.query(sql, (err, results) => {
        if(err) {
            console.error('회원 목록 조회 에러:', err);
            return res.status(500).json({message:'서버 오류가 발생했습니다'});
        }
        //조회된 회원 배열을 프론트엔드로 보냅니다
        res.status(200).json(results);
    })
})

//관리자
//[POST] 헤더 설정 저장 API
app.post('/api/settings/header', (req, res) =>{
    //보내온 데이터를 각각의 변수로 꺼낸다
    const {logoType, logoText, logoImage, menus} = req.body;
    //DB에 실행할 쿼리문을 미리 문자열로 만들어 둔다
    const updateSettingsSql = `
    INSERT INTO header_settings (id, logo_type, logo_text, logo_image)
    VALUES (1, ?,?,?)
    ON DUPLICATE KEY UPDATE
    logo_type = VALUES(logo_type),
    logo_text = VALUES(logo_text),
    logo_image = VALUES(logo_image)
    `;

    //?자리에[LogoType, LogoText, LogoImage]순서대로 값을 넣어 쿼리를 실행
    db.query(updateSettingsSql, [logoType, logoText, logoImage], (err) =>{

        //퀴리 실행중에 에러가 발생 했다면
        if(err) {
            console.error('설정 저장 에러:', err);
            return res.status(500).json({message:'설정 저장중 오류가 발생'});
        }

        //2) 기존에 등록된 메뉴를 싹 비우고 새로 입력받은 메뉴들로 체웁니다
        db.query('DELETE FROM header_menus', (err) => {
            if(err) return res.status(500).json({message:'메뉴 갱신중 오류가 발생'});
            //menus배열이 존재하고 ,메뉴가 1개 이상 잇을때만 작업을 한다
            if(menus && menus.length > 0) {
                const menuValues = menus.map(m => [m.title, m.link]);

                const insertMenuSql = 'INSERT INTO header_menus (title, link) VALUES ?';

                db.query(insertMenuSql, [menuValues], (err) => {
                    if(err) {
                        console.error('메뉴 삽입 에러:', err);
                        return res.status(500).json({message:'메뉴 저장 중 오류가 발생했습니다'});
                    }
                    res.status(200).json({message:"헤더 설정이 성공적으로 저장되었습니다."});
                });
            }else{
                // 메뉴가 하나도 없는 경우: 삽입 없이 바로 성공 응답을 보낸다
                res.status(200).json({message:'헤더 설정이 성공적으로 저장 되었습니다'});
            }
        });
    });
});


//[get]헤더 설정 불러오기
app.get('/api/settings/header', (req, res) => {
    //로고 데이터 가져오기
    db.query('SELECT * FROM header_settings WHERE id=1',(err, settingsResult) => {
        //조회중에 에러가 발생했다면 500에러를 응답하고 종료
if(err) return res.status(500).json({message:'설정 불러오기 에러'});
//header_menus 테이블에서 모든 메뉴의 id, title, link를 조회한다
db.query('SELECT id, title, link FROM header_menus',(err, menusResult) =>{
    //조회 중 에러가 발생했다면 500 에러를 응답하고 종료한다
    if(err) return res.status(500).json({message: '메뉴 불러오기 에러'});
/*
settingsResult[0]: 조회 결과 배열의 첫 번째 행(로고 설정)을 꺼낸다
|| { ... }: DB에 데이터가 없을 경우(처음 접속 시) 기본값을 사용한다
*/    
    const settings = settingsResult[0] || {logo_type:'text', logo_text:'INDIGO', logo_image:''};
//로고 정보와 메뉴 목록을 하나의 객체로 합쳐서 클라이언트에게 응답한다
res.status(200).json({
logoType: settings.logo_type,
logoText: settings.logo_text,
logoImage: settings.logo_image,
menus:  menusResult
});
});
    });
});

//[관리자] 메인 배너 설정 저장 및 불러오기 API
app.post('/api/settings/banner',(req, res) => {

    // 프론트엔드에서 보낸 3가지 데이터(배너타입, 단일이미지경로, 캐러셀배열)를 꺼냅니다.
    const { bannerType, singleBanner, carouselImages} = req.body;

    const updateBannerSql = `
    INSERT INTO banner_settings (id, banner_type, single_banner)
    VALUES (1, ?, ?)
    ON DUPLICATE KEY UPDATE
    banner_type = VALUES(banner_type),
    single_banner = VALUES(single_banner)
    `;

    // ? 자리에 [bannerType, singleBanner] 값을 넣어서 쿼리를 실행합니다.
    db.query(updateBannerSql, [bannerType, singleBanner], (err) =>{
        //쿼리 실행 중 에러가 났다면 백엔드가 죽지 않게 처리하고 에러 메시지를 보냅니다.
        if (err) {
            console.error('배너 설정 저장 에러:', err);
            return res.status(500).json({message:'배너 기본 설정 저장 중 오류가 발생했습니다.'});
        }

        /*
        2단계: 기존에 저장되어 있던 캐러셀 이미지들을 싹 지웁니다.
        (수정/삭제를 복잡하게 하는 대신, 다 지우고 새로 입력받은 걸로 덮어쓰는게 훨씬 안전하고 쉽습니다.)
        */
        db.query('DELETE FROM carousel_images', (err) => {
            // 삭제 중 에러 처리
            if(err) return res.status(500).json({ 
                message:'캐러셀 이미지 초기화 중 오류가 발생했습니다.'});
            //만약 프론트엔드에서 넘어온 캐러셀
            //이미지 배열(carouselImages)에 데이터가 1개라도 있다면
            if(carouselImages && carouselImages.length > 0) {
                //MySQL에 한꺼번에 넣기 위해, 
                //프론트엔드 배열 데이터를 [[url1], [url2]...] 형태로 변형합니다.
                const imageValues = carouselImages.map(img => [img.url]);
//변형한 데이터를 DB에 한 번에 쏟아 넣는 쿼리문입니다.
const insertImagesSql =
'INSERT INTO carousel_images (url) VALUES ? ' ;
db.query(insertImagesSql, [imageValues], (err) =>{
    //삽입중 에러 처리
    if(err) {
        console.error('캐러셀 삽입 에러:', err);
        return res.status(500).json({message:"캐러셀 이미지 저장 중 오류가 발생했습니다."});
    }
    // 모든 과정이 끝났으므로 프론트엔드에 성공 응답을 보냅니다.
    res.status(200).json({message:"배너 설정이 성공적으로 저장되었습니다."});
});

            }else{
                 res.status(200).json({message:"배너 설정이 성공적으로 저장되었습니다."});
            }

        })
    })


})

//2. [GET] 저장된 배너 설정을 '불러오는' API입니다.
app.get('/api/settings/banner',(req, res) => {
    //1단계: 기본 배너 설정(banner_settings) 데이터를 가져옵니다.
    db.query('SELECT * FROM banner_settings WHERE id = 1', (err, settingsResult) =>{
//조회 중 에러처리
if (err) return res.status(500).json({message:'배너 설정 불러오기 에러'});
//2단계: 캐러셀 슬라이드용 이미지들(carousel_images)을 가져옵니다.
db.query('SELECT id, url FROM carousel_images',(err, imagesResult) =>{
    //조회 중 에러 처리
if(err) return res.status(500).json({message:'캐러셀 이미지 불러오기 에러'});
//DB에 값이 있으면 그 값을 쓰고, 처음 접속해서 DB가 텅 비어있다면 우측의 기본값을 씁니다.
const settings = settingsResult[0] || {
    banner_type:'single',
    single_banner:'/assets/images/p-images/slide01.jpg'
};

//프론트 엔드로 보내기
res.status(200).json({
    bannerType:settings.banner_type,
    singleBanner: settings.single_banner,
    carouselImages:imagesResult
})

})
    })
})

//we are 섹션
//1. [POST] 관리자가 수정한 내용을 DB에 저장합니다.
app.post('/api/settings/weare',(req, res) => {
    // 프론트에서 보낸 3가지 데이터 꺼내기
    const{ mainTitle, mainDescription, features}=req.body;
    // 1단계: 상단 메인 영역 저장 (기존 데이터가 있으면 덮어쓰기)
    const updateMainSql=`
        INSERT INTO weare_main (id, main_title, main_description)
        VALUES (1, ?, ?)    
        ON DUPLICATE KEY UPDATE
        main_title = VALUES(main_title),
        main_description = VALUES(main_description)
    `;
    db.query(updateMainSql,[mainTitle, mainDescription], (err) =>{
        //에러발생시
        if (err) { 
            console.error('메인 설정 저장 에러:', err);
            return res.status(500).json({ message:'메인 설정 저장 중 오류 발생'});
        }

        //새로 넣을 아이콘 데이터가 존재한다면
        if(features && features.length > 0) {
            //MySQL에 한 번에 넣기 위해 형태를 변환
const featureValues = features.map(
    item => [item.icon, item.title, item.description]);
const insertFeatureSql =
'INSERT INTO weare_features (icon_class, title, description) VALUES ?';        

db.query(insertFeatureSql, [featureValues],(err) => {
    if (err) { 
        console.error('아이콘 항목 삽입 에러:', err);
        return res.status(500).json({message:'아이콘 저장 중 오류 발생'})
    }
    return res.status(200).json({message:'WE ARE 설정 저장 완료'})
        });
    } else {
        return res.status(200).json({message:'WE ARE 설정 저장 완료'})
    }
    });
});

//2. [GET] DB에 저장된 내용을 불러옵니다.
app.get('/api/settings/weare',(req, res) => {
// 1단계: 메인 영역 정보 가져오기
db.query('SELECT * FROM weare_main WHERE id=1', (err, mainResult) =>{
    if (err) return res.status(500).json({message:'메인 설정 불러오기 에러'});
//만약 DB가 비어있다면 쓸 기본값

db.query('SELECT id, icon_class AS icon, title, description FROM weare_features', (err, featuresResult) =>{
const mainData = mainResult[0] ||  { main_title: 'WE ARE', main_description:''};
//프론트엔드로 데이터 전송
res.status(200).json({
    mainTitle:mainData.main_title,
    mainDescription: mainData.main_description,
    features: featuresResult
})
})

})

})

// [관리자] WORK 섹션 설정 저장 및 불러오기 API
// 1. [POST] WORK 설정 및 이미지 저장 (upload.array를 통해 파일을 받습니다)
app.post('/api/settings/work', upload.array('workImages',8), (req, res) => {
    // 프론트에서 넘긴 줄 수 (문자열로 오므로 숫자로 변환)
    // || 2 만약 값이 제대로 안 넘어왔다면 기본값인 2(줄)를 사용합니다
    const rowCount = parseInt(req.body.rowCount) || 2;
    const files = req.files;//정보(이름, 크기 등)'를 꺼냅니다.
    //1단계: '몇 줄을 노출할 것인지(rowCount)'
    const updateSettingSql = `
    INSERT INTO work_settings (id, row_count)
    VALUES (1, ?)
    ON DUPLICATE KEY UPDATE row_count = VALUES(row_count)
    `;
    // 💡 참고: ON DUPLICATE KEY UPDATE는
    //  "id가 1인 데이터가 이미 있으면 새로 만들지 
    // 말고 값을 덮어씌워라!" 라는 아주 유용한 문법입니다.
    //위에서 만든 SQL 명령어를 실행
db.query(updateSettingSql, [rowCount], (err) => {
    // 만약 DB에 저장하다가 에러가 났다면?
    if(err){
        console.error('WORK 줄수 저장 에러:', err);
// 프론트엔드에 500(서버 에러) 번호와 함께 실패 메시지를 보냅니다.
return res.status(500).json({ message: '설정 저장 중 오류가 발생했습니다.' });        
    }

    //2단계: 줄 수 저장이 성공했고, 프론트에서 새로 올린 사진 파일이 1개라도 있다면?
    if(files && files.length > 0) {
        db.query('DELETE FROM work_images', (err) => {
            // 삭제하다 에러가 나면 멈춥니다.
            if (err) return res.status(500).json({ message: '이미지 초기화 에러' });
            //새로 올린 사진들의 '경로(주소)'를 배열형태로
const imageValues = files.map(file => [`/uploads/${file.filename}`]);
const insertImagesSql = 'INSERT INTO work_images (image_url) VALUES ?';
//명령어를 실행해서 DB에 사진 주소들을 넣습니다.
db.query(insertImagesSql, [imageValues], (err) => {
    if(err) {
console.error('WORK 이미지 저장 에러:', err);
return res.status(500).json({ message: '이미지 저장 중 오류가 발생했습니다.' });
    }
    res.status(200).json({message: 'WORK 설정이 성공적으로 저장되었습니다.'})
})
        })
    }else{
 res.status(200).json({message: '노출 줄수가 변경되었습니다.'});      
    }
});
});

app.get('/api/settings/work', (req, res) => {
// ① 1단계: DB에서 '몇 줄 노출할 건지(row_count)'를 가져옵니다.
db.query('SELECT * FROM work_settings WHERE id = 1',(err, settingsResult) => {
     if (err) return res.status(500).json({ message: 'WORK 설정 불러오기 에러' });
// ② 2단계: DB에서 저장된 '사진 주소'들을 싹 다 가져옵니다.
db.query('SELECT id, image_url AS previewUrl FROM work_images',(err, imagesResult) => {
    if (err) return res.status(500).json({ message: 'WORK 이미지 불러오기 에러' });

    const settings = settingsResult[0] || {row_count: 2};

    res.status(200).json({
        rowCount:settings.row_count,
        images:imagesResult
    })
})

})

})

//📝 [관리자] BLOG 섹션 설정 저장 및 불러오기 API

app.post('/api/settings/blog', upload.array('blogImages', 6), (req, res) => {

    const rowCount = parseInt(req.body.rowCount) || 1;
    //multer가 서버의 'uploads' 폴더에 방금 저장한 진짜 사진 파일들
    const files = req.files || [];

    /*안정장치
    프론트에서 글자나 날짜 데이터를 보낼 때, 
    1칸만 채워서 보내면 '글자'로 오고 여러 칸을 채우면 '배열(목록)'
    컴퓨터가 헷갈리지 않게 무조건 배열 모양( [데이터] )으로 통일시켜 주는 작업
    */
    const texts = Array.isArray(req.body.blogTexts) ? 
    req.body.blogTexts: [req.body.blogTexts]
    const dates = Array.isArray(req.body.blogDates) ? 
    req.body.blogDates: [req.body.blogDates]
    const existing = Array.isArray(req.body.existingImages) ?
    req.body.existingImages: [req.body.existingImages];

    //sql 몇 줄을 노출할 건지'를 blog_settings 테이블에 저장합니다
    const updateSettingSql = `
    INSERT INTO blog_settings (id, row_count)
    VALUES (1, ?)
    ON DUPLICATE KEY UPDATE row_count = VALUES(row_count)
    `;
    db.query(updateSettingSql,[rowCount], (err) => {
// 에러가 나면 프론트에 에러 메시지를 보냅니다.
if (err) return res.status(500).json({message:'BLOG 줄 수 저장 에러'});
//2단계: 깔끔한 저장을 위해 기존에 있던 블로그 글들을 싹 지웁니다.
db.query('DELETE FROM blog_items', (err) => {
    if(err) return res.status(500).json({message:'기존 블로그 비우기 에러'});
   // DB에 넣을 데이터
    const insertValues =[];

    // 줄 수가 1이면 3칸, 2면 6칸만큼 반복해서 바구니에 담을 준비를 합니다.
    const totalItems = rowCount === 1 ? 3 : 6;
    // 새로 올린 사진 중에 몇 번째 사진을 꺼내 쓸지 기억하는 숫자입니다.
    let fileIndex = 0;
//1번 칸부터 3번(혹은 6번) 칸까지 하나씩 확인하면서 데이터를 조립
    for(let i=0; i < totalItems; i++) {
// 최종적으로 DB에 저장될 이미지 주소
let finalImageUrl = '';
//경우의 수 A: 관리자가 사진을 안 바꾸고 '기존 사진'을 그대로 뒀을 때
if (existing && existing[i] && existing[i] 
    !== 'undefined' && existing[i] !== ''){
// 경우의 수 B: 관리자가 '새로운 사진 파일'을 첨부했을 때
}else if (files[fileIndex]){
    // 새로 만들어진 파일 주소를 씁니다.
    finalImageUrl = `/uploads/${files[fileIndex].filename}`;
    // 다음엔 그 다음 사진을 꺼내기 위해 숫자를 1 올립니다.
    fileIndex++;
}
// 텍스트와 날짜도 빈 값이면(undefined) 빈 칸('')으로 깔끔하게 처리합니다.
const finalDate = dates[i] && dates[i] !== 'undefined' ? dates[i] : '';
const finalText = dates[i] && texts[i] !== 'undefined' ? texts[i] : '';
    
// 조립이 끝난 [사진주소, 날짜, 글] 세트
insertValues.push([finalImageUrl, finalDate, finalText]);

}
//바구니(insertValues)에 모인 데이터를 통째로 DB에
const insertSql = 
'INSERT INTO blog_items (image_url, date_str, text_content) VALUES ?';

db.query(insertSql, [insertValues], (err) => {
        if(err){
console.error('BLOG 아이템 저장 에러:', err);
return res.status(500).json({message:'블로그 내용 저장 중 오류 발생'});
        }
res.status(200).json({message:'BLOG 설정이 성공적으로 저장되었습니다.'});
    });
});
    });
});

//2.프론트엔드에서 "저장된 블로그 정보 좀 줘!" 라고 요청할 때 데이터를 보내줍니다.
app.get('/api/settings/blog', (req, res) => {
//1단계: 몇 줄(row_count) 보여주기로 했는지 설정값을 가져옵니다.
db.query('SELECT * FROM blog_settings WHERE id = 1',(err, settingResult) => {
    if (err) return res.status(500).json({ message: 'BLOG 설정 불러오기 에러' });

db.query('SELECT * FROM blog_items ORDER BY id ASC', (err, itemsResult) => {
        if (err) return res.status(500).json({message:'BLOG 아이템 불러오기 에러'});
// 만약 처음 사이트를 켜서 아무 설정이 없다면 기본값 1(줄)을 줍니다
 const settings = settingResult[0] || { row_count: 1};
//프론트엔드에 줄 수와 블로그 내용 배열 묶어서 전달
        res.status(200).json({
            rowCount:settings.row_count,
            blogs:itemsResult
        })
    })
})
})

// [관리자] CONTACT 문의내역 관리 API
app.get('/api/contacts', (req, res) => {
    const sql = 'SELECT * FROM contacts ORDER BY created_at DESC';
    db.query(sql, (err, results) => {
        if(err) return res.status(500).json({message:'문의 내역 조회 에러'});
        res.status(200).json(results);
    });
});
// 2. [PUT] 특정 문의의 답변 상태 변경하기
app.put('/api/contacts/:id/reply',(req, res) => {
    const contactId = req.params.id;
    const { is_replied } = req.body;
    const sql = 'UPDATE contacts SET is_replied = ? WHERE id = ?';
    db.query(sql,[is_replied, contactId], (err) => {
        if(err) return res.status(500).json({message:'상태 변경 에러'})
        res.status(200).json({message:'상태가 변경되었습니다.'});
    });
});
// 3. [PUT] 특정 문의의 조치사항(메모) 업데이트하기
app.put('/api/contacts/:id/memo', (req, res) => {
    const contactId = req.params.id;
    const { action_memo } = req.body;
    const sql = 'UPDATE contacts SET action_memo = ? WHERE id = ?';

    db.query(sql,[action_memo, contactId], (err) => {
        if(err) return res.status(500).json({message:'메모 업데이트 에러'})
        res.status(200).json({message:'메모가 저장되었습니다.'});
    });
})
// 4. [DELETE] 특정 단일 문의 내역 삭제하기
app.delete('/api/contacts/:id', (req, res) => {
    const contactId = req.params.id;
    const sql = 'DELETE FROM contacts WHERE id = ?';
    db.query(sql,[contactId], (err) => {
        if(err) return res.status(500).json({message:'삭제 에러'})
        res.status(200).json({ message:'삭제 되었습니다'});
    });
});
// 5. [POST] 선택된 문의 내역 일괄 삭제 (Bulk Delete)
app.post('/api/contacts/bulk-delete', (req, res) => {
    const { ids } = req.body;   
    if (!ids || ids.length === 0) {
        return res.status(400).json({message:'삭제할 항목이 없습니다.'});
    }
    // 배열 형태의 id들을 한 번에 지우는 쿼리 (IN 사용)
    const sql =
    'DELETE FROM contacts WHERE id IN (?)';
    db.query(sql,[ids], (err) => {
        if(err) return res.status(500).json({message:'일괄 삭제 에러'})
        res.status(200).json({message:'선택 항목이 일괄 삭제 되었습니다'});
    });

});

//프론트에서 쓰는 포스트
app.post('/api/contacts', (req, res) => {
    const { name, phone, email, message } =req.body;
const sql = 'INSERT INTO contacts (name, phone, email, message) VALUES (?,?,?,?)';

db.query(sql,[name, phone, email, message], (err, result) => {
    if(err) return res.status(500).json({ message:'문의 접수 에러'});
    res.status(200).json({message:'문의가 성공저긍로 저장되었습니다'});
});
})

//[관리자 & 사용자] MAP 지도 섹션 설정 API
// 1. [POST] 지도 설정 저장하기
app.post('/api/settings/map', (req, res) => {
    const {mapType, mapUrl} = req.body;

    const sql = `
    INSERT INTO map_settings (id, map_type, map_url)
    VALUES (1, ?, ?)  
    ON DUPLICATE KEY UPDATE map_type = VALUES(map_type),
    map_url = VALUES(map_url)
    `;
/*
위에서 만든 SQL 명령어의 물음표(?) 자리에 
mapType과 mapUrl을 순서대로 넣고 실행합니다.
*/
db.query(sql, [mapType, mapUrl], (err) => {
    //만약 DB 저장 중에 에러가 발생했다면?
    if(err){
        // 서버 검은 창(터미널)에 에러 원인을 빨간 글씨로 기록하고,
        console.error('지도 설정 저장 에러:', err);
        //프론트엔드에게 에러 번호(500)와 실패 메세지를 보냅니다
        return res.status(500).json({message:'지도 설정 저장 중 서버 에러가 발생했습니다.'});
    }
    /*
    에러 없이 무사히 저장되었다면
    프론트엔드에게 성공 번호(200)와 성공 메시지를 보냅니다.
    */
   res.status(200).json({message:'지도 설정이 성공적으로 저장되었습니다.'});
});

});

//[GET] DB에 저장되어 있는 지도 설정을 프론트엔드로 '불러오는' API입니다
app.get('/api/settings/map', (req, res) => {
    const sql = 
    'SELECT map_type AS mapType, map_url AS mapUrl FROM map_settings WHERE id = 1 ';

//명령어를 실행합니다. 결과물은 'results'라는 바구니에 담깁니다.
db.query(sql, (err, results) => {
    //만약 데이터를 가져오다가 에러가 났다면 프론트에 에러(500)를 보냅니다.
    if (err) return res.status(500).json({message:'지도 설정 불러오기 에러'});
//바구니에 데이터가 1개라도 들어있다면? (관리자가 한 번이라도 저장을 한 상태)
    if(results.length > 0) {
// 바구니의 첫 번째(0번째) 데이터를 통째로 프론트에 보내줍니다.
res.status(200).json(results[0]);
    } else {
//바구니가 텅 비었다면? (사이트를 처음 켜서 아직 아무것도 저장 안 한 상태)
res.status(200).json({mapType:'google', mapUrl:''});
    }
})

})

//관리자 끝


//서버실행
app.listen(5000,()=>{
    console.log('Server running on port 5000');
})