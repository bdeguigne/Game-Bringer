import React, {useState} from 'react';
import PropTypes from 'prop-types';
import SimpleCard from "./SimpleCard";
import HorizontalSlider from "./HorizontalSlider";

const OtherGamesSlider = props => {
    const [sliderLoaded, setSliderLoaded] = useState(false);
    const [removeSkeleton, setRemoveSkeleton] = useState(false);

    const sliderOnLoad = () => {
        if (sliderLoaded === false) {
            setSliderLoaded(true);
            setTimeout(() => {
                setRemoveSkeleton(true);
            }, 500)
        }
    }

    return (
        <HorizontalSlider sliderName={props.sliderName} title={props.title} isLoading={props.data.length === 0} imageLoaded={sliderLoaded} removeSkeleton={removeSkeleton} perView={props.perView} >
            {props.data.map((game, i) => {
                    return (
                        <SimpleCard onLoad={sliderOnLoad} key={i} coverID={game.coverID} game={game} theme={props.theme}/>
                    )
                })
            }
        </HorizontalSlider>
    );
};

OtherGamesSlider.defaultProps = {
    perView: 5
}

OtherGamesSlider.propTypes = {
    sliderName: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    data : PropTypes.array.isRequired,
    theme : PropTypes.string.isRequired,
    perView: PropTypes.number
};

export default OtherGamesSlider;
