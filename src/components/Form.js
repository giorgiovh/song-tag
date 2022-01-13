import Input from "./Input";
import Button from "./Button";

const Form = (props) => {
    return (
        <>
            <label htmlFor="">Song Covered</label>
            <br />
            <form /*onSubmit={}*/>
                <Input songCovered={props.songCovered} handleChange={props.handleChange}/>
                <Button moveTurn={props.moveTurn}/>
            </form>
        </>
    )
}

export default Form