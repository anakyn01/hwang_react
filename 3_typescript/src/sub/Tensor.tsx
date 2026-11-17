import React,{useEffect, useRef, useState} from 'react';
/*import * as tf from '@tensorflow/tfjs';
import Plotly from 'plotly.js-dist-min';*/
const tf = (window as any).tf;
const Plotly = (window as any).Plotly;


const Tensor: React.FC = () => {
    //React컴포넌트를 만듬 : 이콤포넌트가 화면 하나를 담당합니다
const plotRef = useRef<HTMLDivElement>(null);
//이 div를 기억해...
const [isTraining, setIsTraining] = useState(true);
//현재 AI가 학습중인지 저장 true학습중이라는 얘기 학습이 끝나면 false

useEffect(() => {//페이지 열리면 실행
//TensorFlow작업하는 함수를 만듬 why async 학습은 시간이 걸린다 
// 그래서 기다릴수 있는 함수를 만듬
    const runTensorflow = async () => {

        //1.학습 데이터 생성
        const xs = tf.tensor([0,1,2,3,4]);
        const ys = xs.mul(1.2).add(5);//y = 1,2x + 5
        //즉 ai에게 결과를 알려줌

        //2.선형회귀 모델 정의
        const model = tf.sequential();//ai모델 하나를 만듬
        model.add(//모델에 층(Layer)을 추가
            tf.layers.dense(
                //입력이 출력과 연관된 가장 기본적인층
               { units:1, inputShape:[1]} 
               //출력이 1개 입력도 하나
            )
        );

        //3.모델 컴파일 (손실 함수 및 최적화 설정)
        model.compile({loss: 'meanSquaredError', optimizer:'sgd'});
        //오차계산, 정답에 가까워지는 알고리즘

        //4. 모델학습 (await을 사용하여 학습완료 대기)
        await model.fit(xs, ys, { epochs: 500});
        //학습을 시키는 데 500번 반복학습을 한다 반복하면서 직선을 맞춰가는것
        //await 학습이 끝날때 까지 기다려
        setIsTraining(false);//학습종료

        //5. 예측및 데이터 준비..그래프용 배열만들기
const xMax = 10; //10까지 예측
const xArr:number[] = [];
const yArr:number[] = [];

for (let x  =0; x <= xMax; x++) {
const result = model.predict(tf.tensor([x])) as tf.Tensor;
//  상수 리절트에 = 현재 모델이 x를 보고 y를 예측이라 텐서로 바꿈 3이라면 tensor([3])
const yValue = await result.data(); //텐서에서 실제 값 추출 .data()

//배열 저장
xArr.push(x);//x를 저장
//예측값 저장
yArr.push(yValue[0]);

//텐서는 메모리를 왕창 사용 사용이 끝나면 삭제
result.dispose();

}

//6.결과 시각화  
if(plotRef.current) {//데이터를 그릴 div가 존재하는지 확인
    const data:Plotly.Data[]=[
        {//Plotly가 사용할 데이터를 만듬
        x:xArr, y:yArr, mode:'markers', type:'scatter',
        marker:{color:'blue', size: 10}
        },
    ];

    //그래프의 디자인
    const layout: Partial<Plotly.Layout> = {
        title:{text:'텐서플로우js 선형회귀 결과'},
        xaxis:{range:[0,11], title:{text:'X축'}},
        yaxis:{range:[0,20], title:{text:'Y축'}},
    };
    Plotly.newPlot(plotRef.current, data, layout);
}
    //메모리 정리를 위해 학습용 데이터 텐서 해제
    xs.dispose();
    ys.dispose();
};

      runTensorflow();  

},[]);

    return(
        <>
        <h2>출력</h2>
        {isTraining ?(
            <p>모델 학습중 잠시만 기다리세요</p>
        ):(
            <p>학습완료 예측 결과가 그래프에 표시됩니다</p>
        )}
        <div
        ref={plotRef}
        />
<h1>TensorFlow</h1>
<p>
- 구글에서 만든 딥러닝 프레임워크
- 주요특징 -
브라우저 내 학습 및 추론 : 서버없이 사용자의 브라우저에서 머신러닝 모델 실행
GPU가속 : 브라우저의 WebGL / WebGPU를 사용하여 하드웨어 가속을 
활용하여 복잡한 계산도 빠르게 처리
파이선으로 학습된 TensorFlow모델을 자바스크립트용으로 변환하여 브라우저에서 실행
전이학습(transfer Learning) 이미학습된 모델을 가져와 자바스크립트에서
적은 데이터로 재학습 할수 있다

예제코드에 핵심개념
Tensor : TF.js 기본데이터의 단위 (배열과 유사하지만 GPU  연산에 최적화)
Sequential Model : 레이어를 순차적으로 쌓는 가장 기본적인 모델형태
Dense Layer: 모든 입력과 출력이 연결된 전결합층 선형회귀 구현시 사용
Loss(손실함수) : 모델이 얼마나 틀렸는지 계산
Oprimizer(최적화) : 틀린 만큼 모델의 가중치를 수정하는 알고리즘 예 sgd확률적 경사 하강법

텐서플로우 설치
npm install @tensorflow/tfjs plotly.js-dist-min
npm install --save-dev @types/plotly.js-dist-min

선형 (linear) : 데이터의 관계가 1차 방정식 직선의 형태를 띨것이라 가정
회귀 (regression) : 데이터들이 아무리 흩어져 있어도,
 결국 어떤 특정한 평균적인 선(경향성)으로 되돌아가려는(회귀하려는) 성질을 
 의미합니다.

 수식: y = Wx + b
 x (입력 변수): 우리가 알고 있는 데이터 (예: 집의 평수, 공부한 시간)
 y (출력 변수): 우리가 예측하고 싶은 값 (예: 집의 가격, 시험 점수)
 W (가중치, Weight): 직선의 기울기. x가 y에 얼마나 큰 영향을 미치는지 나타냅니다.
 b (편향, Bias): 직선의 높낮이(y절편). x가 0일 때의 기본값을 의미합니다.
 선형 회귀의 최종 목표는 수많은 x와 y데이터 쌍을 보고, 
 가장 오차가 적은 최적의 W와 b를 찾아내는 것입니다.
</p>
        </>
    )
}
export default Tensor