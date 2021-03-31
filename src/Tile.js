import React, { Component } from 'react';

export default function Tile(props) {
    console.log(props.tile);
    return (
        <>
            {props.tile &&
                <div className={'col-3 border border-dark ' + (props.tile.blank ? 'text-white' : '')} onClick={() => props.clickHandler(props.index)}>
                    {props.tile.number}
                </div>}
        </>
    )
}