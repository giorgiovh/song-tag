const Input = (props) => {
    return (
        <>
            <input 
                type="text" 
                name="songCovered"
                value={props.songCovered}
                onChange={props.handleChange}
            />
        </>
    )
}

export default Input