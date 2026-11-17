#include <stdio.h>
//큐 배열의 최대 크기를 3으로 지정
#define SIZE 3

typedef struct{
    int a[SIZE];//데이터를 저장할 크기 3짜리 배열
    int front;//데이터를 빼낼(dequeue)위치를 가리키는 화살표
    int rear;//데이터를 집어넣을(enqueue)위치를 가리키는 화살표
} Queue;
//큐 FIFO 선입선출 스택 LIFO 후입선출

//원형큐의 핵심 (값 + 1) % SIZE 이렇게 하면 0 -> 1 -> 2 -> 0 -> 1 -> 2
void enq(Queue* q, int val){
    q -> a[q->rear] = val;
    q -> rear = (q->rear + 1) % SIZE;
}
/*
큐의 맨뒤 (rear)에 새로운 데이터를 집어넣는 역활을 합니다
q라는 큐의 주소와 새로 집어넣을 숫자  val을 전달 받습니다

 q -> a[q->rear] = val;
 현재 rear(데이터가 넣을 위치 화살표)가 가르키고 있는 배열 
 a의 빈방에 가져온 값val을 쏙 집어넣는다
  q -> rear = (q->rear + 1) % SIZE;
  데이터를 방에  넣었으니 다음데이터를 넣기 위해
  rear화살표를 한칸 옆으로 이동시킵니다
*/

int deq(Queue* q) {
    int val = q -> a[q->front];
    q->front = (q->front + 1) % SIZE;
    return val;
}
/*

데이터 빼기 함수
큐의 맨앞에 있는 가장 오래된 데이터를 꺼내오는 역활을 합니다
먼저 들어온게 먼저나가는 FIFO
*/

int main(){

    Queue q = {{0}, 0, 0};
    /*
    배열 a는 [0,0,0]으로 초기화가 된다
    데이터를 뺄위치(front)=0, 넣을위치(rear)=0
    */

    enq(&q,1); 
    /*
    ② 첫 번째 데이터 넣기 enq(&q, 1)
    q->a[0] = 1; → 배열 0번 방에 1을 넣습니다. (상태: [1, 0, 0])
    rear = (0 + 1) % 3 → rear가 1로 이동합니다.
    */
    enq(&q,2); 
    /*
    q->a[1] = 2; → 배열 1번 방에 2를 넣습니다. (상태: [1, 2, 0])
    rear = (1 + 1) % 3 → rear가 2로 이동합니다.
    */
    deq(&q); 
    /*
    ④ 첫 번째 데이터 빼기 deq(&q)
    현재 front는 0입니다. 배열 0번 방에 있는 값 1을 빼냅니다
    (이 값은 어디에도 저장하지 않고 버려집니다.)
    front = (0 + 1) % 3 → front가 1로 이동합니다.
    */
    enq(&q,3);
    /*
    ⑤ 세 번째 데이터 넣기 enq(&q, 3)
    현재 rear는 2입니다. 배열 2번 방에 3을 넣습니다. (상태: [1, 2, 3])
    rear = (2 + 1) % 3 → 
    rear가 3이 아니라 0으로 다시 돌아갑니다! (원형 큐의 핵심)
    */

    int first = deq(&q);
    /*
    현재 front가 1이므로, 배열 1번 방에 있는 값 2를 꺼내서 first에 저장합니다.
    front = (1 + 1) % 3 → front가 2로 이동합니다.
    */
    int second = deq(&q);
    /*
    현재 front가 2이므로, 배열 2번 방에 있는 값 3을 꺼내서 second에 저장합니다.
    front = (2 + 1) % 3 → front가 다시 0으로 이동합니다.
    */
    printf("%d 그리고 %d", first, second);
//최종적으로 first에 들어간 2와 second에 들어간 3이 출력됩니다.
    return 0;
}