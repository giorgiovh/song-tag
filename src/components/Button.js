const Button = (props) => {
    return (
        <>
            <button 
                type="submit" 
                onClick={props.handleClick}
                disabled={props.formInvalid}
            >
                Submit Song
            </button>
        </>
    )
}

export default Button