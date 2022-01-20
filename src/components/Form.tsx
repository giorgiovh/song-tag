import React, { Component } from "react";
import TitleInput from "./TitleInput";
import ArtistInput from "./ArtistInput";
import Button from "./Button";

interface FormProps {
    onSubmit: React.FormEventHandler<HTMLFormElement> | undefined
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
        this.setState({titleText: e.target.value}, () => {this.validateButton()})
    }

    handleArtistChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({artistText: e.target.value}, () => {this.validateButton()})
    }

    validateButton() {
        if (this.state.titleText && this.state.artistText) {
            this.setState({isButtonDisabled: false})
        } else {
            this.setState({isButtonDisabled: true})
        }
    }

    render() {
        return (
            <>
                <label htmlFor="">Song Covered</label>
                <br /><br />
                <form onSubmit={this.props.onSubmit}>
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