import React, { Component } from 'react';
import babyoda from './babyoda.jpeg';

export default function Tile(props) {
    // find top and left style from tile's number identifier
    let top = -100 * Math.floor(props.tile.number / 4);
    let left = -100 * (props.tile.number % 4);
    return (
        <>
            {/* overflow-hidden and position relative for img; send tile index to click handler */}
            <div className={'col-3 overflow-hidden position-relative border border-dark ' + (props.tile.blank ? 'text-white' : '')} onClick={() => props.clickHandler(props.index)}>
                {/* position-absolute for img; add section of img to tile if not blank */}
                {!props.tile.blank && <img className='position-absolute' src={babyoda} style={{ top, left }}></img>}
                {props.tile.number}
            </div>
        </>
    )
}