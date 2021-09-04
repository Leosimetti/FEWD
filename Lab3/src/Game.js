import React, {useState} from "react"
import Bucket from "./Bucket";

function Game() {
    const [buckets, setBucket] = useState([
        {id: 1, capacity: 100, increase: 10},
        {id: 2, capacity: 150, increase: 15},
        {id: 3, capacity: 200, increase: 10}
    ])


    return (
        <div>
            {buckets.map((bucket) =>
                <Bucket key={bucket.id} increase={bucket.increase} capacity={bucket.capacity}
                        onFull={() => setBucket(buckets.filter((b) => b.id !== bucket.id))}/>
            )}
        </div>
    )
}

export default Game