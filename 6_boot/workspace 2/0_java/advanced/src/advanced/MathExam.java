package advanced;

import java.util.Arrays;
import java.util.Random;

public class MathExam {

	public static void main(String[] args) {
		//로또
		int[] selectNumber = new int[6];
		//선택번호 6개가 저장될 배열생성
		Random random = new Random(3);
		System.out.print("선택번호:");
		for(int i=0; i<6; i++) {
			selectNumber[i] = random.nextInt(45) + 1;
			System.out.print(selectNumber[i] + " ");
		}
		System.out.println();
		
		//당첨번호
		int[] winningNumber = new int[6];
		random = new Random(5);
		for(int i=0; i<6; i++) {
			winningNumber[i] = random.nextInt(45) + 1;
			System.out.print(winningNumber[i] +  " ");
		}
		System.out.println();
		
		//당첨여부
		Arrays.sort(selectNumber);
		Arrays.sort(winningNumber);
		
		boolean result = Arrays.equals(selectNumber, winningNumber);
		System.out.print("당첨여부:");
		if(result) {
			System.out.println("1등에 당첨되셨습니다");
		}else {
			System.out.println("당첨되지 않았습니다");
		}
		
		
		double v1 = Math.ceil(5.1);
		double v2 = Math.ceil(-5.3);
		System.out.println("올림 : "+v1);
		System.out.println("올림 : "+v2);
		
		long v3 = Math.max(3, 7);
		long v4 = Math.min(3, 7);
		System.out.println("max : "+v3);
		System.out.println("min : "+v4);
		
		//소수 이하의 두자리 얻기
		double value = 12.3456;
		double temp1 = value * 100;
		long temp2 = Math.round(temp1);
		
	}
}
