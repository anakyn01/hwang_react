#include <stdio.h>

double arr1(int p[], int len){
    double av =0;
    int i;
    for (i=0; i<len; i++){
        av += (double)p[i];
    }
    return av / len;
}

double arr2(int * p, int len){
    double av =0;
    int i;
    for (i=0; i<len; i++){
        av += (double)(*(p+i));
    }
    return av / len;
}

int main(){
    int arr[10] ={
        80,20,50,55,45,95,55,10,40,80
    };
    int len = 10;

    printf("%.2f", arr1(arr, len) + arr2(arr, len));

    return 0;
}