const TitleInput = (props) => {
    return (
        <>
            <input 
                type="text" 
                name="titleCovered"
                placeholder="title"
                value={props.titleCovered}
                onChange={props.handleChange}
                required
            />
        </>
    )
}

export default TitleInput