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
큐의 맨앞에 있는 가자 ㅇ오래된 데이터를 거내오는 역활을 합니다
먼저 들어온게 먼저나가는 FIFO
*/

int main(){

    Queue q = {{0}, 0, 0};

    enq(&q,1); enq(&q,2); deq(&q); enq(&q,3);

    int first = deq(&q);
    int second = deq(&q);
    printf("%d 그리고 %d", first, second);

    return 0;
}