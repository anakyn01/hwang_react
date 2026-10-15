#include <stdio.h>
#include <string.h>

void reverse(char* str){
  int len = strlen(str); //문자열의 길이를 구합니다 (len = 8)
  //두 글자를 맞바꿀때 잠시 담아둘 빈 상자(변수)입니다
  char temp;

  char*p1 = str; 
  //배열의 시작주소 즉 맨 처글자인 a를 가리킵니다
  char*p2 = str + len - 1;
  //마지막 글자인 h를 가르킵니다

  while(p1<p2){
    //p1이 p2보다 왼쪽에 있는 동안 (가운데서 만날때까지) 계속 반복
    /*전형적인 맞교환로직
    빈상자 temp를 이용하여 p1가르키는 글자와 p2가 가르키는
    글자의 자리를 바꿉니다
    
    */
    temp = *p1; //빈상자에 p1을 복사
    *p1 = *p2;//맨 끝에 자리에 있는 글자를 p1에 자리에 덮어스기
    *p2 = temp;//아까 복사해 놓은걸 p2자리 로 이동
    p1++;//왼쪽 포인터를 올느쪽으로 한칸 다음 글자로 이동
    p2--;//오른쪽 포인터를 왼쪽으로 한칸이동
  }

}

int main(int argc, char* argv[]){

    char str[100] = "ABCDEFGH";
    /*
    HGFEDCBA
    [01234567]
    G E C A
    1 3 5 7
    */

    reverse(str);//함수실행

    int len = strlen(str);

    //i가 1부터 시작하고 2씩 증가
    for(int i=1; i<len; i+=2){
        printf("%c", str[i]);
    }
    printf("\n");

    return 0;
}
/*
이문제는
포인터를 활용하여 문자열을 뒤집는 
Reverse알고리즘과 배열의 인덱스를 다루는법을
학습
핵심
문자열 뒤집기 : 문자열의 맨 앞과 뒤에 포인터를 두고
서로의 글자를 맞바꾼뒤에 점점 가운데로 좁혀오며
문자열 전체를 완전히 뒤집습니다
홀수 인덱스 추출
i += 2 를 이용하여 인덱스번호가 1,3,5,7인 자리의
글자만 쏙쏙 골라내서 출력
*/