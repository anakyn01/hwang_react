package thread;

public class State {

    public static void main(String[] args){
        SumThread sumThread = new SumThread();
        sumThread.start();
        try{
            sumThread.join();
        }catch(InterruptedException e){

        }
        System.out.println("1~100 합: " + sumThread.getSum());
    }
}
/*
- 일시정지 -
sleep : 주어진 시간 동안 스레드를 일시정지 주어진
시간이 지나면 자동적으로 실행대기
join() : 메소드를 호출한 스레드는 일시 정지 상태가 된다
실행되기 상태가 되려면, join()메소드를 가진 스레드가 종료되어야 한다
wait() : 동기화 블록네에서 스레드를 일시 정지 상태로 만든다

- 일시정지에서 벗어남 -
interrupt() : 일시정지 상태일경우 InterruptedException을 발생시켜
실행대기 상태 또는 종료 상태로 만듭니다
notify() :
notifyAll() : wait()메소드로 인해 일시정지 상태인 스레드를 실행 대기 상태로 만든다

- 실행대기로 보냄
yield() : 실행 상태에서 다른 스레드에세 실행을 양보하고 실행대기 상태가 된다

스레드 상태
1) 스레드 객체를 생성 하고 (new)
2) start()메소드를 호출하면
3) 곧바로 스레드가 실행되는 것이 아니라 실행대기상태(RUNNABLE)가 된다
4) 실행대기 하는 스레드는 CPU스케쥴링에 따라 CPU점유하고 run()메소드를 실행합니다
이때 실행(Running)상태라고 한다
5) 실행스레드는 run()메소드를ㄹ 모두 실행하기전에 스케뷸링에 따라
다시 실행대기 상태로 돌아갈수 잇다
6) 이렇게 스레드는 싱행대기 상태와 실행상태를 번갈아 가면서
자신의 run()메소드를 조금씩 실행..
7) run 메소드가 종료되면 종료상태(TERMINATED)
8) 실행상태에서 일시정지 상태로 가기도 하는데 일시정지 상태는 스레드가 실행할수 없는 상태
*/