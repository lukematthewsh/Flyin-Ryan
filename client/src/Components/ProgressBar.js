import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const BarBackground = styled.div`
    margin-left: 15vw;
    width: 70vw;
    height: 3px;
    background-color: #c5d2e0;
   border-radius: 9px;
    box-shadow: 2px 2px 2px black;
    overflow:hide;
`;
const LoadingBar = styled.div`
    width: ${props => props.percentage}%;
    height: 100%;
    border-radius: 9px;
    background-color: green;
    transition: width 0.7s ease-in-out;

    
`;
class Progress extends React.Component {

    minMax = (min, value, max) => {
        return Math.min(Math.max(min, value), max)
    }


    render() {
        return (
            <BarBackground>
                <LoadingBar percentage={this.minMax(0, this.props.percentage, 100)} />
            </BarBackground>

        )
    }
}

Progress.propTypes = {
    percentage: PropTypes.number,
}
export default Progress