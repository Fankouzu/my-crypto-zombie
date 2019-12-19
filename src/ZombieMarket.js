import React, { Component } from 'react';
import MyWeb3 from './MyWeb3'
import ZombieCard from "./ZombieCard";
import {
    BrowserRouter as 
    Route,
    Link
  } from "react-router-dom"
import Page from "./Page";

class ZombieMarket extends Component {
    constructor(props) {
        super(props);
        this.state = {shopZombies:[]  }
    }
     
    componentDidMount(){
        //console.log(window.web3._extend.utils)
        let that = this
        let ethereum = window.ethereum
        if (typeof ethereum !== 'undefined' || (typeof window.web3 !== 'undefined')) {
            MyWeb3.init().then(function(res){
                that.zombieShop()
            })
        }else {
            alert('You have to install MetaMask !')
        }
    }

    zombieShop(){
        let that = this
        MyWeb3.getShopZombies().then(function(zombieIds){
            if(zombieIds.length>0){
                for(var i=0;i<zombieIds.length;i++){
                    let zombieId = zombieIds[i]
                    if(zombieId>=0){
                        MyWeb3.zombies(zombieId).then(function(zombies) {
                            let _shopZombies = that.state.shopZombies
                            zombies.zombieId = zombieId
                            _shopZombies.push(zombies);
                            that.setState({shopZombies:_shopZombies})
                        })
                    }
                }
            }
        })
    }
    
    render() { 
        if(this.state.shopZombies.length>0) {
            return ( 
                <div className="cards">
                    {this.state.shopZombies.map((item,index)=>{
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
 
export default ZombieMarket;