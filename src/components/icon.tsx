type IconProps = {
    className?: string
    onClick?: VoidFunction
}

const IconArrowRight = ({ className, onClick }: IconProps) => {
    return (
        <svg className={ className } onClick={ onClick } xmlns="http://www.w3.org/2000/svg"
             viewBox="0 -960 960 960" width="1em" height="1em" fill="currentColor">
            <path
                d="M383-480 228-636q-11-11-11.5-27.5T228-692q11-11 28-11t28 11l184 184q6 6 8.5 13t2.5 15q0 8-2.5 15t-8.5 13L284-268q-11 11-27.5 11.5T228-268q-11-11-11-28t11-28l155-156Zm264 0L492-636q-11-11-11.5-27.5T492-692q11-11 28-11t28 11l184 184q6 6 8.5 13t2.5 15q0 8-2.5 15t-8.5 13L548-268q-11 11-27.5 11.5T492-268q-11-11-11-28t11-28l155-156Z"/>
        </svg>
    )
}

const IconMoon = ({ className, onClick }: IconProps) => {
    return (
        <svg className={ className } onClick={ onClick } xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
             height="1em" width="1em">
            <path fill="currentColor"
                  d="M10 7a7 7 0 0 0 12 4.9v.1c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2h.1A6.98 6.98 0 0 0 10 7m-6 5a8 8 0 0 0 15.062 3.762A9 9 0 0 1 8.238 4.938A8 8 0 0 0 4 12"/>
        </svg>
    )
}

const IconSun = ({ className, onClick }: IconProps) => {
    return (
        <svg className={ className } onClick={ onClick }
             width="1em" height="1em" viewBox="0 0 24 24"
             fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M12,18a6,6,0,1,0-6-6A6.006,6.006,0,0,0,12,18ZM12,8a4,4,0,1,1-4,4A4,4,0,0,1,12,8ZM11,3V2a1,1,0,0,1,2,0V3a1,1,0,0,1-2,0Zm1,17a1,1,0,0,1,1,1v1a1,1,0,0,1-2,0V21A1,1,0,0,1,12,20ZM17.657,6.343a1,1,0,0,1,0-1.414l.707-.707a1,1,0,0,1,1.414,1.414l-.707.707a1,1,0,0,1-1.414,0ZM6.343,17.657a1,1,0,0,1,0,1.414l-.707.707a1,1,0,0,1-1.414-1.414l.707-.707A1,1,0,0,1,6.343,17.657ZM23,12a1,1,0,0,1-1,1H21a1,1,0,0,1,0-2h1A1,1,0,0,1,23,12ZM1,12a1,1,0,0,1,1-1H3a1,1,0,0,1,0,2H2A1,1,0,0,1,1,12Zm18.071,5.657.707.707a1,1,0,1,1-1.414,1.414l-.707-.707a1,1,0,0,1,1.414-1.414ZM4.222,5.636A1,1,0,0,1,5.636,4.222l.707.707A1,1,0,1,1,4.929,6.343Z"/>
        </svg>
    )
}

export {
    IconArrowRight,
    IconMoon,
    IconSun,
}