import React, {useState} from 'react';

//1.Generic & class
class DataManager<T>{
   
    private data: T[];

    constructor(data: T[]){
        this.data = data;
    }

    //Utility Type: Partial을 사용하여 업데이트용 데이터정의
    updateItem(index:number, changes:Partial<T>){
//배열의 데이터를 수정하는 함수 Partial<T>T에 모든 속성을 
//선택사항(Optional로 바꿔주는 Utility Type)
/*
{id?:number name?:string price?:number}
*/
        this.data[index] = {...this.data[index], ...changes};

    }
    getData() {return this.data; }

    }


    //2. Union Type
    type Status = 'pending' | 'success' | 'error';

    //아이템이라는 자료형을 만듭니다
    interface Item {
        id: number; name:string; price:number;
    }



    /*
    DataManager<T>
    <T> 제네릭(generic) 어떤 자료형이든 들어올수 있는 
    빈 타입니다
    constructor(private data:T[]){}
    클래스가 만들어 질때 실행되는 생성자
    data라는 배열을 전달 받습니다
    T[]  T타입의 배열
    private이라서 클래스 밖에서는 직접 접근 할수가 
    없습니다

*/



export const ClassUnion = () => {
//3.제네릭 활용
const [manager] = useState(new DataManager<Item>([
    {id:1, name:'럭셔리 가방', price: 50000}
]));

 const [status, setStatus] = useState<Status>('pending');

 //4.Function Casting(as 키워드)
 const handleLog = (e: React.MouseEvent) => {
    //버튼을 클릭하면 실행되는 함수
    const target = e.target as HTMLButtonElement; //캐스팅
    console.log(target.textContent);
    //버튼안에 있는 글자를 출력합니다
 }

 const toggleStatus = () => {
    setStatus('success');
 }

    return(
        <>
        <h1>Status:{status}</h1>
        <button onClick={handleLog}>로그출력</button>
        <button onClick={toggleStatus}>상태변경하기</button>
        <pre>
            {JSON.stringify(manager.getData(), null, 2)}
        </pre>
<h1>핵심개념 설명</h1> 
<p>
Union(|) : 하나의 변수가 여러 타입중 하나를 가질수 있게 합니다
Function Casting : as 키워드를 사용하여 특정 함수나 값을 강제로 
다른 타입으로 간주하게 합니다
Class : 객체지향 프로그래밍에 틀타입스크립트에서 클래스에 타입을
엄격히 부여 할수 있습니다
Generic(): 함수나 크래스를 정의할때 타입을 고정하지 않고 사용할 타입을 지종
재사용성 극대화 이자 타입의 파라미터화
Utillity Type:타입스크립트가 기본 제공하는 타입변환 도구
{/*Partial<T> 모든 속성을 선택적으로 만듬
Pick<T, K>특정 속성만 골라냄
Readonly<T>:모든 속성을 읽기 전용으로 만듬
*/}
</p>       
        </>
    )
}