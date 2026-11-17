//입력값이 54321일 경우 출력값이 43215로 출력되어야 한다

#include <stdio.h>

int main(){

    int n[5];
    int i;

    for(i=0; i <5; i++) {
        printf("숫자를 입력해 주세요: ");
        scanf("%d", &n[i]);
    }

    for (i=0; i<5; i++){
        //printf("%d", n[i]); 일반적인 경우
        printf("%d", n[(i+1) % 5]);
        /*
        1 % 5 = 1 n[1]
        2 % 5 = 2 n[2]
        3 % 5 = 3 n[3]
        4 % 5 = 4 n[4]
        5 % 5 = 0 n[0]
        알고리즘 문제에서 자주 사용하는
        큐 스택
        */
    }


    return 0;
}