package thread;

public class ThreadB extends Thread{
    private WorkObject workObject;

    public ThreadB(WorkObject workObject){
        //공유 작업객체를 받음
        setName("TheadA");//스레드이름변경
        this.workObject = workObject;
    }

    @Override
    public void run(){
        for(int i=0; i<10; i++){
            workObject.methodB();//동기화 메소드 호출
        }
    }
}
