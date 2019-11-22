import { useState, useEffect } from 'react';
import { loadModules } from 'esri-loader';

const Point = (props) => {

    const [graphic, setGraphic] = useState(null);
    useEffect(() => {

        loadModules(['esri/Graphic']).then(([Graphic]) => {

            // create a point
            const point = {
                type: "point", // autocasts as new Point()
                x: props.lon,
                y: props.lat,
            };

            // Add the geometry and symbol to a new graphic
            const graphic = new Graphic({
                geometry: point,
                //symbol: fillSymbol
            });
            setGraphic(graphic);
            props.view.graphics.add(graphic);
        }).catch((err) => console.error(err));

        return function cleanup() {
            props.view.graphics.remove(graphic);
        };
    }, []);

    return null;

};

export default Point;
