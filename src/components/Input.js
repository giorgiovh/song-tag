const Input = (props) => {
    return (
        <>
            <input 
                type="text" 
                name="song-covered"
                value={props.songCovered}
                onChange={props.handleChange}
            />
        </>
    )
}

export default Input