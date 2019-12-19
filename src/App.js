import React,{Component,Fragment} from 'react'
import '../public/App.css'
import Page from "./Page";
import MyWeb3 from './MyWeb3'
import {
    BrowserRouter as Router,
    Route,
    Link
  } from "react-router-dom"

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { AdminArea:()=>{return(<Fragment></Fragment>)} }
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
                                            <span><Link to="?ContractAdmin">合约管理</Link></span>
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
                <Router>
                    <section className="zombies-hero no-webp block app-block-intro pt-5 pb-0">
                        <div className="container">
                            <div className="menu">
                                <ul>
                                    <li>
                                        <button className="start-course-btn">
                                            <span><Link to="?ZombieArmy">僵尸军团</Link></span>
                                        </button>
                                    </li>
                                    <li>
                                        <button className="start-course-btn">
                                            <span><Link to="?MyZombie">我的僵尸</Link></span>
                                        </button>
                                    </li>
                                    <li>
                                        <button className="start-course-btn">
                                            <span><Link to="?ZombieMarket">僵尸市场</Link></span>
                                        </button>
                                    </li>
                                    <li>
                                        <button className="start-course-btn">
                                            <span><Link to="?ZombieSimulator">基因模拟</Link></span>
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
                                <Route path="*" component={Page}></Route>
                            </div>
                        </div>
                    </section>
                </Router>
            </Fragment>
            );
    }
}


export default App
