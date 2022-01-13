const Button = (props) => {
    return (
        <>
            <button type="submit" onClick={props.handleClick}>Submit Song</button>
        </>
    )
}

export default Button