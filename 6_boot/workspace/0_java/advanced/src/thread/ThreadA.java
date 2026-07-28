package thread;

public class ThreadA extends Thread{
    private WorkObject workObject;

    public ThreadA(WorkObject workObject){
        //공유 작업객체를 받음
        setName("TheadA");//스레드이름변경
        this.workObject = workObject;
    }

    @Override
    public void run(){
        for(int i=0; i<10; i++){
            workObject.methodA();//동기화 메소드 호출
        }
    }
}
