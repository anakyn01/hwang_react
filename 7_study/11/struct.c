#include <stdio.h>

struct good{
//이름(name)과 나이(age)를 묶어서 저장할 수 있는 'good'이라는 구조체를 만듭니다.
    char name[10];
    // 최대 9글자의 이름을 저장할 수 있는 문자 배열
    int age;// 나이를 저장할 정수형 변수
};

int main(){
    // 프로그램이 시작되는 메인 함수입니다.
    
    struct good s[] = {"Kim",28, "Lee", 38, "Seo", 50, "Park",35};
    //구조체 good의 메모리 주소를 가리킬 수 있는 포인터 변수 p를 선언합니다.
    struct good *p;
    p = s;//이름(s)은 배열의 첫 번째 칸의 주소와 같습니다
    p++;//포인터 p를 다음 칸으로 이동
    printf("%s\n", p -> name);//Lee
    printf("%d\n", p->age);//38
}