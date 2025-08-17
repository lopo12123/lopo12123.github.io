export type IconProps = {
    className?: string;
    onClick?: () => void;
}

export const IconChevronRight = ({ className, onClick }: IconProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
             className={ className } onClick={ onClick }
             width={ '1em' } height={ '1em' }
             fill={ "none" } stroke={ 'currentColor' }>
            <path d="M9 18L15 12L9 6" stroke="black" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    )
}

export const IconChevronRightDouble = ({ className, onClick }: IconProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
             className={ className } onClick={ onClick }
             width={ '1em' } height={ '1em' }
             fill={ "none" } stroke={ 'currentColor' }>
            <path d="M6 17L11 12L6 7M13 17L18 12L13 7" stroke-width="1.8" stroke-linecap="round"
                  stroke-linejoin="round"/>
        </svg>
    )
}

export const IconEmail = ({ className, onClick }: IconProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"
             className={ className } onClick={ onClick }
             width={ '1em' } height={ '1em' }
             fill={ 'currentColor' }>
            <path
                d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm640-480L501-453q-5 3-10.5 4.5T480-447q-5 0-10.5-1.5T459-453L160-640v400h640v-400ZM480-520l320-200H160l320 200ZM160-640v10-59 1-32 32-.5 58.5-10 400-400Z"/>
        </svg>
    )
}

export const IconGithub = ({ className, onClick }: IconProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"
             className={ className } onClick={ onClick }
             width={ '1em' } height={ '1em' }
             fill={ 'currentColor' }>
            <path
                d="M50 5.7C24.9 5.7 4.5 26 4.6 51.2c0 19.6 12.5 36.9 31.1 43.1 2.3.4 3.1-1 3.1-2.2s0-3.9-.1-7.7c-12.6 2.7-15.3-6.1-15.3-6.1-2.1-5.3-5-6.7-5-6.7-4.1-2.9.3-2.8.3-2.8 4.6.3 7 4.7 7 4.7 4.1 6.9 10.6 4.9 13.2 3.8.2-2.3 1.2-4.5 2.9-6.1-10.2-1.1-20.8-5-20.8-22.5-.1-4.5 1.6-8.9 4.7-12.2-.5-1.1-2-5.7.4-12 0 0 3.8-1.2 12.5 4.7 7.4-2 15.3-2 22.8 0 8.7-5.9 12.4-4.7 12.4-4.7 2.5 6.3 1 10.9.5 12 3.1 3.3 4.8 7.7 4.7 12.2 0 17.5-10.6 21.4-20.8 22.4 1.6 1.4 3.1 4.2 3.1 8.4 0 6.1-.1 11-.1 12.4 0 1.2.8 2.6 3.1 2.2 23.8-8 36.6-33.8 28.6-57.6C86.8 18.2 69.5 5.7 50 5.7z"/>
        </svg>
    )
}