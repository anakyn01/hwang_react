#include <stdio.h>
#define MAX_SIZE 10
//스택의 최대 크기를 10으로 정의
int isWhat[MAX_SIZE];
// 데이터를 저장할 크기 10짜리 스택 배열
int point= -1;
/*
스택의 가장 위쪽(Top) 인덱스를 가리키는 변수입니다
배열이 비어있으므로 -1로 시작합니다.
*/
int isEmpty(){
    if (point == -1) return 1;
    //point가 -1이면 스택이 비어있다는 뜻 1(true)
    return 0; //비어있지 않으면 0(False)를 반환
}

int isFull(){
    if (point == 10) return 1;
    return 0;
    /*
    스택이 꽉 찼는지 확인합니다. 
    (※ 참고: MAX_SIZE가 10이므로 실제 최대 인덱스는 9입니다. 
    엄밀히는 point == 9 또는 point == MAX_SIZE - 1이 
    더 정확한 표현입니다.
    */
}
void into(int num){
    //정수형 데이터 num을 받아서 스택에 넣겠다는 뜻
    if (isFull()) printf("Full");
    //데이터를 넣기전에 스택에 빈자리가 있는지 먼저 검사합니다
    else isWhat[++point] = num;
    /*스택에 빈자리가 있을때 실제로 데이터를 배열에 집어 넣는 부분
    스택이 비어 잇을때 point -1 배열에는 -1 인덱스가 없음
    첫 데이터를 넣으려면 0번에 인덱스를 넣어야 함
    point 가 -1이기 때문에 0으로 올린뒤 num을 저장하기 때문에
    */

}

int take(){
    if (isEmpty() == 1) printf("Empty");
    // 스택이 비어있으면 "Empty"를 출력합니다.
    else return isWhat[point--];
    /*
현재 point 위치의 값을 반환하고, 
point를 1 감소시킵니다. (Pop 연산)    
    */
     return 0;
}

int main(int argc, char const *argv[]){

    int e;//선언만 사용하지 않은 죽은 코드

    into(5); into(2);
    //현재 스택에 상태 [5, 2] 가장위에는 2가 있음

    while(!isEmpty()){//스택이 비어있지 않는 동안 계속 반복
printf("%d", take());
//1. 가장 위의 2를 꺼내고 출력. 출력2 [5]
into(4); into(1);// [5,4,1]
printf("%d", take()); //1 출력 [5,4]
into(3);//4 3을 넣음 [5,4,3]
printf("%d", take());//[5,4]
printf("%d", take());//[5]
into(6);//[5,6]
printf("%d", take());//[5]
printf("%d", take());//[]


    }
    return 0;
}

/*
int argc(Argument Count) :
프로그램이 실행될때 전달된 인수(명령어 덩어리)총개수
특징 : 이값은 항상 1이상
왜냐하면 사용자가 추가 값을 넣지 않더라도, 
'프로그램의 실행 파일 이름' 자체가 첫 번째 인수로 
카운트되기 때문입니다.  

char const *argv[]
의미: 전달된 인수의 실제 데이터(문자열)들을 담고 있는 배열입니다.
argv[0]: 프로그램을 실행한 명령어(프로그램 이름 또는 경로)가 
무조건 들어갑니다.
argv[1]: 사용자가 입력한 첫 번째 추가 값입니다.
argv[2]: 사용자가 입력한 두 번째 추가 값입니다.
const의 의미: const는 "이 배열에 담긴 문자열을 프로그램 
코드 안에서 임의로 수정하지 않겠다(상수 취급하겠다)"는 의미
*/
