package thread;
//교대 근무(핑퐁게임)

//두직원이 번갈아 가며 사용할 공용 작업장
public class WorkObject {
    public synchronized void methodA(){//동기화 메소드
        Thread thread = Thread.currentThread();

        //누구누구 작업실행
        System.out.println(thread.getName() + ": methodA 작업실행");
        //야 일어나 네 차례야 깨운다고 바로 일을 하는것이 아니라 내가 자물쇠를 풀어줘야 합니다
        notify();
        try{
        wait();//난 내할일이 끝났으니 쉴께
        }catch(InterruptedException e){}
    }

    public synchronized void methodB(){//동기화 메소드
        Thread thread = Thread.currentThread();
        System.out.println(thread.getName() + ": methodB 작업실행");
        notify();
        try{
            wait();
        }catch(InterruptedException e){}
    }
}
/*
경우에 따라서는 두 개의 스레드가 번갈아 가며 실행할때가 있다
정확한 교대 작업이 필요할 경우
자신의 작업이 끝나면 상대방 스레드를 일시 정지 상태에서 풀어주고
자신은 일시 정지상태로 만들면 된다
이 방법에 핵심 공유객체에 있다
공유객체는 두 스레드가 작업할 내용을 각각 동기화 메소드로 정해 놓는다
한스레드가 가업을 완료하면 notify()메소드를 호출해서 일시 정지
상태에 있는 다른 스레드를 실행 대기 상태로 만들고
자신은 두번 작업을 하지 않도록 wait()메소드를 호출하여 일시 정지 상태로
만든다

notify()는 wait()에 의해 일시 정지된 스레드 중 한개를 실행 대기
상태로 만들고
notifyAll()은 wait()에 의해 일시정지된 모든 스레드를 실행 대기 상테로
만듭니다

주의사항은 이 두메소드는 동기화 메소드 또는 동기화 블록에서 가능합니다
* */