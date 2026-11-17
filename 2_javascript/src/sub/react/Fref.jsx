import { forwardRef, useRef } from 'react';

/* 보통리액트에서는 부모가 자식이 알맹이 html태그를 직접 건드릴수 없다
그러나 포워드 리프를 사용하면 통로가 열린다 
레퍼런스(참조)를 앞으로 전달하기
부모가 보낸 리모컨(ref)을 자식이 받아서 쓸수 있도록 
배달(전달)해 주는 포장지 역할
*/
const MyInput = forwardRef((props, ref) => (
<input ref={ref} {...props} />
));

const Fref = () => {
 const inputRef = useRef();

 const focusInput = () => {
    inputRef.current.focus();
 }

    return(
        <>
        <MyInput ref={inputRef} placeholder="Type here..."/>
        <button onClick={focusInput}>
            Focus Input
        </button>
<h1>
forwardRef : 컴포넌트가 자식요소중 하나에 대한 참조를 전달
</h1>
<p>
- 입력 요소에 집중
- 애니메이션 트리거링
- dom요소 측정
- 타사라이브러리와의 통합
</p>
        </>
    )
}
export default Fref