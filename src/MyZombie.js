import React, { Component } from 'react'
import ZombieCard from "./ZombieCard"
import '../public/ZombiePreview.css'
import Page from "./Page"
import MyWeb3 from './MyWeb3'
import {
    BrowserRouter as 
    Route,
    Link
  } from "react-router-dom"

class MyZombie extends Component {
    constructor(props) {
        super(props);
        this.state = {zombieCount:"",zombies:[],zombieName:'',transactionHash:'',buyAreaDisp:1,createAreaDisp:1,txHashDisp:0}
        this.createZombie=this.createZombie.bind(this)
        this.buyZombie=this.buyZombie.bind(this)
        this.inputChange=this.inputChange.bind(this)
    }
        
    componentDidMount(){
        let that = this
        let ethereum = window.ethereum
        if (typeof  ethereum !== 'undefined' || (typeof window.web3 !== 'undefined')) {
            MyWeb3.init().then(function(res){
                that.myZombies()
            })
        }else {
            alert('You have to install MetaMask !')
        }
    }
    
    myZombies(){
        let that = this
        MyWeb3.getZombiesByOwner().then(function(zombies){
            if(zombies.length > 0){
                for(let i=0;i<zombies.length;i++){
                    MyWeb3.zombies(zombies[i]).then(function (result) {
                        let _zombies = that.state.zombies
                        result.zombieId = zombies[i]
                        _zombies.push(result);
                        that.setState({zombies:_zombies})
                    })
                }
            }
        })
    }
    createZombie(){
        let that = this
        let _name = this.state.zombieName
        MyWeb3.createZombie(_name).then(function(transactionHash){
            that.setState({
                transactionHash:transactionHash,
                createAreaDisp:0,
                txHashDisp:1
            })
        })
    }
    buyZombie(){
        let that = this
        let _name = this.state.zombieName
        MyWeb3.buyZombie(_name).then(function(transactionHash){
            that.setState({
                transactionHash:transactionHash,
                buyAreaDisp:0,
                txHashDisp:1
            })
        })
    }
    inputChange(){
        this.setState({
            zombieName:this.input.value
        })
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
                    <div className='buyArea' display={this.state.buyAreaDisp}>
                        <div className='zombieInput'>
                            <input 
                                type="text" 
                                id='zombieName' 
                                placeholder='给僵尸起个好名字' 
                                ref={(input)=>{this.input=input}} 
                                value={this.state.zombieName}
                                onChange={this.inputChange}>
                            </input>
                        </div>
                        <div>
                            <button className="attack-btn" onClick={this.buyZombie}>
                                <span>
                                    购买僵尸    
                                </span>
                            </button>
                        </div>
                    </div>
                    <div className='transactionHash' display={this.state.txHashDisp}>{this.state.transactionHash}<br></br>等待确认中...</div>
                </div>
            )
        }else{
            return(<div>
                <div className='createArea' display={this.state.createAreaDisp}>
                    <div className='zombieInput'>
                        <input 
                            type="text" 
                            id='zombieName' 
                            placeholder='给僵尸起个好名字' 
                            ref={(input)=>{this.input=input}} 
                            value={this.state.zombieName}
                            onChange={this.inputChange}>
                        </input>
                    </div>
                    <div>
                        <button className="attack-btn" onClick={this.createZombie}>
                            <span>
                                免费领养僵尸    
                            </span>
                        </button>
                    </div>
                </div>
                <div className='transactionHash' display={this.state.txHashDisp}>{this.state.transactionHash}<br></br>等待确认中...</div>
            </div>)
        }
    }
}  
export default MyZombie;