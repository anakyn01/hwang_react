#include <stdio.h>

int main(){ //2023을 4의 배수로 구하는 문제
    int c = 0;
    for (int i =1; i <= 2023; i++) {
        if(i % 4 == 0) {
            c++; 
        }
    }
    //2023 / 4  = 505.75
    printf("%d", c);
}