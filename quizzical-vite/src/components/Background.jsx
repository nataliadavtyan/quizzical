import React from "react"

export default function Background() {
    const topBlob = "../images//blob-yellow.png"
    const bottomBlob = "../images//blob-blue.png"
    
    return (
        <div>
            <img className="blob-top" src={topBlob} />
            <img className="blob-bottom" src={bottomBlob} />
        </div>
    )
}
