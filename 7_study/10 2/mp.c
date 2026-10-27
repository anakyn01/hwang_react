#include<stdio.h>

int mp(int base, int exp){
    //거듭제곱을 계산하는 사용자 정의 함수입니다.
    int res = 1;
    /*
곱셈의 결과를 누적할 변수 res를 1로 초기화합니다. 
덧셈은 0부터 시작해야 하지만, 
곱셈은 0을 곱하면 무조건 0이 되므로 1부터 시작합니다.   
    */
   for(int i=0; i < exp; i++){
    /* 
변수 i가 0부터 시작해서 
지수(exp, 여기서는 10)보다 작을 때까지 1씩 증가하며 반복합니다. 
10번 반복하게 됩니다   
    */
   res = res * base;
   }
   return res;
}

/*
C언어에서 거듭제곱(지수승)을 계산하는 함수
mp라는 함수는 밑(base)과 지수(exp) 두 개의 숫자를 입력받아
밑을 지수번 만큼 반복해서 곱하는 기능

main 에서 호출할때
mp(2, 10)
*/
int main(){
    int res;
    res = mp(2, 10);
    printf("%d", res);
    return 0;
}