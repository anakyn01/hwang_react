


public class Sort {
    //값을 맞바꾸는 swap메서드
public static void swap(int[] arr, int idx1, int idx2){
/*배열 arr와 자리를 바꿀 두 숫자의 인덱스(위치) 
idx1, idx2를 매개변수로 받습니다.*/
int temp = arr[idx1];
//빈 컵(temp)을 하나 준비해서, 첫 번째 자리(idx1)에 있는 값을 잠시 보관합니다.
arr[idx1] = arr[idx2];
//첫 번째 자리(idx1)가 비었으므로, 
// 그곳에 두 번째 자리(idx2)의 값을 덮어씌웁니다.
arr[idx2] = temp;
/*
빈 컵(temp)에 보관해두었던 원래 첫 번째 자리의 값을 두 번째 자리(idx2)에 넣습니다.
*/
}
public static void Usort(int[] array, int length){
    for (int i =0; i < length; i++){
        //바깥쪽 반복문 : 배열의 길이만큼 전체 회전을 반복
        for(int j=0; j < length -i - 1; j++){
        //인접한 두 숫자를 비교  length -i - 1;
        if(array[j] > array[j+1]){
            //앞의 숫자가 바로 뒤의 숫자보다 크다면 자리를 바꿔라
            swap(array, j, j+1);
            //위에서 만든 swap메서드를 불러와서 두 숫자의 위치를 바꿈
        }
        }
    }
}

public static void main(String[] args){
    int[] item = new int[]{5,3,8,1,2,7};

    int nx = 6;

    Usort(item, nx);

    for (int data:item){
        System.out.print(data + " ");
    }
}



}
