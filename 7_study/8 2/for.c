#include <stdio.h>

int main(){

    char* a = "qwer";
    char* b = "qwtety";

    for(int i = 0; a[i] != '\0'; i++){
        for(int j=0; b[j] != '\0'; j++){
            if(a[i] == b[j]) printf("%c", a[i]);
//방금 고른 a의 글자 a[i]와 b[j]가 똑같다면 
//그 글자를 한글자 출력합니다
//qwe
        }
    }
/*
i = 0 q
i = 1 w
i = 2 e
*/
    return 0;
}