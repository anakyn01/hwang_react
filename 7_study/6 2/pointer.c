#include<stdio.h>

int main(){

    char* p = "KOREA";
    /*\0문자 포함 6개
    현재 p는 첫글자인 k를 가르킴
    */
    printf("%s\n", p); //KOREA
    printf("%s\n", p+1); //OREA
    printf("%c\n", *p);//K
    printf("%c\n", *(p+3));//E
    printf("%c\n", *p+4);//O
    //컴퓨터 내부에서 K는 숫자 75인식 +4 => 79
    /*
    괄호안에 것이 먼저 계산
    E
    */
    /*
    *p p가 가리키는 주소에 있는 '실제 알맹이 값'을 꺼내오라는 뜻
    */

    return 0;
}