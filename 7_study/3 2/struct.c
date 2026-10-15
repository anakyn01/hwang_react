#include <stdio.h>

//구조체 연결리스트 문제
struct Node{
    int value;
    struct Node* next;
};

void func(struct Node* node){
    //node가 null이 아니고 다음 노드도 null이 아닐때만 반복
    //노드가 2개이상 쌍으로 있을때
    while(node != NULL && node->next != NULL){
int t = node->value;
//현재 노드의 값을 임시 변수 t에 잠시 복사해 둡니다. (값이 지워지는 것을 방지)
node->value = node->next->value;
//현재 노드의 값에 다음 노드의 값을 덮어씌웁니다.
node->next->value = t;
//다음 노드의 값에는 아까 보관해둔 원래 현재 노드의 값을 넣습니다. 
//(이 3줄을 통해 인접한 두 노드의 값이 서로 바뀝니다.)
node = node->next->next;
//방금 두 노드의 값을 바꿨으니, 
//다음번 스왑을 위해 포인터를 두 칸 뒤로 껑충 점프시킵니다.
    }
}


int main(){
    struct Node n1 = {1, NULL};
    struct Node n2 = {2, NULL};
    struct Node n3 = {3, NULL};
    /*
    n1, n2, n3라는 노드 3개를 각각 만들고,
     값은 1, 2, 3을 넣습니다. 다음 노드를 가리키는 
    포인터는 일단 모두 NULL(비어있음) 상태로 둡니다.
    */
n1.next = &n3;//n1의 다음 노드로 n3의 메모리 주소를 연결합니다. (순서: n1 ➔ n3)
n3.next = &n2;//n3의 다음 노드로 n2의 메모리 주소를 연결

func(&n1);//완성된 연결 리스트의 시작점인 
//n1의 주소를 func 함수에 던져줍니다
/*
func 함수 내부의 변화:
첫 번째 쌍(n1과 n3): 값 1과 3을 맞바꿉니다.
 (현재 상태: n1(3) ➔ n3(1) ➔ n2(2))
*/
struct Node* current = &n1;
/*
결과를 화면에 찍기 위해 current라는 탐색용 화살표를 만들고,
다시 리스트의 맨 처음(n1)을 가리키게 합니다.
*/
while(current != NULL) {
    printf("%d", current->value);
    current = current->next;
}
/*
current가 NULL이 될 때까지(기차의 끝에 도달할 때까지) 반복합니다.
현재 가리키고 있는 노드의 값을 화면에 출력합니다.
리스트가 n1(3) ➔ n3(1) ➔ n2(2) 상태이므로, 
차례대로 3, 1, 2가 연달아 출력됩니다.
*/

    return 0;
}