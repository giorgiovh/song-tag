const Letters = ({aplhLetter, lastLetterOfPrevSong}) => {
    return (
        <>
            <h2>Choose From: {aplhLetter} <small>(alphabet letter)</small> or {lastLetterOfPrevSong} <small>(last letter of previous song)</small></h2>
        </>
    )
}

export default Letters;