#include <stdio.h>

void main(){
    int i,j;
    int temp;
    int a[5] = {75,95,85,100,50};
    for(i=0; i<4; i++){
        for(j=0; j<4-1; j++){
            if(a[j] > a[j+1]){
                temp=a[j];
                a[j] = a[j+1];
                a[j+1] = temp;
            }
        }
    }
    for(i=0; i<5; i++){
        printf("%d", a[i]);
    }
}