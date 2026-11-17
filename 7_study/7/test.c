#include<stdio.h>
#include<stdlib.h>

//입력값은 홍길동,김철수,박영희 순서로 주어진다

char n[30];  //전역변수
char *test(){//문자열의 메모리 시작주소(포인터)
printf("입력하세요 : ");
gets(n);
//사용자로 부터 문자열을 입력받아 위에서 만든 유일한 전역변수 n에 저장
return n; 
//문자가 저장된 전역변수 'n'의 '메모리 주소'를 반환합니다.
}

int main(){
    
    system("chcp 65001");

    char * test1;
    char * test2;
    char * test3;

    test1 = test();
    test2 = test();
    test3 = test();

    printf("%s\n", test1);
    printf("%s\n", test2);
    printf("%s\n", test3);

    return 0;
}
