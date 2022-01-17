import TitleInput from "./TitleInput";
import ArtistInput from "./ArtistInput";
import Button from "./Button";

const Form = (props) => {
    return (
        <>
            <label htmlFor="">Song Covered</label>
            <br /><br />
            <form ref={props.formRef} onSubmit={props.handleClick}>
                <TitleInput 
                    titleCovered={props.titleCovered} 
                    handleChange={props.handleChange}
                />
                <br /><br />
                <ArtistInput 
                    artistCovered={props.artistCovered} 
                    handleChange={props.handleChange}
                />
                <br /><br />
                <Button 
                    handleClick={props.handleClick}
                    formInvalid={props.formInvalid}
                />
            </form>
        </>
    )
}

export default Form