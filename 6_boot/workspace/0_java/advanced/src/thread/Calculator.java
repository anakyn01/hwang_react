package thread;

public class Calculator {
    //계산기가 값을 기억해둘 공간입니다 외부에서 함부로 못바꾸게 private
    private int memory;

    //숨겨둔 메모리값을 밖에서 읽어갈수 있게 해주는 기능입니다
    public int getMemory(){
        return memory;//현재 기억하고 있는 값을 돌려줍니다
    }

    /*동기화 메소드
    * synchronized(자물쇠)가 적혀있다..
    * 화장실 문 잠그는것과 같습니다
    * 한명 (스레드)가 이기능을 사용하면 다른 사람은 끝날때 까지 밖에서 기다립니다
    * */
    public synchronized void setMemory1(int memory){
        this.memory = memory;//욉부에서 전달받은 숫자를 계산기의 메모리에 저장합니다
        try{
 Thread.sleep(2000);
 //현재일하고 있는 작업자를 2초간 멈춤 2초 동안 멈춰있는 사이에
//다른작업자가 끼어 들어서 값을 바꾸지 못하는지 확인하려고
        }catch(InterruptedException e){}
        //잠자는 동안 누가 억지로 깨워서 에러가 나면 처리
        //2초가 지난뒤에 현재 일하고 있는 작업자 이름 저장된 값을 화면에 보여줍니다
        System.out.println(Thread.currentThread().getName()+": " +this.memory);
    }
    /*동기화 블록
    * 첫번째 기능(setmemmory1)과 똑같이 동작하지만 자물쇠를 채우는 방식이 다릅니다
    * */
    public void setMemory2(int memory){
        /*메소드 전체를 잠그지 않고 내가 꼭 보호하고 싶은 중요한 부분만 자물쇠를 채웁니다
         (this) 이 계산기 자체를 열쇠로 삼아 문을 잠그겠다는 뜻이에요
        * */
        synchronized (this){
            this.memory = memory;//값을 저장하고
            try{
                Thread.sleep(2000);//2초 동안 잠시 가다렸다가
            }catch(InterruptedException e){}
            //결과를 화면에 보여줍니다
            System.out.println(Thread.currentThread().getName() +": " + this.memory);
        }
    }

}
/*
왜 스레드를 쓰면서 synchronized쓰냐면
직원 A 가 계산기에 100을 입력하고 결과를 적으려는 찰나 (2초 동안 기다리는 중에)
직원 B가 와서 갑자기 50을 입력
이런일이 발생하지 않게 하기위해 내가 계산기를 쓰는 동안에는
아무도 건드리지 마..
자물쇠를 채우는 기능이 바로 synchronized
* */
