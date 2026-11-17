
//준비된 티켓

import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

class TicketOffice {

    private int ticketCount = 100; //준비된 티켓100장

    //예메 메서드
    public synchronized void bookTicket(){
        if (ticketCount > 0){
            //약속한것처럼 
            try{
                //스래드간의 경합을 극대화 하기위해 아주 짧은 지연시간 추가
                Thread.sleep(1);
            } catch (InterruptedException e){
                e.printStackTrace();
            }
            ticketCount--;//티켓차감
        }
    }
    //다른일 존재함
    public int getTicketCount(){
        return ticketCount;
    }
}


public class Multi_22 {

    public static void main(String[] args) throws InterruptedException{

        //준비된티켓 클래스를 office로 객체화 시킴
        TicketOffice office = new TicketOffice();
        int userCount = 300; //300명의 사용자가 동시접속

        ExecutorService executor = Executors.newFixedThreadPool(32);
        //스레드가 작업을 효율적으로 하기 위함인데,,미리 32명의 작업자를 생성하여 예 300명을 상대
        CountDownLatch latch = new CountDownLatch(userCount);
        //300개의 작업이 모두 끝날때까지 메인 스레드(프로그램의 메인흐름)가 
        // 기다려주도록 만드는 카운트다운 타이머
        //  300부터 시작하여 0이되면 풀림
        //반복되는 for loop
        for (int i=0; i < userCount; i++){
            //300개의 예매작업을 스레드풀에 던집니다
            executor.submit(()->{
                office.bookTicket();//각스레드가 예메를 시도
                latch.countDown();//예매시도가 끝날때 마다 래치의 숫자를 줄임
            });
        }

        latch.await();//카운트 다운이 0이 될때 까지..main 메서드는 기다림
        executor.shutdown();//모든 작업이 끝나서 고용했던 32명에 작업자를 퇴근

        System.out.println("모든 예매 시도 종료");
        System.out.println("남은 티켓수: " + office.getTicketCount());


        
    }
    
}
