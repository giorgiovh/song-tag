import React, { Component } from "react";
import { Song } from "../Song"
import { TextField, Button } from '@mui/material';
import { Timestamp } from "firebase/firestore";

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
            const song: Song = {
                artistCovered: this.state.artistText,
                titleCovered: this.state.titleText,
                timestamp: Timestamp.now()
            }
            this.props.handleClick(song)
        }
        this.formRef.current?.reset();
        this.setState({ isButtonDisabled: true })
    }


    render() {
        return (
            <>
                <label>Song Covered</label>
                <br /><br />
                <form
                    onSubmit={this.createAndSubmitSong}
                    ref={this.formRef}
                >
                    <TextField
                        id="outlined-basic"
                        label="Title"
                        variant="outlined"
                        required
                        onChange={this.handleTitleChange}
                    />
                    <br /><br />
                    <TextField
                        id="outlined-basic"
                        label="Artist"
                        variant="outlined"
                        required
                        onChange={this.handleArtistChange}
                    />
                    <br /><br />
                    <Button
                        variant="contained"
                        type="submit"
                        disabled={this.state.isButtonDisabled}
                    >
                        Submit Song
                    </Button>
                </form>
            </>
        )
    }
}

export default Form