package thread;

public class Y extends Thread{
    public boolean work = true;

    //생성자
    public Y(String name){
        setName(name);
    }

    //메소드 스레드가 처리하는 작업은 반복적인 실행을 위해 for문이나 while문을
    //포함하는 경우가 많은데 가끔 무의미한 반복을 하는 경우가 있다

    @Override
    public void run(){
        while(true){
            if(work){
                System.out.println(getName()+" :작업처리");
            }else{
                Thread.yield();
                //다른 스레드에게 실행 양보
            }
        }
    }
}
