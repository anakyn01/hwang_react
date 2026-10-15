const {sequelize, User} = require('./models');
const {Op} = require('sequelize');

async function seedData(){
    try{
await sequelize.authenticate();
console.log('mysql 연결성공');

// 1. 테이블을 지우기 위해 아주 잠깐 외래키 검사 기능을 끕니다.
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');

await sequelize.sync({alter:true});
console.log('테이블 구조 업데이트 완료(기존 회원 데이터 유지)!');

// 3. 테이블 재생성이 끝나면 다시 외래키 검사 기능을 켭니다. (안전 제일)
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

const dummyNames = ['지은', '민준', '수연', '동현', '서연', '지훈', '유진', '현우', '보영'];

console.log('테이블 초기화 및 생성 완료');

//기존 가짜 회원 지우기
await User.destroy({
where:{nickname:{[Op.in]: dummyNames}}
});

await User.bulkCreate([
{ email: 'test1@test.com', password: '123', age: 24, nickname: '지은', gender: 'F', bio: '카페 탐방', latitude: 37.6560, longitude: 127.0570, points: 5000, status: 'ACTIVE' },
      { email: 'test2@test.com', password: '123', age: 27, nickname: '민준', gender: 'M', bio: '한강 산책', latitude: 37.6590, longitude: 127.0580, points: 5000, status: 'ACTIVE' },
      { email: 'test3@test.com', password: '123', age: 22, nickname: '수연', gender: 'F', bio: '영화 보기', latitude: 37.6620, longitude: 127.0540, points: 5000, status: 'ACTIVE' },
      { email: 'test4@test.com', password: '123', age: 31, nickname: '동현', gender: 'M', bio: '술 한잔',   latitude: 37.6680, longitude: 127.0650, points: 5000, status: 'ACTIVE' },
      { email: 'test5@test.com', password: '123', age: 26, nickname: '서연', gender: 'F', bio: '맛집 탐방', latitude: 37.6710, longitude: 127.0500, points: 5000, status: 'ACTIVE' },
      { email: 'test6@test.com', password: '123', age: 28, nickname: '지훈', gender: 'M', bio: '코딩 스터디', latitude: 37.6750, longitude: 127.0700, points: 5000, status: 'ACTIVE' },
      { email: 'test7@test.com', password: '123', age: 25, nickname: '유진', gender: 'F', bio: '드라이브',   latitude: 37.6800, longitude: 127.0450, points: 5000, status: 'ACTIVE' },
      { email: 'test8@test.com', password: '123', age: 29, nickname: '현우', gender: 'M', bio: '동네 산책', latitude: 37.6850, longitude: 127.0750, points: 5000, status: 'ACTIVE' },
      { email: 'test9@test.com', password: '123', age: 23, nickname: '보영', gender: 'F', bio: '자전거 타기', latitude: 37.7000, longitude: 127.0900, points: 5000, status: 'ACTIVE' }
]);
console.log('9명의 테스트 유저 데이터 삽입 완료');
process.exit(0);
    }catch (error){
console.error('에러 발생:', error);
process.exit(1);
    }
}
seedData();