#include <stdio.h>
/*
완전수를 찾고 그합을 구하는 프로그램

*/

int test(int n) {
    int i, sum = 0;

    for (i=1; i <= n / 2; i++){
        if(n % i == 0)
        sum += i;
    }

    if(n==sum ) return 1;

    return 0;
}

int main() {

    return 0;
}