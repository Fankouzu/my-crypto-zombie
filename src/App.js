import React,{Component,Fragment} from 'react'
import '../public/App.css'
import  ZombieArmy  from "./ZombieArmy"
import  MyZombie  from "./MyZombie"
import  ZombieMarket  from "./ZombieMarket"
import  ZombieSimulator  from "./ZombieSimulator"
import ZombieDetail from "./ZombieDetail";
import ZombieAttack from "./ZombieAttack";
import ContractAdmin from "./ContractAdmin";
import MyWeb3 from './MyWeb3'
import {
    BrowserRouter as 
    Router,
    Route,
    Link
  } from "react-router-dom"

class App extends Component {
    constructor(props) {
        super(props);
        const _pathname = window.location.pathname.split('/')
        const pathname = '/'+_pathname[_pathname.length-2]
        this.state = { AdminArea:()=>{return(<Fragment></Fragment>)},pathname:pathname }
    }
    
    componentDidMount(){
        let that = this
        let ethereum = window.ethereum
        if (typeof  ethereum !== 'undefined' || (typeof window.web3 !== 'undefined')) {
            MyWeb3.init().then(function(res){
                MyWeb3.owner().then(function (owner) {
                    if(window.defaultAccount === owner){
                        that.setState({
                            AdminArea:()=>{
                                return(
                                    <li>
                                        <button className="start-admin-btn">
                                            <span><Link to="/ContractAdmin">合约管理</Link></span>
                                        </button>
                                    </li>
                                )
                            }
                        })
                    }
                })
                
            })
        }else {
            alert('You have to install MetaMask !')
        }
    }
    
    render() { 
        let AdminArea = this.state.AdminArea
        return (
            <Fragment>
                <Router basename={this.state.pathname}>
                    <section className="zombies-hero no-webp block app-block-intro pt-5 pb-0">
                        <div className="container">
                            <div className="menu">
                                <ul>
                                    <li>
                                        <button className="start-course-btn">
                                            <span><Link to="/">僵尸军团</Link></span>
                                        </button>
                                    </li>
                                    <li>
                                        <button className="start-course-btn">
                                            <span><Link to="/MyZombie">我的僵尸</Link></span>
                                        </button>
                                    </li>
                                    <li>
                                        <button className="start-course-btn">
                                            <span><Link to="/ZombieMarket">僵尸市场</Link></span>
                                        </button>
                                    </li>
                                    <li>
                                        <button className="start-course-btn">
                                            <span><Link to="/ZombieSimulator">基因模拟</Link></span>
                                        </button>
                                    </li>
                                    <AdminArea></AdminArea>
                                </ul>
                            </div>
                        </div>
                    </section>
                    <section className="zombie-container block bg-walls no-webp">
                        <div className="container">
                            <div className="area">
                                <Route path="/" component={ZombieArmy}></Route>
                                <Route path="/MyZombie" component={MyZombie}></Route>
                                <Route path="/ZombieMarket" component={ZombieMarket}></Route>
                                <Route path="/ZombieSimulator" component={ZombieSimulator}></Route>
                                <Route path="/ZombieDetail" component={ZombieDetail}></Route>
                                <Route path="/ZombieAttack" component={ZombieAttack}></Route>
                                <Route path="/ContractAdmin" component={ContractAdmin}></Route>
                            </div>
                        </div>
                    </section>
                </Router>
            </Fragment>
            );
    }
}


export default App