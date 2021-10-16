import React from "react";

const Header = props =>
    <h3>{props.course}</h3>

const Total = props => {
    const total = Array.from(props.parts).reduce((acc, part) => acc + part.exercises, 0)

    return <p><b>total of {total} exercises</b></p>
}

const Part = props =>
    <p>{props.part.name} {props.part.exercises}</p>

const Content = props => {
    const rows = () => Array.from(props.parts).map(part => <Part key={part.id} part={part} />)

    return (
        <div>
            {rows()}
        </div>)
}

const Course = ({ course }) =>
    <>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
    </>

export default Course