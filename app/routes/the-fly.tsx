const sections = [
    'Little fly,\nThy summer’s play\nMy thoughtless hand\nHas brushed away.',
    'Am not I\nA fly like thee?\nOr art not thou\nA man like me?',
    'For I dance\nAnd drink and sing,\nTill some blind hand\nShall brush my wing.',
    'If thought is life\nAnd strength and breath,\nAnd the want\nOf thought is death,',
    'Then am I\nA happy fly,\nIf I live,\nOr if I die.',
]

export default function TheFlyPage() {
    return (
        <main className={ 'content-body font-poets text-center whitespace-pre-wrap' }>
            <h1 className={ 'font-poets italic' }>The Fly</h1>
            {
                sections.map((section, index) => <p key={ index }>{ section }</p>)
            }
        </main>
    )
}