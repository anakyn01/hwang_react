import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import {AppDataSource} from './config/data-source';
import {WorkOrder} from './entities/WorkOrder';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

//미들웨어
app.use(cors());
app.use(express.json());

AppDataSource.initialize()
.then(() => {
    console.log('데이터 베이스 성공적으로 연결되었습니다');

    // 조회 테스트 api
    app.get('/api/work-orders', async(req, res)=>{
const workOrderRepo = AppDataSource.getRepository(WorkOrder);
const orders = await workOrderRepo.find();
res.json(orders);
    });

    app.listen(PORT, () => { // 설정된 포트(4000번)에서 서버를 구동하고, 클라이언트의 요청을 기다리기 시작합니다. (이 코드가 실행되어야 비로소 서버가 켜집니다.)
      console.log(`🚀 MES Server running on http://localhost:${PORT}`); // 터미널에 서버가 정상적으로 실행되었음을 알리는 메시지를 출력합니다.
    });

}).catch((error: any) => {
    console.error('연결실패', error);
});
