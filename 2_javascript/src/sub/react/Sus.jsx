import { Suspense, lazy} from 'react';
//코드분할(code splitting)과 지연로딩(Lazy Loading)

const Cars = lazy(() => import('./cars'))
//컴퓨터 Cars라는 부속을 지금 당장 가져오지 말고 나중에 그릴때 가져와

const Sus = () => {
    return(
        <>
        <Suspense fallback={<div>Loading...</div>}>
        <Cars/>
        </Suspense>
<h1>React Suspense</h1> 
<p>코드나 데이터가 로드 될때 가지 기다리는 동안 대체 html을
    표시할수 있습니다
    lazy로딩이라는걸 사용하면 컴포넌트를 동적으로 가져올수 있다
    </p>       
        </>
    )
}
export default Sus