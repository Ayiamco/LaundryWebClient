import React from 'react'
import "./LoginHero.css"
import laundryhero from '../../images/laundryhero.png'

export default function LoginHero() {
    return (
        <div className="LH-con">
            <h1 className="LH-h1">All in one Solution</h1>
            <div className="LH-img-con"><img src={laundryhero}  alt="laundry hero"></img></div>
            <p> Giving you the best delivery orem ipsum dolor sit amet,
                 consectetur adipisicing elit, sed do e
                eiusmod tempor incididunt ut labore et dolore.
            </p>
        </div>
    )
}
