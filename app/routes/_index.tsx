const poem = `Little fly,
Thy summer’s play
My thoughtless hand
Has brushed away.

Am not I
A fly like thee?
Or art not thou
A man like me?

For I dance
And drink and sing,
Till some blind hand
Shall brush my wing.

If thought is life
And strength and breath,
And the want
Of thought is death,

Then am I
A happy fly,
If I live,
Or if I die.`

export default function HomePage() {
    return (
        <main>
            <h2>The Fly</h2>
            <hr className={ 'my-4' }/>
            {
                poem.split('\n')
                    .map((line, index) => {
                        return !line ? <br key={ index }/> : <p key={ index }>{ line }</p>
                    })
            }
        </main>
    )
}