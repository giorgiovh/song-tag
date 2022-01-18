const ArtistInput = (props) => {
    return (
        <>
            <span>Artist</span>
            <input 
                type="text" 
                name="artistCovered"
                value={props.artistCovered}
                onChange={props.handleChange}
                required
            />
        </>
    )
}

export default ArtistInput