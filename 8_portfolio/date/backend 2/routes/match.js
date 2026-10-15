//Express 라우터를 불러와서 새로운 라우터 객체를 만듭니다.
const express = require('express');
const router = express.Router();

/* DB와 통신하기 위해 필요한 모델들(유저, 매칭요청, 포인트내역)과 
트랜잭션용 sequelize를 불러옵니다.*/
const {User, MatchRequest, PointHistory, sequellize} = 
require('../models');

//1. 매칭 요청 API
router.post('/request', async (req, res) => {
    try{
//플러터에서 보낸 내 ID(senderId)와 상대방 ID(receiverId)를 꺼냅니다.       
const { senderId, receiverId} = req.body;

// DB에서 두 사람 사이에 이미 진행 중인 요쳥이 있는지 먼저 검색해봅니다.
const existing = await MatchRequest.findOne({
    where:{sender_id:senderId, receiver_id:receiverId}
});
//이미 요청을 보낸 기록이 있다면, 중복 요청을 막고 에러 메시지를 보냅니다.
if(existing){
 return res.status(400).json({success:false, 
    message:'이미 요청을 보냈습니다'});   
}
//새 매칭 요청을 DB에 'PENDING(대기 중)' 상태로 저장합니다.
await MatchRequest.create({
sender_id:senderId,
receiver_id:receiverId,
status:'PENDING'
});
//장이 완료되면 성공했다는 메시지를 플러터로 돌려보냅니다.
res.json({success:true, message:'요청 완료'});
    }catch(error){
res.status(500).json({success:false, message:'요청 실패'});
    }
});

//수락 및 거절 api
router.post('/respond', async(req, res) => {
    try{
// 요청번호(requestId), 내 ID(responderId), 
// 동작(action: ACCEPT 또는 REJECT)을 꺼냅니다.       
const{ requestId, responderId, action} = req.body;
//DB에서 해당 매칭 요청을 찾습니다.
const request = await MatchRequest.findByPk(requestId);
//요청이 아예 없거나 이요청을 받을 사람이 내가 아니라면 튕겨냄.
if(!request || request.receiver_id !== responderId){
return res.status(400).json({
success:false, message:'유효 하지 않은 요청입니다'    
});    
}

// 만약 거절(REJECT) 버튼을 눌렀다면
if(action === 'REJECT') {
await request.update({status:'REJECTED'});
return res.json({success:true, message:'거절 처리되었습니다'});
}

//만약 수락(ACCEPT) 버튼을 눌렀다면
if(action === 'ACCEPT'){
//해당 요청의 상태를 'ACCEPTED(수락됨)'로 바꿉니다. (이제 채팅 등이 가능해집니다)
await request.update({status:'ACCEPTED'});    
/*
2. 내가 이 사람을 수락했으니, 
나에게 요청을 보냈던 다른 사람들의 대기(PENDING) 요청은
모두 거절(REJECTED) 상태로 일괄 변경하여 깔끔하게 정리합니다.
*/
await MatchRequest.update(
{status:'REJECTED'},
{where:{ receiver_id:responderId, status:'PENDING'}}    
);
return res.json({ success:true, message:'매칭이 수락 되었습니다. 약속을 잡아보세요!'})
}
    }catch(error){
res.status(500).json({success:false, message:'서버 에러'});
    }
})

//만남완료 api(실제 만났을 때 포인트 동시 차감)
router.post('./complete', async(req, res) => {
const MATCH_COST = 10000;
//돈이 오가는 과정이므로 중간에 서버가 꺼져도 
// 원상복구되도록 '트랜잭션'을 시작합니다.
const t = await sequellize.transaction();
try{
const {requestId} = req.body;
//해당 매칭 요청을 찾아옵니다. (조회할 때도 트랜잭션 t에 묶어둡니다)
const request = 
await MatchRequest.findByPk(requestId,{transaction:t});
//요청이 없거나 아직 수락(ACCEPTED)된 상태가 아니라면 에러를 발생시킵니다.
if(!request || request.status !== 'ACCEPTED'){
throw new Error('정상적인 만남 완료 대상이 아닙니다');    
}
//매칭을 요청했던 사람(sender)과 
// 받은 사람(receiver)의 전체 정보를 DB에서 불러옵니다.
const sender = 
await User.findByPk(request.sender_id,{transaction:t});
const receiver =
await User.findByPk(request.receiver_id,{transaction:t});

//1.두 사람중 한명 이라도 포인트가 부족하면 그 즉시 진행을 멈추고 에러
if(sender.points < MATCH_COST || receiver.points < MATCH_COST){
throw new Error('포인트가 부족하여 만남을 완료할수 없습니다. 충전이 필요합니다');    
}
//매칭 상태를 최종 단계인 'COMPLETED(만남완료)'로 변경
await request.update({ status:'COMPLETED'},{transaction:t});

//포인트를 차감했다는 영수증을 양쪽 유저 이름으로 각각 만들어 저장합니다
await PointHistory.bulkCreate([
{user_id:sender.id, amount:-MATCH_COST, reason:'만남 완료(발신)'},
{user_id:receiver.id, amount:-MATCH_COST, reason:'만남 완료(발신)'},
],{transaction:t});
/*
여기까지 아무 에러 없이 왔다면, 
지금까지 진행한 모든 변경사항을 DB에 
완전 확정(commit)짓습니다.
*/
await t.commit();
res.json({success:true, message:'만남 완료! 양쪽 포인트가 차감되었습니다'})
}catch(error){
/*만약 위 과정중에 하나라도 애러가 나면..
트랜잭션이 발동하여 돈이 깎이기 전 상태로 되돌립니다*/
await t.rollback();
res.status(400).json({success:false, message:error.message});
}
});

module.exports = router;
