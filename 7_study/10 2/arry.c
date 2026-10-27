#include <stdio.h>

int main(){
    int *arr[3];
    int a = 12, b=24, c=36;
    arr[0] = &a;
    arr[1] = &b;
    arr[2] = &c;

    printf("%d\n", *arr[1] + **arr + 1);
    /*
    24
    12 + 1
    */
}