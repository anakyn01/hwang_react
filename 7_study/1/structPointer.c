#include <stdio.h>
#include <stdlib.h>//malloc

/*c언어의 단일 연결리스트(Singly Linked List) 문제
데이터를 차고차곡 연결하고 특정데이터를 맨 앞으로 자리이동시키는
알고리즘
*/
typedef struct Data{
    //연결리스트 각칸의 노드를 정의하는 구조체
    int value;//실제 숫자 데이터가 들어갈 방
    struct Data *next;
    //다음 노드가 어디 있는지 주소르 가르키는 화살표
} Data;

//리스트에 맨앞에 새로운 숫자를 끼워 넣는 함수
Data* insert(Data* head, int value){
    //1.새로운 노드(방)를 메모리에 만듬
    Data* new_node = (Data*)malloc(sizeof(Data));
    //2.새로만든방에 숫자를 끼워넣음
    new_node->value = value;
    //새 노드의 화살표가 기존의 맨앞에 노드를 가르키게 합니다
    new_node->next = head;
    //이제 새노드가 맨앞이 되므로 리턴
    return new_node;
}

//특정숫자를 찾아서 리스트의 맨 앞으로 끌어오는 함수
Data * reconnect(Data* head, int value){
//리스트가 비워있거나 찾는숫자가 맨앞에 있다면 종료
    if(head == NULL || head->value == value) return head;
//prev 이전노드 curr현재 노드를 가르킴
    Data *prev = NULL, *curr = head;
//리스트를 끝까지 다 뒤지거나 원하는 숫자를 찾을때 까지 화살표를 타고 이동
    while (curr != NULL && curr->value != value) {
        prev = curr;//한칸 이동하기전에 현재 위치를  prev 에 기록
        curr = curr->next;//다음칸으로 넘어감
    }

    if(curr != NULL && prev != NULL) {//만약 원하는 숫자를 찾았다면
        prev->next = curr ->next;//화살표가 내 다음 노드를 가르켜 나르 ㄹ줄에서 배낸다
        curr->next=head;//맨앞으로 빠져나온 화살표가 기존의 맨앞으 ㄹ가르키게 합니더
        head = curr;//이제 내가 맨앞이 된다
    }
    return head;//새로 갱신된 맨앞을 리턴
}

int main(){
    Data *head = NULL, *curr;//처음에 리스트 비워잇음

    //1부터 5까지 숫자를 순서대로 맨앞에 끼움
    for(int i =1; i<= 5; i++)
        head = insert(head, i);

    head = reconnect(head, 3);//숫자 3을 찾아서 맨앞으로 끌어옴

    //맨앞에서 부터 끝까지 화살표를 타고 가면서 숫자를 출력
    for(curr = head; curr != NULL; curr = curr->next)
    printf("%d", curr->value);

    return 0;
}


/*
연결리스트
1단계 1 ~5 까지 숫자 삽입
초기 리스트 54321

2단계
화살표를 타고가다가 3을 찾습니다
3을 찾고 반복문이 멈춤

3단계
3을 빼서 맨앞으로 옮기기
3 5 4 2 1
*/