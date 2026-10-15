//이중포인터와 포인터 연산을 묻는 문제
#include <stdio.h>

void func(int** arr, int size) {
    //main에서 넘겨준 pp를 여기서는 arr이 이름으로 받음
    for(int i=0; i<size; i++){
        *(*arr + i) = (*(*arr+i) + i) % size;
    }
}//배열의 기존값에 현재 인덱스 번호를 더한뒤 5로 나눈 나머지를
//다시 배열로

int main(){

    int arr[] = {3,1,4,1,5};
    //배열 arr을 만들고 5개의 숫자를 넣습니다.
    int* p = arr;
    //포인터 p를 만들고 
    //배열 arr의 시작 주소(0번 방의 주소)를 가리키게 합니다.
    int** pp = &p;
    //이중 포인터 pp를 만들고, 포인터 p의 주소를 가리키게 합니다.
    int num= 6;
    func(pp, 5);
    num = arr[2];
    printf("%d", num);
    /*
    i=0 arr[0] = (3 + 0) % 5 3
    i=1 arr[1] = (1+1) % 5 2
    i=2 arr[2] 1
    i=3 arr[3] 4
    i=4 arr[4] 4 
    */

    return 0;
}