#include <stdio.h>

//두정수값을 서로 바꾸는 함수 but 값에 의한 호출이므로 원본값은 
//바뀌지 않음
void swap(int a, int b) {
int t =a; //임시변수 t에 a의 값을 저장
a = b; //b에 아까 보관해둔 t(원래 a의 값)
}

int main() {
    int a = 11;
    int b = 19;

    swap(a, b);

    switch(a) {
        case 1: b += 1;
        case 11: b += 2;//21 아래코드로 흘러간다
        default: b += 3; //24 
        break;
    }

    printf("%d", a-b);

    return 0;
}