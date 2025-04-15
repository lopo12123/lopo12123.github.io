import { IconArrowRight } from "~/components/icon";
import { Link } from "@remix-run/react";

const ContentFooter = () => {
    return (
        <footer>
            <hr/>
            <ul>
                <li>
                    <IconArrowRight className={ 'text-[20px] mr-1' }/>
                    <a href="javascript:window.scrollTo({top: 0, behavior: 'smooth'});">Back to top</a>
                </li>
                <li>
                    <IconArrowRight className={ 'text-[20px] mr-1' }/>
                    <Link to={ '/essay' }>All Essay</Link>
                </li>
                <li>
                    <IconArrowRight className={ 'text-[20px] mr-1' }/>
                    <a href="https://github.com/lopo12123" target={ '_blank' }>GitHub</a>
                </li>
                <li>
                    <IconArrowRight className={ 'text-[20px] mr-1' }/>
                    <a href="mailto:lopo@zju.edu.cn">E-Mail</a>
                </li>
            </ul>
        </footer>
    )
}
export {
    ContentFooter,
}