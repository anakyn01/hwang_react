#include <stdio.h>
/*
정적(static)변수의 특징과 
변수의 유효범위 scope

*/
int func(){
    static int x = 0;//처음불릴때 딱 한번만 0으로 만들어짐

    x+=2;
    return x;
}

int main(){
    int x = 1; //프로그램에 아무런 영향을 주지 않는다
    int sum = 0; //결과값을 누적할 변수
    for(int i=0; i<4; i++) {
        x++; //2345 sum계산에는 안들어감
        sum += func();
        /*
        1) 0 + 2 = 2
        2) 2 + 4 = 6
        3) 6 + 6 = 12
        4) 8 + 12 = 20
        */
    }
    printf("%d", sum);

    return 0;

}