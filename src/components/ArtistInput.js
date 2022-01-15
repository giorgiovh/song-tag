const ArtistInput = (props) => {
    return (
        <>
            <input 
                type="text" 
                name="artistCovered"
                placeholder="artist"
                value={props.artistCovered}
                onChange={props.handleChange}
                required
            />
        </>
    )
}

export default ArtistInput