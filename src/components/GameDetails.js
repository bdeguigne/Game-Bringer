import React from 'react';
import {connect} from 'react-redux';
import {useParams} from "react-router-dom";

const GameDetails = () => {
    let { id } = useParams();


    return (
        <div>
            <h2>Game Details : {id} </h2>
        </div>
    );
}

function mapStateToProps(state) {
    return {};
}

export default connect(
    mapStateToProps,
)(GameDetails);
