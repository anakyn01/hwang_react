package thread;

public class WaitNotify {
    public static void main(String[] args){
        WorkObject workObject = new WorkObject();//공유 작업 객체 생성

        ThreadA threadA = new ThreadA(workObject);
        ThreadB threadB = new ThreadB(workObject);

        threadA.start();
        threadB.start();

    }
}
