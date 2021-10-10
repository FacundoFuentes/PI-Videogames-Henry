import React from 'react'
const Platforms = () => {

    const PLATFORMS = ["PC", "Playstation", "Xbox", "iOS", "Android", "Apple", "Linux", "Nintendo", "Web"]
    return (
        <div>
            <select>
                {PLATFORMS.map(plat => {
                return (
                    <option>{plat}</option>
                )
            })}
            </select>
            
        </div>
    )
}

export default Platforms
{}