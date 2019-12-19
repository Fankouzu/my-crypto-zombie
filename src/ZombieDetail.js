import React, { Component } from 'react'
import ZombiePreview from "./ZombiePreview"
import '../public/ZombiePreview.css'
import MyWeb3 from './MyWeb3'
import moment from "moment"
import {
    BrowserRouter as 
    Route,
    Link
  } from "react-router-dom"
  import Page from "./Page";

class Zombiedetail extends Component {
    constructor(props) {
        super(props)
        const searchParams = new URLSearchParams(window.location.search)
        
        const id = searchParams.get('id')   
        this.state = {
            id:id ,
            zombie:{},owner:'',
            zombieFeedTimes:0,
            myPrice:0,
            minPrice:0,
            AttackBtn: () =>{return(<div></div>)}, 
            RenameArea: () =>{return(<div></div>)},
            zombieNewname:'',
            FeedArea: () =>{return(<div></div>)},
            LevelupArea: () =>{return(<div></div>)},
            SellArea: () =>{return(<div></div>)},
            BuyArea: () =>{return(<div></div>)},
            onShop:false,
            shopInfo:{}
        }
        this.zombieChangeName = this.zombieChangeName.bind(this)
        this.changeName = this.changeName.bind(this)
        this.feed = this.feed.bind(this)
        this.levelUp = this.levelUp.bind(this)
        this.sellZombie = this.sellZombie.bind(this)
        this.buyShopZombie = this.buyShopZombie.bind(this)
        this.setPrice = this.setPrice.bind(this)
    }
     
    componentDidMount(){
        let that = this
        let ethereum = window.ethereum
        if (typeof  ethereum !== 'undefined' || (typeof window.web3 !== 'undefined')) {
            MyWeb3.init().then(function(res){
                that.getZombie(that.state.id)
                that.getZombieFeedTimes(that.state.id)
                that.getMinPrice()
                that.getZombieShop(that.state.id)
            })
        }else {
            alert('You have to install MetaMask !')
        }
    }
    getZombieShop(zombieId){
        let that = this
        MyWeb3.zombieShop(zombieId).then(function (shopInfo) {
            if(shopInfo.price>0){
                that.setState({onShop:true,shopInfo:shopInfo})
            }
        })
    }
    getMinPrice(){
        let that = this
        MyWeb3.minPrice().then(function (minPrice) {
            if(minPrice>0){
                MyWeb3.tax().then(function (tax) {
                    if(tax>0){
                        that.setState({myPrice:parseFloat(minPrice)+parseFloat(tax),minPrice:parseFloat(minPrice)+parseFloat(tax)})
                    }
                })
            }
        })
    }
    getZombieFeedTimes(zombieId){
        let that = this
        MyWeb3.zombieFeedTimes(zombieId).then(function (result) {
            if(result>0){
                that.setState({zombieFeedTimes:result})
            }
        })
    }
    setPrice(event){
        this.setState({
            myPrice:event.target.value
        })
    }
    zombieChangeName(event){
        this.setState({
            zombieNewname:event.target.value
        })
    }
    changeName(){
        if(window.defaultAccount !== undefined){
            MyWeb3.changeName(this.state.id,this.state.zombieNewname).then(function(receipt){
                console.log(receipt)
                window.location.reload()
            })
        }
    }
    feed(){
        if(window.defaultAccount !== undefined){
            MyWeb3.feed(this.state.id).then(function(receipt){
                console.log(receipt)
                window.location.reload()
            })
        }
    }
    levelUp(){
        if(window.defaultAccount !== undefined){
            MyWeb3.levelUp(this.state.id).then(function(receipt){
                console.log(receipt)
                window.location.reload()
            })
        }
    }
    sellZombie(){
        if(window.defaultAccount !== undefined 
            && this.state.myPrice*this.state.minPrice>0 
            && this.state.myPrice>=this.state.minPrice){
            MyWeb3.saleMyZombie(this.state.id,this.state.myPrice).then(function(receipt){
                console.log(receipt)
                window.location.reload()
            })
        }
    }
    buyShopZombie(){
        if(window.defaultAccount !== undefined){
            MyWeb3.buyShopZombie(this.state.id,this.state.shopInfo.price).then(function(receipt){
                console.log(receipt)
                window.location.reload()
            })
        }
    }
    getZombie(zombieId){
        let that = this
        MyWeb3.zombies(zombieId).then(function (result) {
            that.setState({zombie:result})
            that.setState({zombieNewname:result.name})
            MyWeb3.zombieToOwner(zombieId).then(function (zombieOwner) {
                that.setState({owner:zombieOwner})
                if(window.defaultAccount !== undefined &&
                    zombieOwner !== window.defaultAccount){
                    that.setState({AttackBtn : () =>{
                        return(
                        <button className="attack-btn">
                            <span>
                                <Link to={`?ZombieAttack&id=`+that.state.id} >发起挑战</Link>
                            </span>
                        </button>)
                        }
                    })
                    if(that.state.onShop){
                        that.setState({BuyArea : () =>{
                            return(
                                <div>
                                    <div className='zombieInput'>
                                        售价：{that.state.shopInfo.price} ether
                                    </div>
                                    <div>
                                        <button className="pay-btn pay-btn-last" onClick={that.buyShopZombie}>
                                            <span>
                                                买下它
                                            </span>
                                        </button>
                                    </div>
                                </div>
                                )
                            }
                        })
                    }
                }else{
                    that.setState({AttackBtn : () =>{return(<div></div>)}})
                    if(that.state.zombie.level > 1){
                        that.setState({RenameArea : () =>{
                            return(
                                <div>
                                    <div className='zombieInput'>
                                        <input 
                                            type="text" 
                                            id='zombieName' 
                                            placeholder={that.state.zombie.name} 
                                            value={that.state.zombieNewname}
                                            onChange={that.zombieChangeName}>
                                        </input>
                                    </div>
                                    <div>
                                        <button className="pay-btn pay-btn-last" onClick={that.changeName}>
                                            <span>
                                                改个名字
                                            </span>
                                        </button>
                                    </div>
                                </div>)
                            }
                        })
                    }
                    if(that.state.zombie.readyTime === 0 || moment().format('X')>that.state.zombie.readyTime){
                        that.setState({FeedArea : () =>{
                            return(
                                <div>
                                    <button className="pay-btn" onClick={that.feed}>
                                        <span>
                                            喂食一次
                                        </span>
                                    </button>
                                </div>)
                            }
                        })
                    }
                    that.setState({LevelupArea : () =>{
                        return(
                            <div>
                                <button className="pay-btn" onClick={that.levelUp}>
                                    <span>
                                        付费升级
                                    </span>
                                </button>
                            </div>)
                        }
                    })
                    if(!that.state.onShop){
                        that.setState({SellArea : () =>{
                            return(
                                <div>
                                    <div className='zombieInput'>
                                        <input 
                                            type="text" 
                                            id='sellPrice' 
                                            placeholder={that.state.minPrice} 
                                            value={that.state.myPrice}
                                            onChange={that.setPrice}>
                                        </input>
                                    </div>
                                    <div>
                                        <button className="pay-btn pay-btn-last" onClick={that.sellZombie}>
                                            <span>
                                                卖了它
                                            </span>
                                        </button>
                                    </div>
                                </div>
                                )
                            }
                        })
                    }
                } 
            })
        })
    }

    render() { 
        var readyTime = '已冷却'                                
        if(this.state.zombie.readyTime !== undefined && moment().format('X')<this.state.zombie.readyTime){
            readyTime = moment(parseInt(this.state.zombie.readyTime)*1000).format('YYYY-MM-DD')
        }
        var AttackBtn = this.state.AttackBtn
        var RenameArea = this.state.RenameArea
        var FeedArea = this.state.FeedArea
        var LevelupArea = this.state.LevelupArea
        var SellArea = this.state.SellArea
        var BuyArea = this.state.BuyArea
        return ( 
            <div className="App">
                <div  className="row zombie-parts-bin-component" authenticated="true" lesson="1" lessonidx="1">
                    <div  className="zombie-preview" id="zombie-preview">
                        <div className="zombie-char">
                            <div className="zombie-loading zombie-parts" style={{display:"none"}}></div>
                                <ZombiePreview zombie={this.state.zombie}></ZombiePreview>
                            <div className="hide">
                                <div className="card-header bg-dark hide-overflow-text">
                                    <strong ></strong></div>
                                <small className="hide-overflow-text">CryptoZombie第一级</small>
                            </div>
                        </div>
                    </div>
                    <div className="zombie-detail">
                        <dl>
                            <dt>{this.state.zombie.name}</dt>
                            <dt>主人</dt>
                            <dd>{this.state.owner}</dd>
                            <dt>等级</dt>
                            <dd>{this.state.zombie.level}</dd>
                            <dt>胜利次数</dt>
                            <dd>{this.state.zombie.winCount}</dd>
                            <dt>失败次数</dt>
                            <dd>{this.state.zombie.lossCount}</dd>
                            <dt>冷却时间</dt>
                            <dd>{readyTime}</dd>
                            <dt>喂食次数</dt>
                            <dd>{this.state.zombieFeedTimes}</dd>
                            <dt></dt>
                            <dd>
                                <AttackBtn></AttackBtn>
                                <RenameArea></RenameArea>
                                <FeedArea></FeedArea>
                                <LevelupArea></LevelupArea>
                                <SellArea></SellArea>
                                <BuyArea></BuyArea>
                            </dd>
                        </dl>
                    </div>
                    <Route path="*" component={Page}></Route>
                </div>
            </div>
        );
    }
}

export default Zombiedetail;