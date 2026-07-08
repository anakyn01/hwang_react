#include <stdio.h>

struct node{
int n1;//정수 데이터 변수
struct node *n2;
//자기자신과 똑같이 생긴 다른 
//node구조체의 메모리 주소를 저장할 포인터
};

int main(){

    struct node a = {10, NULL};
    struct node b = {20, NULL};
    struct node c = {30, NULL};

    /*
    연결 리스트의 시작점을 나타내기 위해 
    node 포인터 변수 head를 만들고, 
    첫 번째 노드인 a의 주소(&a)를 저장합니다.
    */
    struct node * head = &a;
    /*a의 포인터 변수 n2에 b의 주소(&b)를 저장하여 
    a가 b를 가리키게 연결합니다. (a -> b)*/
    a.n2 = &b;
    /*b의 포인터 변수 n2에 c의 주소(&c)를 저장하여, 
    b가 c를 가리키게 연결합니다. (b -> c)*/
    b.n2 = &c;

    printf("%d\n", head->n2->n1);

    return 0;

}