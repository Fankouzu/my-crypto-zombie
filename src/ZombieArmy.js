import React, { Component } from 'react'
import ZombieCard from "./ZombieCard";
import './static/ZombiePreview.css';
import MyWeb3 from './MyWeb3'
import {
    BrowserRouter as 
    Route,
    Link
  } from "react-router-dom"
import Page from "./Page";

class ZombieArmy extends Component {
    constructor(props) {
        super(props);
        this.state = { zombieCount:"",zombies:[] }
    }
        
    componentDidMount(){
        //console.log(window.web3._extend.utils)
        let that = this
        let ethereum = window.ethereum
        console.log(ethereum)
        if (typeof ethereum !== 'undefined' || (typeof window.web3 !== 'undefined')) {
            MyWeb3.init().then(function(res){
                that.zombieArmy()
            })
        }else {
            alert('You have to install MetaMask !')
        }
    }
    zombieArmy(){
        let that = this
        MyWeb3.zombieCount().then(function(result){
            if(result > 0){
                for(let i=0;i<result;i++){
                    MyWeb3.zombies(i).then(function (result) {
                        let _zombies = that.state.zombies
                        result.zombieId = i
                        _zombies.push(result);
                        that.setState({zombies:_zombies})
                    })
                }
            }
        })
    }
    componentWillUnmount() {
        this.setState = (state, callback) => {
            return
        }
    }
    render() { 
        if(this.state.zombies.length>0) {
            return ( 
                <div className="cards">
                    {this.state.zombies.map((item,index)=>{
                        var name = item.name
                        var level = item.level
                        return(
                            <Link to={`?ZombieDetail&id=`+item.zombieId} key={index}>
                                <ZombieCard zombie={item} name={name} level={level} key={index}></ZombieCard>
                            </Link>
                        )
                    })}
                    <Route path="*" component={Page}></Route>
                </div> 
            )
        }else{
            return ( <div></div>)
        }
    }
}
 
export default ZombieArmy;