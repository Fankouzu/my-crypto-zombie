import React, { Component } from 'react';
import MyWeb3 from './MyWeb3'

class ContractAdmin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            contractAddress:'',
            contractOwner:'',
            ContractName:'',
            ContractSymbol:'',
            ContractBalance:'',
            attackVictoryProbability:70,
            levelUpFee:0,
            minPrice:0,
            tax:0,
            zombiePrice:0
        }
        this.inputAttackVictoryProbability = this.inputAttackVictoryProbability.bind(this)
        this.setAttackVictoryProbability = this.setAttackVictoryProbability.bind(this)
        this.inputLevelUpFee = this.inputLevelUpFee.bind(this)
        this.setLevelUpFee = this.setLevelUpFee.bind(this)
        this.inputMinPrice = this.inputMinPrice.bind(this)
        this.setMinPrice = this.setMinPrice.bind(this)
        this.inputTax = this.inputTax.bind(this)
        this.setTax = this.setTax.bind(this)
        this.inputZombiePrice = this.inputZombiePrice.bind(this)
        this.setZombiePrice = this.setZombiePrice.bind(this)
        this.withdraw = this.withdraw.bind(this)
    }
    
    componentDidMount(){
        let that = this
        let ethereum = window.ethereum
        if (typeof  ethereum !== 'undefined' || (typeof window.web3 !== 'undefined')) {
            MyWeb3.init().then(function(res){
                // console.log(window.web3)
                // console.log(ethereum)
                // console.log(window.MyContract)
                MyWeb3.owner().then(function (contractOwner) {
                    if(window.defaultAccount === contractOwner){
                        that.setState({contractOwner:contractOwner})
                        that.getContractName()
                        that.getContractSymbol()
                        that.checkBalance()
                        that.levelUpFee()
                        that.minPrice()
                        that.tax()
                        that.zombiePrice()
                        that.setState({
                            contractAddress:window.MyContract._address
                        })
                    }
                })
            })
        }else {
            alert('You have to install MetaMask !')
        }
    }
    getContractName(){
        let that = this
        MyWeb3.name().then(function (name) {
            that.setState({ContractName:name})
        })
    }
    getContractSymbol(){
        let that = this
        MyWeb3.symbol().then(function (symbol) {
            that.setState({ContractSymbol:symbol})
        })
    }
    checkBalance(){
        let that = this
        MyWeb3.checkBalance().then(function (balance) {
            that.setState({ContractBalance:balance})
        })
    }
    withdraw(){
        let that = this
        MyWeb3.withdraw().then(function (res) {
            that.checkBalance()
        })
    }
    setAttackVictoryProbability(){
        MyWeb3.setAttackVictoryProbability(this.state.attackVictoryProbability).then(function (res) {
            console.log(res)
            window.location.reload()
        })
    }
    inputAttackVictoryProbability(event){
        this.setState({
            attackVictoryProbability:event.target.value
        })
    }
    levelUpFee(){
        let that = this
        MyWeb3.levelUpFee().then(function (levelUpFee) {
            that.setState({levelUpFee:levelUpFee})
        })
    }
    setLevelUpFee(){
        MyWeb3.setLevelUpFee(this.state.levelUpFee).then(function (res) {
            console.log(res)
            window.location.reload()
        })
    }
    inputLevelUpFee(event){
        this.setState({
            levelUpFee:event.target.value
        })
    }
    minPrice(){
        let that = this
        MyWeb3.minPrice().then(function (minPrice) {
            that.setState({minPrice:minPrice})
        })
    }
    setMinPrice(){
        MyWeb3.setMinPrice(this.state.minPrice).then(function (res) {
            console.log(res)
            window.location.reload()
        })
    }
    inputMinPrice(event){
        this.setState({
            minPrice:event.target.value
        })
    }
    tax(){
        let that = this
        MyWeb3.tax().then(function (tax) {
            that.setState({tax:tax})
        })
    }
    setTax(){
        MyWeb3.setTax(this.state.tax).then(function (res) {
            console.log(res)
            window.location.reload()
        })
    }
    inputTax(event){
        this.setState({
            tax:event.target.value
        })
    }
    zombiePrice(){
        let that = this
        MyWeb3.zombiePrice().then(function (zombiePrice) {
            that.setState({zombiePrice:zombiePrice})
        })
    }
    setZombiePrice(){
        MyWeb3.setZombiePrice(this.state.zombiePrice).then(function (res) {
            console.log(res)
            window.location.reload()
        })
    }
    inputZombiePrice(event){
        this.setState({
            zombiePrice:event.target.value
        })
    }


    render() { 
        if(window.defaultAccount === this.state.contractOwner){
            return ( 
                <div className='contract-admin'>
                    <dl>
                        <dt>合约地址</dt>
                        <dd className='lowcase'>{this.state.contractAddress}</dd>
                        <dt>管理员</dt>
                        <dd className='lowcase'>{this.state.contractOwner}</dd>
                        <dt>合约名称</dt>
                        <dd>{this.state.ContractName}</dd>
                        <dt>合约标识</dt>
                        <dd>{this.state.ContractSymbol}</dd>
                        <dt>合约余额</dt>
                        <dd>
                            {this.state.ContractBalance}
                            <button className="pay-btn pay-btn-last" onClick={this.withdraw}>
                                <span>
                                    提款
                                </span>
                            </button>
                        </dd>
                        <dt>对战胜率</dt>
                        <dd>
                            <input 
                                type="text" 
                                id='attackVictoryProbability'
                                value={this.state.attackVictoryProbability}
                                onChange={this.inputAttackVictoryProbability}>
                            </input>
                            <button className="pay-btn pay-btn-last" onClick={this.setAttackVictoryProbability}>
                                <span>
                                    设置
                                </span>
                            </button>
                        </dd>
                        <dt>升级费</dt>
                        <dd>
                            <input 
                                type="text" 
                                id='levelUpFee'
                                value={this.state.levelUpFee}
                                onChange={this.inputLevelUpFee}>
                            </input>
                            <button className="pay-btn pay-btn-last" onClick={this.setLevelUpFee}>
                                <span>
                                    设置
                                </span>
                            </button>
                        </dd>
                        <dt>最低售价</dt>
                        <dd>
                            <input 
                                type="text" 
                                id='minPrice'
                                value={this.state.minPrice}
                                onChange={this.inputMinPrice}>
                            </input>
                            <button className="pay-btn pay-btn-last" onClick={this.setMinPrice}>
                                <span>
                                    设置
                                </span>
                            </button>
                        </dd>
                        <dt>税金</dt>
                        <dd>
                            <input 
                                type="text" 
                                id='tax'
                                value={this.state.tax}
                                onChange={this.inputTax}>
                            </input>
                            <button className="pay-btn pay-btn-last" onClick={this.setTax}>
                                <span>
                                    设置
                                </span>
                            </button>
                        </dd>
                        <dt>僵尸售价</dt>
                        <dd>
                            <input 
                                type="text" 
                                id='zombiePrice'
                                value={this.state.zombiePrice}
                                onChange={this.inputZombiePrice}>
                            </input>
                            <button className="pay-btn pay-btn-last" onClick={this.setZombiePrice}>
                                <span>
                                    设置
                                </span>
                            </button>
                        </dd>
                    </dl>
                </div>
            )
        }else{
            return(
                <div></div>
            )
        }
    }
}
 
export default ContractAdmin;