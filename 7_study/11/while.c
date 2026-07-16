#include <stdio.h>

int main(){
    int i=0, c=0; 
    while (i < 10){
        i++;
        c*=i;
    }
    printf("%d", c);
}