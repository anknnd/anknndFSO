import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Heading = ({ text }) => (<h1>{text}</h1>)

const Button = ({ part }) => (<button onClick={part.handler}>{part.name}</button>)

const Statistics = ({ parts, more }) => {
    if (Array.from(parts).reduce((acc, part) => acc + part.value, 0) === 0) {
        return (
            <p>No feedback given</p>
        )
    }

    return (
        <table>
            <tbody>
                <Statistic part={parts[0]} />
                <Statistic part={parts[1]} />
                <Statistic part={parts[2]} />
                <Statistic part={more[0]} />
                <Statistic part={more[1]} />
                <Statistic part={more[2]} />
            </tbody>
        </table>
    )
}

const Statistic = ({ part }) => (<tr><td>{part.name}</td><td>{part.value}</td></tr>)

const App = () => {
    // save clicks of each button to own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const parts = [
        {
            name: 'good',
            handler: () => setGood(good + 1),
            value: good
        },
        {
            name: 'neutral',
            handler: () => setNeutral(neutral + 1),
            value: neutral
        },
        {
            name: 'bad',
            handler: () => setBad(bad + 1),
            value: bad
        }
    ]

    const sum = good + neutral + bad

    const moreStatistics = [
        {
            name: 'all',
            value: sum
        },
        {
            name: 'average',
            value: (good - bad) / (sum)
        },
        {
            name: 'positive',
            value: ((good / sum) * 100).toString() + ' %'
        }
    ]

    return (
        <div>
            <Heading text='give feedback' />
            <div>
                <Button part={parts[0]} />
                <Button part={parts[1]} />
                <Button part={parts[2]} />
            </div>
            <Heading text='statistics' />
            <div>
                <Statistics parts={parts} more={moreStatistics} />
            </div>
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)
