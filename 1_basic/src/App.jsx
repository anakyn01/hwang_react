import { useState } from 'react'
import heroImg from './assets/hero.png'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="container">{/*면적 */}
      <div className="row">{/*줄 */}
        <div className="col-md-12">{/*칸 */}
<h1 className='mt-4 mb-2'>제목</h1>
<p className='text-secondary'>웹페이지에 표시하려는 제목이나 부제목 입니다</p>
<h2>Heading</h2>
<h3>Heading</h3>
<h4>Heading</h4>
<h5>Heading</h5>
<h6 className='mt-4 mb-2'>Heading</h6>
<p>
- 폰트사용할때 주의점 -<br/>
<br/>
아래처럼 룰을 정하고 여기서 골라 사용합니다<br/> 
100,72,60,48,36,24,19,16,14,12,10<br/>
위에것보다 좀더 크게 사용하고자 하면<br/>
부트스트랩에 클래스 display-1을 사용한다<br/>
웹에서는 무조건 픽셀<br/>
em[1em 은 16px], rem[1em 은 16px]<br/>
예시로 36px은 2.25rem입니다<br/>
color:36px; color:2.25rem;<br/>
</p>
        </div>
      </div>
    </div>

    </>
  )
}

export default App
