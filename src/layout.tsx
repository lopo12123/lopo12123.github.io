import { IconArrowRight } from "@/components/icon.tsx";
import { Link } from "react-router";

const ContentFooter = () => {
    return (
        <footer>
            <hr/>
            <ul>
                <li>
                    <IconArrowRight className={ 'text-[20px] mr-1' }/>
                    <Link to={ '/essay' }>All Essay</Link>
                </li>
                <li>
                    <IconArrowRight className={ 'text-[20px] mr-1' }/>
                    <Link to={ 'https://github.com/lopo12123' } target={ '_blank' }>GitHub</Link>
                </li>
                <li>
                    <IconArrowRight className={ 'text-[20px] mr-1' }/>
                    <Link to={ 'mailto:lopo@zju.edu.cn' }>E-Mail</Link>
                </li>
            </ul>
        </footer>
    )
}
export {
    ContentFooter,
}