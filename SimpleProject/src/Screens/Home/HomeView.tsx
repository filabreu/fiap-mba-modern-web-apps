import { info } from 'console';
import React, { FC } from 'react';
import './Home.css';

type IProps = {
    info: number;
    increment: () => void;
}

const HomeView:FC<IProps> = ({info, increment}) => {
    return (
        <div>
        <div className="App">Info = {info}</div>

        <button onClick={increment}>Add Info</button>
        </div>
    );
}

export default HomeView;