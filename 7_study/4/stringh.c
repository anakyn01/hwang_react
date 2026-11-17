//문자열 복사 및 포인터 연산
#include <stdio.h>
#include <string.h>

/*strcpy와 동일한 역활을 하는 함수
char* d : 복사받을 목적지(destination) 배열의 포인터
char* s : 복사할 원본(source) 문자열의 포인터
*/
void sumFn(char* d, const char* s) {
    while (*s){
//포인터 s가 가리키는 문자가 널 문자('\0')가 아닐 때까지 반복
        *d = *s;
        //목적지 포인터를 다음 칸으로 이동시킵니다.
        d++;
        // 원본 포인터도 다음 칸으로 이동시킵니다
        s++;
    }
    //원본 문자열 복사가 끝나면, 목적지 문자열의 끝에도
    //문자열의 끝을 알리는 널 문자('\0')를 직접 넣어줍니다
    *d = '\0';
}

int main(){
    //변경되지 않는 원본 문자열 "first"를 
    //포인터 str1이 가리키게 합니다. (길이 5)
    const char* str1 = "first";
    //크기가 50인 문자열 배열 str2를 선언하고 "teststring"으로 초기화합니다
    char str2[50] = "teststring";
    //인덱스 번호들의 합을 누적해서 
    //저장할 변수 result를 0으로 초기화합니다.
    int result=0;
//sumFn 함수를 호출하여 str1("first")의 내용을 str2 배열에 덮어씌웁니다
    sumFn(str2, str1);
//str2 배열을 처음부터 끝(널 문자를 만날 때)까지 반복합니다.
    for(int i=0; str2[i] != '\0'; i++) {
        result += i;//0+1+2+3+4 = 10
    }
    printf("%d", result);

    return 0;
}

/*
f i r s t '\0', r, i,n,g \0
0 1 2  3 4
*/