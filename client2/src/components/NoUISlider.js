import {useEffect, useMemo, useRef, useState} from "react";
import {v4 as uuid} from 'uuid'
import nouislider from "nouislider";
import 'nouislider/dist/nouislider.css'
import './NoUiISlider.css'

const config = require('../config.json')

function NoUISlider({
                        livingRate = 33.333333,
                        entertainmentRate = 33.333333,
                        onChange
                    }) {
    const id = useMemo(() => uuid(), [])

    // living/entertainment/eating
    // const [livingRate, setLivingRate] = useState(33.33);
    // const [entertainmentRate, setEntertainmentRate] = useState(33.33);
    const eatingRate = 100 - livingRate - entertainmentRate;


    const sliderRootDiv = useRef();
    useEffect(() => {
        if (config.debug)
            console.log("slider created.")
        const handler = nouislider.create(sliderRootDiv.current, {
            start: [livingRate, livingRate + entertainmentRate],
            connect: false,
            range: {
                'min': 0,
                'max': 100
            }
        });

        //listen for extern system change
        handler.on('end', function (e) {
            const liveRate = parseFloat(e[0]);
            const enterRate = parseFloat(e[1])-liveRate;

            const eatRate = 100 - liveRate - enterRate;
            if (onChange != null) {
                onChange({
                    livingRate: liveRate,
                    entertainmentRate: enterRate,
                    eatingRate: eatRate
                });
            }
        })


        // destroy the slider when dispose
        return function () {
            if (config.debug)
                console.log("slider destroyed")
            handler.destroy()
        };
    }, [livingRate, entertainmentRate])
    return (
        <div className={"react-nouislider-root"}>
            <div id={id} key={id} ref={sliderRootDiv}></div>
        </div>
    );
}

export {NoUISlider as default}
