const {sequelize, User} = require('./models');
const {Op} = require('sequelize');

async function seedData(){
    try{
await sequelize.authenticate();
console.log('mysql 연결성공');

await sequelize.sync({alter:true});
console.log('테이블 구조 업데이트 완료(기존 회원 데이터 유지)!');

const dummyNames = ['지은', '민준', '수연', '동현', '서연', '지훈', '유진', '현우', '보영'];

console.log('테이블 초기화 및 생성 완료');

await User.bulkCreate([
{ nickname: '지은', gender: '여', bio: '카페 탐방', latitude: 37.6560, longitude: 127.0570, points: 5000 },
      { nickname: '민준', gender: '남', bio: '한강 산책', latitude: 37.6590, longitude: 127.0580, points: 5000 },
      { nickname: '수연', gender: '여', bio: '영화 보기', latitude: 37.6620, longitude: 127.0540, points: 5000 },
      { nickname: '동현', gender: '남', bio: '술 한잔',   latitude: 37.6680, longitude: 127.0650, points: 5000 },
      { nickname: '서연', gender: '여', bio: '맛집 탐방', latitude: 37.6710, longitude: 127.0500, points: 5000 },
      { nickname: '지훈', gender: '남', bio: '코딩 스터디', latitude: 37.6750, longitude: 127.0700, points: 5000 },
      { nickname: '유진', gender: '여', bio: '드라이브',   latitude: 37.6800, longitude: 127.0450, points: 5000 },
      { nickname: '현우', gender: '남', bio: '동네 산책', latitude: 37.6850, longitude: 127.0750, points: 5000 },
      { nickname: '보영', gender: '여', bio: '자전거 타기', latitude: 37.7000, longitude: 127.0900, points: 5000 }
]);
console.log('9명의 테스트 유저 데이터 삽입 완료');
process.exit(0);
    }catch (error){
console.error('에러 발생:', error);
process.exit(1);
    }
}
seedData();