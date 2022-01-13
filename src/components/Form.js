import Input from "./Input";
import Button from "./Button";

const Form = (props) => {
    return (
        <>
            <label htmlFor="">Song Covered</label>
            <br />
            <form /*onSubmit={}*/>
                <Input prevSong={props.prevSong}/>
                <Button moveTurn={props.moveTurn}/>
            </form>
        </>
    )
}

export default Form