import React from "react"

export default function Background() {
    const topBlob = "../src/images/blob-yellow.png"
    const bottomBlob = "../src/images/blob-blue.png"
    
    return (
        <div>
            <img className="blob-top" src={topBlob} />
            <img className="blob-bottom" src={bottomBlob} />
        </div>
    )
}
