package advanced;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.METHOD})//적용 대상 메서드
@Retention(RetentionPolicy.RUNTIME)//유지 정책 런타임
public @interface PrintAnnotation {
String value() default "-";
int number() default 15;
}
