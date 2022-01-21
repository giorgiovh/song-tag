import React, { Component } from "react";
import { Song } from "../Song"

interface FormProps {
    handleClick(song: Song): void
}

interface FormState {
    titleText?: string
    artistText?: string
    isButtonDisabled: boolean
}

class Form extends Component<FormProps, FormState> {
    constructor(props: FormProps) {
        super(props);

        this.state = {
            titleText: undefined,
            artistText: undefined,
            isButtonDisabled: true
        }
    }

    handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ titleText: e.target.value }, () => { this.validateButton() })
    }

    handleArtistChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ artistText: e.target.value }, () => { this.validateButton() })
    }

    validateButton = () => {
        if (this.state.titleText && this.state.artistText) {
            this.setState({ isButtonDisabled: false })
        } else {
            this.setState({ isButtonDisabled: true })
        }
    }

    formRef = React.createRef<HTMLFormElement>()

    createAndSubmitSong = (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (this.state.artistText && this.state.titleText) {
            const song: Song = { artistCovered: this.state.artistText, titleCovered: this.state.titleText }
            this.props.handleClick(song)
        }
        console.log(this.formRef);
        
        this.formRef.current?.reset();
        // *CONTINUE HERE* clear inputs after submitting form here (see notes on google task and one note)
    }


    render() {
        return (
            <>
                <label htmlFor="">Song Covered</label>
                <br /><br />
                <form 
                    onSubmit={this.createAndSubmitSong}
                    ref={this.formRef}
                >
                    <span>Title</span>
                    <input
                        type="text"
                        name="titleCovered"
                        required
                        onChange={this.handleTitleChange}
                    />
                    <br /><br />
                    <span>Artist</span>
                    <input
                        type="text"
                        name="artistCovered"
                        required
                        onChange={this.handleArtistChange}
                    />
                    <br /><br />
                    <button
                        type="submit"
                        disabled={this.state.isButtonDisabled}
                    >
                        Submit Song
                    </button>
                </form>
            </>
        )
    }
}

export default Form