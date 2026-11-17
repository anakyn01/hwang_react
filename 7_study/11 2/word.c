#include <stdio.h>

void main(){
char *p = "KOREA";
printf("%s\n", p);//KOREA
printf("%s\n", p+3);//EA
printf("%c\n", *p);//K
printf("%c\n", *(p+3));//E
printf("%c\n", *p+2);//아스키 코드로 M

    return 0;
}