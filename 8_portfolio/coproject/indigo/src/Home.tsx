import { WeAre } from "./include/sub/WeAre"
import { Work} from "./include/sub/Work"
import { Blog} from "./include/sub/Blog"
import { Map} from "./include/sub/Map"

export const Home = () => {
    return(
<section className="content">
<WeAre/>
<hr className="divider"/>
<Work/>
<hr className="m-divider"/>
<Blog/>
<Map/>
</section>
    )
}
