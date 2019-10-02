import React from 'react'

const Joke = (props) => {
    return (
        <li>
            <p>{props.joke.joke}</p>
        </li>
    )
}

export default Joke;