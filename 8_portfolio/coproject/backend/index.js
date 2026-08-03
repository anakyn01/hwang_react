const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
//프론트엔드에서 보내는 JSON 데이터를 읽기 위한 설정입니다.

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


//관리자 끝


//서버실행
app.listen(5000,()=>{
    console.log('Server running on port 5000');
})