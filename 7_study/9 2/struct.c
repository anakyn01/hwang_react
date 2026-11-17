#include<stdio.h>

struct A{//A라는 이름의 구조체(데이터묶음틀)설계
    int n; 
    int g;
};

int main(){
   struct A a[2];
   //위에서 설계한 A상자 2개를 나란히 붙여서 a라는 이르므이 배열로 만듬

   //반복문을 통한 상자 채우기
   for(int i=0; i < 2; i++){
    a[i].n = i;
    a[i].g = i+1;
   }
   /*
   a[0].n = 0; a[0].g = 0+1;
   */

   printf("%d\n", a[0].n +a[1].g);

   return 0;
}