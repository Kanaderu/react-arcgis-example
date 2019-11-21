import { useState, useEffect } from 'react';
import { loadModules } from 'esri-loader';

const Point = (props) => {

    const [graphic, setGraphic] = useState(null);
    useEffect(() => {

        loadModules(['esri/Graphic']).then(([Graphic]) => {
            /*
            // Create a polygon geometry
            const polygon = {
                type: "polygon", // autocasts as new Polygon()
                rings: [
                    [-64.78, 32.3],
                    [-66.07, 18.45],
                    [-80.21, 25.78],
                    [-64.78, 32.3]
                ]
            };
            */

            // create a point
            const point = {
                type: "point", // autocasts as new Point()
                x: props.lon,
                y: props.lat,
                //x: -84.175444,
                //y: 39.7346451
            };

            /*
            // Create a symbol for rendering the graphic
            const fillSymbol = {
                type: "simple-fill", // autocasts as new SimpleFillSymbol()
                color: [227, 139, 79, 0.8],
                outline: { // autocasts as new SimpleLineSymbol()
                    color: [255, 255, 255],
                    width: 1
                }
            };
            */

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

}

export default Point;
