import React, {useEffect, useState} from "react"
// import Status from "./Status"
import "./Bucket.css"
import Status from "./Status";


function Bucket(props) {
    const {capacity, onFull, increase} = props
    const [fill, setFill] = useState(0)
    const [clicked, setClick] = useState(false)

    useEffect(() => {
        if (fill !== 0) {
            setClick(true)
            const timeout = setTimeout(() => setClick(false), 600)

            return () => {
                clearTimeout(timeout)
            }
        }
    }, [fill])

    function onClick() {
        if (fill + increase >= capacity) {
            onFull()
        }
        setFill(fill + increase)
    }

    return (
        <div className="bucket" onClick={onClick}>
            {clicked && <Status increment={increase}/>}
            <h3>{fill}/{capacity}</h3>
            <div className="fill" style={{height: fill / capacity * 100 + "%"}}/>
        </div>
    )
}

export default Bucket