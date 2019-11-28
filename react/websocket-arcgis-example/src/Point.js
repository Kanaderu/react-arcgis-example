const APoint = (props) => {
    Object.keys(props.locations).map((location, id) => {
        // remove old graphic if it exists
        props.locations[`${location}`].oldGraphic &&
        props.view.graphics.remove(props.locations[`${location}`].oldGraphic);

        // add new graphic
        props.locations[`${location}`].graphic &&
        props.view.graphics.add(props.locations[`${location}`].graphic);

        return null;
    });
    return null;
};

export default APoint;