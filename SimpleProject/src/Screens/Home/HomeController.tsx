import React from 'react'
import HomeModel from './HomeModel';
import HomeView from './HomeView';


interface IState{
    count: number;
}
class HomeController extends React.Component<any, IState>{
    homeModel: HomeModel


    componentDidMount(){
        setInterval(() => {
            this.setState({
                count: this.state.count+1
            })
        }, 1000)
    }
    updateInfo = () =>{
        this.setState({
            count:this.state.count+1
        })
    }
    /**
     *
     */
    constructor() {
        super({});

        this.state = {
            count: 1
        }

        this.homeModel = new HomeModel();
        this.homeModel.getSomeInfo();
    }
    render(){
        console.log("Count" + this.state.count);
        return(
        <HomeView info={this.state.count}/>
        )
    }
}

export default HomeController;