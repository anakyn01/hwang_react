package thread;

public class ThreadA extends Thread{
    private WorkObject workObject;

    public ThreadA(WorkObject workObject){
        setName("TheadA");
        this.workObject = workObject;
    }
}
