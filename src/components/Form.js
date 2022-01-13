import Input from "./Input";
import Button from "./Button";

const Form = (props) => {
    return (
        <>
            <label htmlFor="">Song Covered</label>
            <br />
            <Input />
            <Button moveTurn={props.moveTurn}/>
        </>
    )
}

export default Form