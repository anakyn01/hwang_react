import {useState, useTransition } from 'react';

const SearchResults = ({ query}) => {
    const items = [];
    if(query){
        for (let i =0; i < 10; i++){
            items.push(<li key={i}>
                Result for {query} - {i}
            </li>)
        }
    }
    return <ul>{items}</ul>
}


const Trans = () => {

    const [input, setInput] = useState('')
    //입력하는 타이핑 그대로의 값을 저장할 공간
    const [query, setQuery] = useState('')
    //검색 결과 컴퓨터가 검색할 값을 저장할공간
    const [isPending, startTransition] = useTransition();
/*
isPending : 지금 천천히 처리하라고 한 작업이 아직 계산 중이니?
startTransition : 이안에 있는 작업 급한거 아니니까..천천히 처리해줘
*/
const handleChange = (e) => {
    setInput(e.target.value);//1순위

    startTransition(() =>{//2순위
        setQuery(e.target.value);
    })
}

    return(
        <>
        <input 
 type="text" value={input} 
 onChange={handleChange} 
 placeholder="Type to search.."      
        />
{isPending && <p>Loading result...</p>}
<SearchResults query={query}/>
<h1>React Transitions</h1>
<p>
- 사용자에 인터페이스가 멈출수 있는 느린 작업
- 당장 중요하지 않은 업데이트 
- 검색 결과가 표시되는데 시간이 걸림
</p>
        </>
    )
}
export default Trans;