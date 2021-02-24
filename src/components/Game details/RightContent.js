import React from 'react'
import PropTypes from 'prop-types'

function RightContent(props) {
    return (
        <div>
            {/* <ComplementaryInfo game={props.game} theme={props.theme}/> */}
        </div>
    )
}

RightContent.propTypes = {
    game: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    theme: PropTypes.string
}

export default RightContent

