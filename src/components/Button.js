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
            {console.log('formInvalid',props.formInvalid)}
        </>
    )
}

export default Button