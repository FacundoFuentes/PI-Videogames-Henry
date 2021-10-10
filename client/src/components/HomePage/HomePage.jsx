import React from 'react'
import PanelLateral from '../PanelLateral/PanelLateral'
import VideoGameCards from '../VideoGameCards/VideoGameCards'

const HomePage = () => {
    return (
        <div style={{display: "flex"}}>
            <PanelLateral/>
            <VideoGameCards/>
        </div>
    )
}

export default HomePage
