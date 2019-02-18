import React, { Component } from 'react';
import './BingoCell.css';

class BingoCell extends Component {

    state = {
        clicked: false
    };

    handleClick = () => {
        let isClicked = !this.state.clicked;
        this.setState({clicked: isClicked});
        this.props.handleCellChange(this.props.id);
    };

    render() {
        return (
            <div className={this.state.clicked ? "cell cell-selected" : "cell"} onClick={this.handleClick}>
                <p>{this.props.content}</p>
            </div>
        );
    }
}

export default BingoCell;