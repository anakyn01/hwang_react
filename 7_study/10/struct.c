#include <stdio.h>

struct jsu{
    char name[12];
    // 이름을 저장할 문자 배열
    int os, db, hab, hhab;
/*OS 점수, DB 점수, 합계(hab), 
총합계(hhab)를 저장할 정수형 변수*/
};

int main(){
/*
크기가 3인 구조체 배열 st를 선언하고, 각 칸에 초기값을 채워 넣습니다.
초기화하지 않은 hab, hhab 변수에는 기본적으로 0(또는 쓰레기값)이 들어갑니다.
*/
    struct jsu st[3] = {
        {"데이터1", 95, 88},
        {"데이터2", 84, 91},
        {"데이터3", 86, 75}
    };

    struct jsu* p;
//구조체 jsu의 메모리 주소를 담을 수 있는 포인터 변수 p를 선언합니다
p = &st[0];
//포인터 p에 
//배열의 첫 번째 칸(st[0])의 주소를 저장합니다.
(p + 1)->hab = (p+1)->os + (p+2)->db;
//84 + 75 = 159를 hab에 저장
(p+1)->hhab = (p+1)->hab + p->os + p->db;
/*
바로 위에서 구한 (p + 1)의 hab 값 -> 159
os = 95, db = 88
*/
//(p+1)->hhab = (p+1)->hab + p->os + p->db;
/*
(p+1)->hab : 159


*/
printf("%d\n", (p+1)->hab + (p+1)->hhab);
// 159 + 342 
}