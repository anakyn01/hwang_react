package thread;

public class YieldExam {

    public static void main(String[] args){
        Y yA = new Y("workThreadA");
        Y yB = new Y("workThreadB");
        yA.start();
        yB.start();
        try{Thread.sleep(5000);}catch(InterruptedException e){}
        yA.work = false;
        try{Thread.sleep(10000);}catch(InterruptedException e){}
        yB.work = true;
    }
}
