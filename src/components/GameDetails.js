import React from 'react';
import {connect} from 'react-redux';

const GameDetails = () => {
    return (
        <div>
            <h2>Game Details</h2>
        </div>
    );
}

function mapStateToProps(state) {
    return {};
}

export default connect(
    mapStateToProps,
)(GameDetails);
