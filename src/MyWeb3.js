import Web3 from "web3";
import abi from './ZombieCore.json'
import ContractAddress from './ContractAddress'

const MyWeb3 ={
    init() {
        /*
        '1': Ethereum Main Network
        '2': Morden Test network
        '3': Ropsten Test Network
        '4': Rinkeby Test Network
        '5': Goerli Test Network
        '42': Kovan Test Network
        */
        return new Promise((resolve, reject) => {
            //let currentChainId = parseInt(window.ethereum.chainId, 16)
            let ethereum = window.ethereum
            //禁止自动刷新，metamask要求写的
            ethereum.autoRefreshOnNetworkChange = false
            //开始调用metamask
            ethereum.enable().then(function (accounts) {
                //初始化provider
                let provider = window['ethereum'] || window.web3.currentProvider
                //初始化Web3
                window.web3 = new Web3(provider)
                //获取到当前以太坊网络id
                window.web3.eth.net.getId().then(function (result) {
                    let currentChainId = result
                    //设置最大监听器数量，否则出现warning
                    window.web3.currentProvider.setMaxListeners(300)
                    //从json获取到当前网络id下的合约地址
                    let currentContractAddress = ContractAddress[currentChainId]
                    if(currentContractAddress !== undefined){
                        //实例化合约
                        window.MyContract = new window.web3.eth.Contract(abi.abi,currentContractAddress)
                        //获取到当前默认的以太坊地址
                        window.defaultAccount = accounts[0].toLowerCase()
                        //that.allEvents(window.MyContract)
                        resolve(true)
                    }else{
                        reject('Unknow Your ChainId:'+currentChainId)
                    }
                })
            }).catch(function (error) {
                console.log(error)
            })
        })
    },
    //僵尸总量
    zombieCount() {
        return new Promise((resolve, reject) => {
            window.MyContract.methods.zombieCount().call().then(function(zombieCount) {
                resolve(zombieCount)
            })
        })
    },
    //获得单个僵尸数据
    zombies(zombieId){
        return new Promise((resolve, reject) => {
            if(zombieId>=0){
                window.MyContract.methods.zombies(zombieId).call().then(function(zombies) {
                    resolve(zombies)
                })
            }
        })
    },
    //获得僵尸拥有者地址
    zombieToOwner(zombieId){
        return new Promise((resolve, reject) => {
            if(zombieId>=0){
                window.MyContract.methods.zombieToOwner(zombieId).call().then(function(zombies) {
                    resolve(zombies.toLowerCase())
                })
            }
        })
    },
    //获得当前用户的所有僵尸id
    getZombiesByOwner(){
        return new Promise((resolve, reject) => {
            window.MyContract.methods.getZombiesByOwner(window.defaultAccount).call().then(function(zombies) {
                resolve(zombies)
            })
        })
    },
    //创建随机僵尸
    createZombie(_name){
        return new Promise((resolve, reject) => {
            window.MyContract.methods.createZombie(_name).send({from:window.defaultAccount})
            .on('transactionHash', function(transactionHash){
                resolve(transactionHash)
            })
            .on('confirmation', function(confirmationNumber, receipt){
                console.log({confirmationNumber:confirmationNumber,receipt:receipt})
            })
            .on('receipt', function(receipt){
                console.log({receipt:receipt})
                window.location.reload()
            })
            .on('error', function(error,receipt){
                console.log({error:error,receipt:receipt})
                reject({error:error,receipt:receipt})
            })
        })
    },
    //购买僵尸
    buyZombie(_name){
        return new Promise((resolve, reject) => {
            window.MyContract.methods.zombiePrice().call().then(function(zombiePrice) {
                window.MyContract.methods.buyZombie(_name).send({from:window.defaultAccount,value:zombiePrice})
                .on('transactionHash', function(transactionHash){
                    resolve(transactionHash)
                })
                .on('confirmation', function(confirmationNumber, receipt){
                    console.log({confirmationNumber:confirmationNumber,receipt:receipt})
                })
                .on('receipt', function(receipt){
                    console.log({receipt:receipt})
                    window.location.reload()
                })
                .on('error', function(error,receipt){
                    console.log({error:error,receipt:receipt})
                    reject({error:error,receipt:receipt})
                })
            })
        })
    },
    //僵尸对战
    attack(_zombieId,_targetId){
        return new Promise((resolve, reject) => {
            window.MyContract.methods.attack(_zombieId,_targetId).send({from:window.defaultAccount})
            .on('transactionHash', function(transactionHash){
                resolve(transactionHash)
            })
            .on('confirmation', function(confirmationNumber, receipt){
                console.log({confirmationNumber:confirmationNumber,receipt:receipt})
            })
            .on('receipt', function(receipt){
                console.log({receipt:receipt})
                window.location.reload()
            })
            .on('error', function(error,receipt){
                console.log({error:error,receipt:receipt})
                reject({error:error,receipt:receipt})
            })
        })
    },
    //僵尸改名
    changeName(_zombieId,_name){
        return new Promise((resolve, reject) => {
            window.MyContract.methods.changeName(_zombieId,_name).send({from:window.defaultAccount})
            .on('transactionHash', function(transactionHash){
                resolve(transactionHash)
            })
            .on('confirmation', function(confirmationNumber, receipt){
                console.log({confirmationNumber:confirmationNumber,receipt:receipt})
            })
            .on('receipt', function(receipt){
                console.log({receipt:receipt})
                window.location.reload()
            })
            .on('error', function(error,receipt){
                console.log({error:error,receipt:receipt})
                reject({error:error,receipt:receipt})
            })
        })
    },
    //僵尸喂食
    feed(_zombieId){
        return new Promise((resolve, reject) => {
            window.MyContract.methods.feed(_zombieId).send({from:window.defaultAccount})
            .on('transactionHash', function(transactionHash){
                resolve(transactionHash)
            })
            .on('confirmation', function(confirmationNumber, receipt){
                console.log({confirmationNumber:confirmationNumber,receipt:receipt})
            })
            .on('receipt', function(receipt){
                console.log({receipt:receipt})
                window.location.reload()
            })
            .on('error', function(error,receipt){
                console.log({error:error,receipt:receipt})
                reject({error:error,receipt:receipt})
            })
        })
    },
    //僵尸付费升级
    levelUp(_zombieId){
        return new Promise((resolve, reject) => {
            window.MyContract.methods.levelUpFee().call().then(function(levelUpFee) {
                window.MyContract.methods.levelUp(_zombieId).send({from:window.defaultAccount,value:levelUpFee})
                .on('transactionHash', function(transactionHash){
                    resolve(transactionHash)
                })
                .on('confirmation', function(confirmationNumber, receipt){
                    console.log({confirmationNumber:confirmationNumber,receipt:receipt})
                })
                .on('receipt', function(receipt){
                    console.log({receipt:receipt})
                    window.location.reload()
                })
                .on('error', function(error,receipt){
                    console.log({error:error,receipt:receipt})
                    reject({error:error,receipt:receipt})
                })
            })
        })
    },
    //获取僵尸喂食次数
    zombieFeedTimes(_zombieId){
        return new Promise((resolve, reject) => {
            window.MyContract.methods.zombieFeedTimes(_zombieId).call().then(function(zombieFeedTimes) {
                resolve(zombieFeedTimes)
            })
        })
    },
    //获取最低售价
    minPrice(){
        return new Promise((resolve, reject) => {
            window.MyContract.methods.minPrice().call().then(function(minPrice) {
                resolve(window.web3.utils.fromWei(minPrice,'ether'))
            })
        })
    },
    //获取税金
    tax(){
        return new Promise((resolve, reject) => {
            window.MyContract.methods.tax().call().then(function(tax) {
                resolve(window.web3.utils.fromWei(tax,'ether'))
            })
        })
    },
    //出售我的僵尸
    saleMyZombie(_zombieId,_price){
        return new Promise((resolve, reject) => {
            window.MyContract.methods.saleMyZombie(_zombieId,window.web3.utils.toWei(_price.toString())).send({from:window.defaultAccount})
            .on('transactionHash', function(transactionHash){
                resolve(transactionHash)
            })
            .on('confirmation', function(confirmationNumber, receipt){
                console.log({confirmationNumber:confirmationNumber,receipt:receipt})
            })
            .on('receipt', function(receipt){
                console.log({receipt:receipt})
                window.location.reload()
            })
            .on('error', function(error,receipt){
                console.log({error:error,receipt:receipt})
                reject({error:error,receipt:receipt})
            })
        })
    },
    //获得商店里僵尸数据
    zombieShop(_zombieId){
        return new Promise((resolve, reject) => {
            window.MyContract.methods.zombieShop(_zombieId).call().then(function(shopInfo) {
                shopInfo.price = window.web3.utils.fromWei(shopInfo.price,'ether')
                resolve(shopInfo)
            })
        })
    },
    //获得商店所有僵尸
    getShopZombies(){
        return new Promise((resolve, reject) => {
            window.MyContract.methods.getShopZombies().call().then(function(zombieIds) {
                resolve(zombieIds)
            })
        })
    },
    //购买商店里的僵尸
    buyShopZombie(_zombieId,_price){
        return new Promise((resolve, reject) => {
            window.MyContract.methods.buyShopZombie(_zombieId).send({from:window.defaultAccount,value:window.web3.utils.toWei(_price.toString())})
            .on('transactionHash', function(transactionHash){
                resolve(transactionHash)
            })
            .on('confirmation', function(confirmationNumber, receipt){
                console.log({confirmationNumber:confirmationNumber,receipt:receipt})
            })
            .on('receipt', function(receipt){
                console.log({receipt:receipt})
                window.location.reload()
            })
            .on('error', function(error,receipt){
                console.log({error:error,receipt:receipt})
                reject({error:error,receipt:receipt})
            })
        })
    },
    //获得合约拥有者地址
    owner(){
        return new Promise((resolve, reject) => {
            window.MyContract.methods.owner().call().then(function(owner) {
                resolve(owner.toLowerCase())
            })
        })
    },
    //获得合约名称
    name(){
        return new Promise((resolve, reject) => {
            window.MyContract.methods.name().call().then(function(name) {
                resolve(name)
            })
        })
    },
    //获得合约标识
    symbol(){
        return new Promise((resolve, reject) => {
            window.MyContract.methods.symbol().call().then(function(symbol) {
                resolve(symbol)
            })
        })
    },
    //查询余额
    checkBalance(){
        return new Promise((resolve, reject) => {
            this.owner().then(function (owner) {
                if(window.defaultAccount === owner){
                    window.MyContract.methods.checkBalance().call({from:window.defaultAccount}).then(function(balance) {
                        resolve(window.web3.utils.fromWei(balance,'ether'))
                    })
                }else{
                    reject('You are not contract owner')
                }
            })
        })
    },
    //设置攻击胜率
    setAttackVictoryProbability(_attackVictoryProbability){
        return new Promise((resolve, reject) => {
            window.MyContract.methods.setAttackVictoryProbability(_attackVictoryProbability).send({from:window.defaultAccount})
            .then(function(result) {
                resolve(result)
            })
        })
    },
    //获得升级费
    levelUpFee(){
        return new Promise((resolve, reject) => {
            window.MyContract.methods.levelUpFee().call().then(function(levelUpFee) {
                resolve(window.web3.utils.fromWei(levelUpFee,'ether'))
            })
        })
    },
    //设置升级费
    setLevelUpFee(_fee){
        return new Promise((resolve, reject) => {
            window.MyContract.methods.setLevelUpFee(window.web3.utils.toWei(_fee.toString())).send({from:window.defaultAccount})
            .then(function(result) {
                resolve(result)
            })
        })
    },
    //设置最低售价
    setMinPrice(_value){
        return new Promise((resolve, reject) => {
            window.MyContract.methods.setMinPrice(window.web3.utils.toWei(_value.toString())).send({from:window.defaultAccount})
            .then(function(result) {
                resolve(result)
            })
        })
    },
    //获得僵尸售价
    zombiePrice(){
        return new Promise((resolve, reject) => {
            window.MyContract.methods.zombiePrice().call().then(function(zombiePrice) {
                resolve(window.web3.utils.fromWei(zombiePrice,'ether'))
            })
        })
    },
    //设置僵尸售价
    setZombiePrice(_value){
        return new Promise((resolve, reject) => {
            window.MyContract.methods.setZombiePrice(window.web3.utils.toWei(_value.toString())).send({from:window.defaultAccount})
            .then(function(result) {
                resolve(result)
            })
        })
    },
    //设置税金
    setTax(_value){
        return new Promise((resolve, reject) => {
            window.MyContract.methods.setTax(window.web3.utils.toWei(_value.toString())).send({from:window.defaultAccount})
            .then(function(result) {
                resolve(result)
            })
        })
    },
    //提款
    withdraw(){
        return new Promise((resolve, reject) => {
            this.owner().then(function (owner) {
                if(window.defaultAccount === owner){
                    window.MyContract.methods.withdraw().send({from:window.defaultAccount}).then(function(res) {
                        resolve(res)
                    })
                }else{
                    reject('You are not contract owner')
                }
            })
        })
    },
    //新僵尸事件
    EventNewZombie(){
        return window.MyContract.events.NewZombie({},{fromBlock: 0, toBlock: 'latest'})
    },
    //出售僵尸事件
    EventSaleZombie(){
        return new Promise((resolve, reject) => {
            window.MyContract.events.SaleZombie({fromBlock: 0, toBlock: 'latest'},function (error, event) {
                resolve(event)
            })
        })
    },
    //所有事件
    allEvents(){
        window.MyContract.events.allEvents({fromBlock: 0}, function(error, event){
            console.log({allEvents:event})
        }).on("connected", function(subscriptionId){
           console.log({connected_subscriptionId:subscriptionId})
        }).on('data', function(event){
           console.log({event_data:event})
        }).on('changed', function(event){
            console.log({event_changed:event})
        }).on('error', function(error, receipt) { 
            console.log({event_error:error,receipt:receipt})
        })
    }
}
    
export default MyWeb3;