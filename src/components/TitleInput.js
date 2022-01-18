const TitleInput = (props) => {
    return (
        <>
            <span>Title</span>
            <input 
                type="text" 
                name="titleCovered"
                value={props.titleCovered}
                onChange={props.handleChange}
                required
            />
        </>
    )
}

export default TitleInput