import React from 'react';
import { Spin } from 'antd';

export default function Loading(props) {
    return(
    <Spin
        tip={props.message}
        className="loading"
         />
    )
}

