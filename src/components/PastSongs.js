const PastSongs = (props) => {
    return (
        <>
            <h2>Past Songs</h2>
            <ul>
                {props.pastSongs.map((pastSong, i) => <li key={i}>{pastSong.titleCovered}<small> - {pastSong.artistCovered}</small></li>)}
            </ul>
        </>
    )
}

export default PastSongs