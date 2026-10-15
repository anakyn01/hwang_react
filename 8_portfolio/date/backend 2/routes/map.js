//Express 웹 프레임워크와 라우터(경로 관리 기능)를 불러옵니다.
const express = require('express');
const router = express.Router();
/*DB 모델들(User, MatchRequest)과 복잡한 쿼리를 직접 쓰기 
위한 sequelize 객체를 불러옵니다.*/
const { User, MatchRequest, sequelize } = 
require('../models');
/*
조건부 검색(예: '같지 않다', '작거나 같다' 등)을 
사용하기 위한 연산자(Op)를 가져옵니다.
*/
const{Op} = require('sequelize');

router.get('/nearby', async(req, res) => {
    try{
/*
플러터(URL)에서 보낸 위도(lat), 경도(lng), 반경(radius),
내 ID(userId) 값을 꺼냅니다.
*/
const {lat, lng, radius, userId} =req.query;
/*
거리 계산 함수는 '미터(m)'를 기준으로 하므로, 받아온 km(예: 3)에 1000을 
곱해 미터(3000)로 바꿉니다
*/
const radiusInMeters = parseFloat(radius) * 1000;

/*
지구 둥글기를 반영한 
정밀 거리 계산 함수(ST_Distance_Sphere)를 SQL 문장으로 만듭니다.
DB에 있는 사람의 (longitude, latitude)와 
내 현재 위치(lng, lat) 사이의 거리를 미터로 계산해 줍니다.
*/
const distanceQuery = sequelize.literal(
`ST_Distance_Sphere(point(logitude, latitude), point(${lng}, ${lat}))`    
);

/*
DB의 User 테이블에서 조건에 맞는 사람들을 모두(findAll) 찾아옵니다.
*/
const nearbyUsers = await User.findAll({
    where:{
//조건 A: 검색된 사람의 id가 내 id와 '같지 않아야 함' (목록에서 나 자신은 제외시킴)
id:{[Op.ne]: userId},
//조건 B:  위에서 만든 거리 계산식(distanceQuery)의 결과값이 설정한 반경(radiusInMeters)보다
//'작거나 같아야 함' (<=) 
[Op.and]:sequelize.where(distanceQuery, '<=', radiusInMeters)     
},
//5️⃣ 프론트엔드로 보낼 데이터(컬럼)만 골라냅니다.
attributes:[
 'id','nickname','gender','bio',
 //계산된 실제 거리(미터) 값도 
 //'distanceValue'라는 이름으로 결과에 포함해서 플러터로 보내줍니다.
 [distanceQuery, 'distanceValue']   
]
});
/*
6️⃣ 조건에 맞는 유저들을 무사히 찾았다면, 
성공 상태(true)와 함께 찾은 유저 리스트를 JSON 형태로 반환합니다.
*/
res.json({success:true, users:nearbyUsers});
}catch(error){
console.error(error);
res.status(500).json({
success:false, message:'서버 에러'
})
    }
})