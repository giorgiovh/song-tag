import TitleInput from "./TitleInput";
import Button from "./Button";

const Form = (props) => {
    return (
        <>
            <label htmlFor="">Song Covered</label>
            <br />
            <form /*onSubmit={}*/>
                <TitleInput titleCovered={props.titleCovered} handleChange={props.handleChange}/>
                <Button moveTurn={props.moveTurn}/>
            </form>
        </>
    )
}

export default Form