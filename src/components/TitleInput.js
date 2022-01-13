const TitleInput = (props) => {
    return (
        <>
            <input 
                type="text" 
                name="titleCovered"

                value={props.titleCovered}
                onChange={props.handleChange}
            />
        </>
    )
}

export default TitleInput