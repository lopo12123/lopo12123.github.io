import { Link } from "react-router";
import { Fragment } from "react";
import { IconChevronRight } from "~/components/icons";

const TOOLS = [
    {
        name: 'QR',
        description: 'Generate QR code',
        url: '/tools/qr',
    },
]

export default function ToolsHomePage() {
    return (
        <>
            <h1 className={ 'title' }>
                <span>Tools</span>
                <span className={ 'animation-wrench ml-2' }>🔧</span>
            </h1>
            <ul>
                {
                    TOOLS.map(({ name, description, url }, index) => {
                        return (
                            <Fragment key={ name }>
                                { index === 0 ? null : <hr className={ 'my-4 border-[#eee]' }/> }
                                <Link to={ url }>
                                    <li className={ 'flex items-center' }>
                                        <div className={ 'flex-1' }>
                                            <div className={ 'text-xl font-medium' }>
                                                { name }
                                            </div>
                                            <div className={ 'text-[#696969] text-sm ' }>
                                                { description }
                                            </div>
                                        </div>
                                        <IconChevronRight className={ 'size-5 ml-2 text-[#4e4e0e]' }/>
                                    </li>
                                </Link>
                            </Fragment>
                        )
                    })
                }
            </ul>
        </>
    )
}