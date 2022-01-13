const ArtistInput = (props) => {
    return (
        <>
            <input 
                type="text" 
                name="artistCovered"

                value={props.artistCovered}
                onChange={props.handleChange}
            />
        </>
    )
}

export default ArtistInput