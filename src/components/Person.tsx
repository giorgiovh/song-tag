import { Person as currentPerson } from '../App'

type myProps = {
    person: currentPerson
}

const Person = (props: myProps) => {
    return (
        <h2> Up Next: {props.person.firstName} </h2>
    )
}

export default Person