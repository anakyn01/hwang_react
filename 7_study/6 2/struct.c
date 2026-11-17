#include<stdio.h>
#include<stdlib.h> //malloc, free

//헤더파일 및 구조체 정의
typedef struct Data{
    char c; //문자형 변수 c를 맴버로 가짐
    int *numPtr;
//정수형 메모리 주소를 저장할 포인터변수  numPtr을 맴버로 가집니다
}Data;//typedef 밑에서 struct선언 안해도 됨

//main함수(변수 선언 및 메모리 할당)
int main(){
    int num = 10; 
    //정수형 변수 num을 선언하고 10으로 초기화
    Data d1; 
    /*Data타입의 일반 구조체 변수d1을 선언
    stack memory => LIFO 후입선출
    브라우저로 치면 뒤로가기
반대 큐 First In First Out
    */
   Data *d2 = malloc(sizeof(struct Data));
   /*구조체 크기만큼 힙메모리[
   내가 원하는 만큼 잘라쓰는 다만 단점이..직접빌리고
   직접치우고
   ]를 동적할당하고 
   그구조체 포인터 D2에 저장*/
   d1.numPtr = &num;
   /*
   ㅇ리반 구초제 변수 d1 은 (.)점연산자를 사용하여
   numPtr에 접근한뒤 변수 num의 주소&를 저장합니다
   */
   d2->numPtr = &num;
   /*포인터 변수 d2는 화살표 연산자를 사용하여 numPtr에 접근한뒤
   변수 num의 주소를 저장*/

   printf("%d\n", *d1.numPtr);
   /*d1.numPtr은 num의 주소를 가지고 있으므로 
   앞에 역 참조연산자를 붙여 그주소안에 있는 실제 값인 10을 출력
   */
   printf("%d\n", *d2->numPtr);
   /*
   넘의 주소를 가지고 잇어서 그주소안에 있는 실제 값인 10을 출력
   */
  free(d2);
  return 0;

}