#include <stdio.h>

typedef struct{//BankAcc 라는 통장 설계도
    int accNum; //계좌번호
    double bal;//잔액
}BankAcc;

double sim_pow(double base, int year){//거듭제곱 계산기 이자율 계산
int i;
double r = 1.0;
for(i=0; i<year; i++){
r = r * base;
}
return r;
}

void initAcc(BankAcc * acc, int x, double y){//계좌초기화
acc -> accNum = x;
acc -> bal = y;
}
/*
통장의 주소(*acc)를 받아서 화살표 연산자(->)를 이용해
원본 통장의 계좌번호에 x를 잔액에 y를 집어 넣습니다
*/

void xxx(BankAcc * acc, double *en){
if(*en >0 && *en < acc -> bal){
    //요청금액이 0보다 크고 통장잔액보다 작으면 출금
acc -> bal = acc -> bal - *en;
}else{
    acc -> bal = acc -> bal + *en;
}
}
void yyy(BankAcc * acc){
acc -> bal = acc -> bal * sim_pow((1+0.1),3);
//현재잔액에 3년치 복리이자 (10%)를 적용
}

int main(){
    BankAcc myAcc;
    //내통장 myacc를 만들고 메모리 주소를 넘겨 초기화합니다.
    initAcc(&myAcc, 9981, 2200.0);
    //상태: 계좌번호 9981, 잔액 2200.0
    double amount = 100.0;
    /*2. xxx 함수 호출 (100원 요청)
    100은 0보다 크고 잔액(2200)보다 작으므로
     if문(출금)이 실행됩니다.
     상태: 잔액 = 2200 - 100 = 2100.0
    */
    xxx(&myAcc, &amount);

    yyy(&myAcc);
    /* yyy 함수 호출 (복리 이자 10% 3년 적용) 
    sim_pow(1.1, 3)은 1.1 * 1.1 * 1.1 = 1.331
    잔액 = 2100.0 * 1.331 = 2795.1
    */
   //
    printf("%d and %.2f", myAcc.accNum, myAcc.bal);
//4. 최종 결과 출력 (소수점 둘째 자리까지 출력: %.2f)
    return 0;
}

/*
은행계좌 시뮬레이션
함수에 있는 내통장의 데이터를 다르 하무들이 조작할때
복사본을 넘겨주는 것이 아니라
메모리주소를 넘겨주어 원본 데이터를 직접 수정하게 만듬
*/