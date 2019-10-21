import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Heading = (props) => (<h1>{props.text}</h1>)

const Button = ({ text, handler }) => (<button onClick={handler}>{text}</button>)

const Anecdote = ({ text, vote }) => (
    <>
        <p>{text}</p>
        <p>has {vote} vote{vote > 1 ? 's' : ''}</p>
    </>
)

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [vote, setVote] = useState(new Array(6).fill(0))

    const randomAnecdote = () => setSelected(Math.floor(Math.random() * anecdotes.length))
    const voteAnecdote = () => {
        const copyVote = [...vote]
        copyVote[selected] += 1
        setVote(copyVote);
    }

    const maxVote = Math.max(...vote);

    return (
        <div>
            <Heading text='Anecdote of the day' />
            <Anecdote text={props.anecdotes[selected]} vote={vote[selected]} />
            <Button text='vote' handler={voteAnecdote} />
            <Button text='next anecdote' handler={randomAnecdote} />
            <Heading text='Anecdote with most votes' />
            <Anecdote text={props.anecdotes[vote.indexOf(maxVote)]} vote={maxVote} />
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)