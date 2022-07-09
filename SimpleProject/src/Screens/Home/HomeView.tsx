import React, { FC } from 'react';
import './Home.css';

type IProps = {
    info: number
}

const HomeView:FC<IProps> = ({info}) => {
    return (
        <div className="App">Info = {info}</div>
    );
}

export default HomeView;