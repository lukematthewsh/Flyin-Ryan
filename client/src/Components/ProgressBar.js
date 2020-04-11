import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Track = styled.div`
    margin-left: 2.5%;
    width: 95%;
    height: 20px;
    background-color: #222;
    border-radius: 10px;
    box-shadow: inset 0 0 5px #000;

`;
const Thumb = styled.div`
    width: ${props => props.percentage}%;
    height: 100%;
    background-color: #7897b8;
    border-radius: 10px;
    transition: width 0.3s ease-in-out;

`;
class Progress extends React.Component {

    minMax = (min, value, max) => {
        return Math.min(Math.max(min, value), max)
    }


    render() {
        return (
            <Track>
                <Thumb percentage={this.minMax(0, this.props.percentage, 100)} />
            </Track>

        )
    }
}

Progress.propTypes = {
    percentage: PropTypes.number,
}
export default Progress