#include <stdio.h>

int len(char*p);

int main(){
    char* p1 = "2022";
    //메모리의 맨앞글자 2의 주소
    char* p2 = "202207";

    int a = len(p1);//4
    int b = len(p2);//6

    printf("%d", a+b);    
}

int len(char* p){
    //문자열의 주소 p를 넘겨받아 길이를 잽니다
    int r =0;
    while(*p != '\0'){
/*
*p : 포인터 변수p가 가리키고 있는 현재위치의 진짜 글자 
이글자가 문자열의 긑을 의미하는 널문자가 아닐때가지 반복
*/        
        p++;//주소이동 다음칸 그다음칸 글자
        r++;
        //카운트증가 글자를 하나 확인했음으로 글자수 카운트 1올림
    }
    return r;
}
