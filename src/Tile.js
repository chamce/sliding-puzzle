import React, { Component } from 'react';
import babyoda from './babyoda.jpeg';

export default function Tile(props) {
    let top = -100 * Math.floor(props.tile.number / 4);
    let left = -100 * (props.tile.number % 4);
    return (
        <>
            <div className={'col-3 border border-dark overflow-hidden position-relative ' + (props.tile.blank ? 'text-white' : '')} onClick={() => props.clickHandler(props.index)}>
                {!props.tile.blank && <img className='position-absolute' src={babyoda} style={{ top, left }}></img>}
                {props.tile.number}
            </div>
        </>
    )
}