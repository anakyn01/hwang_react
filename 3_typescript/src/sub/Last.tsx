import React, {useState} from "react"

//13 데코레이터 @LogExecution 함수선언
function LogExecution(originalMethod:any,
    context: ClassMethodDecoratorContext){
 
        const methodName = String(context.name)
        //원래 함수를 새로운 함수로 교체
        return function replacementMethod(this:any, ...args: any[]){
            console.log(`[데코레이터 로그] ${methodName} 메서드 실행됨`);
            return originalMethod.apply(this, args);
        }
}

//9.네임스페이스 : 대시보드 관련 타입을 묶음
namespace DashboardApp{
    //8.리터럴 타입 정확히 4개의 문자열만 허용
    export type FetchStatus ='idle' | 'loading' | 'success' | 'error';
//10. 베이직 인덱스 시그니처 어떤 문자열키가 들어와도 값은 아무거나(any)를 허용하는 캐시
export interface DataCache {
    [key: string]: any;
}


}
//11.이름이 같은 인터페이스가 자동으로 하나로 합쳐짐
interface UserConfig {theme:'Light' | 'dark';}
interface UserConfig {language:string;}

//3.어드밴스 타입 & 6.mapped Types 모든키를 순회하며 읽기 전용으로 변환
type ReadonlyConfig = {
    readonly [K in keyof UserConfig]: UserConfig[K];
}

//5.컨디션 타입 t가 문자열이면 yes 아니면 no
type IsString<T> = T extends string ? 'YES':'NO';

//1.keyof 객체t와 그객체가 가진 키만 인자로 받도록 강제하는 유틸함수
function getConfigValue<T, K extends keyof T>(obj:T, key:K):T[K]{
    return obj[key];
}

//커스텀 에러 클래스 정의
class ApiError extends Error{
 //1.맴버 변수를 명시적으로 선언
 statusCode:number;

    constructor(statusCode: number, message: string){
        super(message);
        this.statusCode = statusCode;
        this.name = 'ApiError';
    }
}

//데이터 서비스 클래스
class DataService {
@LogExecution //13.Decorators사용
async fetchMockData() : Promise<string>{
    return new Promise((resolve, reject) =>{
        setTimeout(() =>{
            if(Math.random() > 0.6){
                reject(new ApiError(500, '서버 응답 실패'));
            }
            resolve('서버에서 가져온 1급 기밀데이터');
        }, 1000);
    });
}

}


export const Last = () => {
  return(
    <>
    <h1>마지막으로 중요한 14가지</h1>
    <p>
(1).keysof:객체 타입이 가진 '키(Key)값'들만 뽑아서 유니온 타입(|)으로 만들어주는 연산자
(2).null:값이 의도적으로 비어있음
(3).Advanced Types:기존의 기본 타입(string, number 등)을 조작하고 
결합하여 만드는 복잡한 타입들을 통칭합니다. 
(교차 타입, 유니온 타입 등이 포함됩니다).
(4).instanceof Type Guards : 특정 클래스로부터 생성되었는지 확인하면서 타입을
좁혀주는 문법
(5).Conditional Types: 조건에 따라 타입 결정
(6).Mapped Types : 기존 객체 타입에 키들을순회하면서 새로운 객체 타입을 찍어내는 기능
(7).Type Inference : 개발자가 타입을 안적어도 타입스크립트가 알아소 값을 보고
눈치껏 대려 맞추는 기능
(8).Literal Types : 넓은 범위가 아니라 특정한 값을 정확한 값자체를 타입으로 지정
(9).Namespaces : 코드가 충돌하지 않도록 관련된 변수 함수를 하나의 
고유한 이름공간으로 묶어주는 기능
(10).Basic Index Signatures : 객체의 키가 정확히 뭔지 모를때
키는 문자열이고 값은 숫자일꺼야 라고 동적으로 속성을 정의하는 방법
(11).Declaration Merging : 같은 이름이 인터페이스를 여러번 선언하면
타입 스크립트가 알아서 하나로 합쳐주는 기능
(12).Async Programming : async / await 이나 Promise를 사용하여
서버에서 데이터를 가져오는등 오래 걸리는 작업을 멈추지 않고 백그라운드에서 처리
(13).Decorators : 클래스나 메서드위에 @함수명 형태로 붙여서
기존 코드는 건드리지 않고 기능을 덧붙이거나 수정하자 장식자
(14).Error Handling : try...catch

    </p>
    </>
  )
}