import Web3 from "web3";
import abi from './ZombieCore.json'

const MyWeb3 ={
    zombieCount() {
        return new Promise((resolve, reject) => {
            window.MyContract.methods.zombieCount().call().then(function(zombieCount) {
                resolve(zombieCount)
            })
        })
    },
    zombies(zombieId){
        return new Promise((resolve, reject) => {
            if(zombieId>=0){
                window.MyContract.methods.zombies(zombieId).call().then(function(zombies) {
                    resolve(zombies)
                })
            }
        })
    },
    zombieToOwner(zombieId){
        return new Promise((resolve, reject) => {
            if(zombieId>=0){
                window.MyContract.methods.zombieToOwner(zombieId).call().then(function(zombies) {
                    resolve(zombies.toLowerCase())
                })
            }
        })
    },
    getZombiesByOwner(){
        return new Promise((resolve, reject) => {
            window.MyContract.methods.getZombiesByOwner(window.defaultAccount).call().then(function(zombies) {
                resolve(zombies)
            })
        })
    },
    createZombie(_name){
        return new Promise((resolve, reject) => {
            window.MyContract.methods.createZombie(_name).send({from:window.defaultAccount})
            .on('transactionHash', function(hash){
                console.log({transactionHash:hash})
                resolve({transactionHash:hash})
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
            // .then(function(receipt){
            //     //console.log({receipt:receipt})
            //     resolve(receipt)
            // })
        })
    },
    buyZombie(_name){
        return new Promise((resolve, reject) => {
            window.MyContract.methods.zombiePrice().call().then(function(zombiePrice) {
                window.MyContract.methods.buyZombie(_name).send({from:window.defaultAccount,value:zombiePrice})
                .on('transactionHash', function(hash){
                    console.log({transactionHash:hash})
                    resolve({transactionHash:hash})
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
                // .then(function(receipt){
                //     //console.log({receipt:receipt})
                //     resolve(receipt)
                // })
            })
        })
    },
    attack(_zombieId,_targetId){
        return new Promise((resolve, reject) => {
            window.MyContract.methods.attack(_zombieId,_targetId).send({from:window.defaultAccount})
            .then(function(receipt){
                //console.log({receipt:receipt})
                resolve(receipt)
            })
        })
    },
    changeName(_zombieId,_name){
        return new Promise((resolve, reject) => {
            window.MyContract.methods.changeName(_zombieId,_name).send({from:window.defaultAccount})
            .then(function(receipt){
                //console.log({receipt:receipt})
                resolve(receipt)
            })
        })
    },
    feed(_zombieId){
        return new Promise((resolve, reject) => {
            window.MyContract.methods.feed(_zombieId).send({from:window.defaultAccount})
            .then(function(receipt){
                //console.log({receipt:receipt})
                resolve(receipt)
            })
        })
    },
    levelUp(_zombieId){
        return new Promise((resolve, reject) => {
            window.MyContract.methods.levelUpFee().call().then(function(levelUpFee) {
                window.MyContract.methods.levelUp(_zombieId).send({from:window.defaultAccount,value:levelUpFee})
                .then(function(receipt){
                    //console.log({receipt:receipt})
                    resolve(receipt)
                })
            })
        })
    },
    zombieFeedTimes(_zombieId){
        return new Promise((resolve, reject) => {
            window.MyContract.methods.zombieFeedTimes(_zombieId).call().then(function(zombieFeedTimes) {
                resolve(zombieFeedTimes)
            })
        })
    },
    minPrice(){
        return new Promise((resolve, reject) => {
            window.MyContract.methods.minPrice().call().then(function(minPrice) {
                resolve(window.web3.utils.fromWei(minPrice,'ether'))
            })
        })
    },
    tax(){
        return new Promise((resolve, reject) => {
            window.MyContract.methods.tax().call().then(function(tax) {
                resolve(window.web3.utils.fromWei(tax,'ether'))
            })
        })
    },
    saleMyZombie(_zombieId,_price){
        return new Promise((resolve, reject) => {
            window.MyContract.methods.saleMyZombie(_zombieId,window.web3.utils.toWei(_price.toString())).send({from:window.defaultAccount})
            .then(function(result) {
                resolve(result)
            })
        })
    },
    zombieShop(_zombieId){
        return new Promise((resolve, reject) => {
            window.MyContract.methods.zombieShop(_zombieId).call().then(function(shopInfo) {
                shopInfo.price = window.web3.utils.fromWei(shopInfo.price,'ether')
                resolve(shopInfo)
            })
        })
    },
    getShopZombies(){
        return new Promise((resolve, reject) => {
            window.MyContract.methods.getShopZombies().call().then(function(zombieIds) {
                resolve(zombieIds)
            })
        })
    },
    buyShopZombie(_zombieId,_price){
        return new Promise((resolve, reject) => {
            window.MyContract.methods.buyShopZombie(_zombieId).send({from:window.defaultAccount,value:window.web3.utils.toWei(_price.toString())})
            .then(function(result) {
                resolve(result)
            })
        })
    },

    owner(){
        return new Promise((resolve, reject) => {
            window.MyContract.methods.owner().call().then(function(owner) {
                resolve(owner.toLowerCase())
            })
        })
    },
    name(){
        return new Promise((resolve, reject) => {
            window.MyContract.methods.name().call().then(function(name) {
                resolve(name)
            })
        })
    },
    symbol(){
        return new Promise((resolve, reject) => {
            window.MyContract.methods.symbol().call().then(function(symbol) {
                resolve(symbol)
            })
        })
    },
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
    setAttackVictoryProbability(_attackVictoryProbability){
        return new Promise((resolve, reject) => {
            window.MyContract.methods.setAttackVictoryProbability(_attackVictoryProbability).send({from:window.defaultAccount})
            .then(function(result) {
                resolve(result)
            })
        })
    },
    levelUpFee(){
        return new Promise((resolve, reject) => {
            window.MyContract.methods.levelUpFee().call().then(function(levelUpFee) {
                resolve(window.web3.utils.fromWei(levelUpFee,'ether'))
            })
        })
    },
    setLevelUpFee(_fee){
        return new Promise((resolve, reject) => {
            window.MyContract.methods.setLevelUpFee(window.web3.utils.toWei(_fee.toString())).send({from:window.defaultAccount})
            .then(function(result) {
                resolve(result)
            })
        })
    },
    setMinPrice(_value){
        return new Promise((resolve, reject) => {
            window.MyContract.methods.setMinPrice(window.web3.utils.toWei(_value.toString())).send({from:window.defaultAccount})
            .then(function(result) {
                resolve(result)
            })
        })
    },
    zombiePrice(){
        return new Promise((resolve, reject) => {
            window.MyContract.methods.zombiePrice().call().then(function(zombiePrice) {
                resolve(window.web3.utils.fromWei(zombiePrice,'ether'))
            })
        })
    },
    setZombiePrice(_value){
        return new Promise((resolve, reject) => {
            window.MyContract.methods.setZombiePrice(window.web3.utils.toWei(_value.toString())).send({from:window.defaultAccount})
            .then(function(result) {
                resolve(result)
            })
        })
    },
    setTax(_value){
        return new Promise((resolve, reject) => {
            window.MyContract.methods.setTax(window.web3.utils.toWei(_value.toString())).send({from:window.defaultAccount})
            .then(function(result) {
                resolve(result)
            })
        })
    },
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

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    EventNewZombie(){
        return window.MyContract.events.NewZombie({},{fromBlock: 0, toBlock: 'latest'})
    },
    EventSaleZombie(){
        return new Promise((resolve, reject) => {
            window.MyContract.events.SaleZombie({fromBlock: 0, toBlock: 'latest'},function (error, event) {
                resolve(event)
            })
        })
    },

    allEvents(){
        window.MyContract.events.allEvents({fromBlock: 0}, function(error, event){
            console.log({allEvents:event})
        //}).on("connected", function(subscriptionId){
        //    console.log({connected_subscriptionId:subscriptionId})
        //}).on('data', function(event){
        //    console.log({event_data:event})
        }).on('changed', function(event){
            console.log({event_changed:event})
        }).on('error', function(error, receipt) { 
            console.log({event_error:error,receipt:receipt})
        })
    },
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
            let currentChainId = window.ethereum.networkVersion
            let ethereum = window.ethereum
            let contractAddress = {
                3:'0x1a3cA7AbE6370D33986b2D2aC6F1F9A656f87b4D',
                4:'0xbca6885699Ee9ae9B2255538B5a3EfB3082bE5ac',
                5:'0x6817c8475Ad33Aa86422160C3d1C673c453A76dE',
                42:'0x6817c8475Ad33Aa86422160C3d1C673c453A76dE',
                5777:'0x8b11Af05bdBB4848b59f2C3A5Bf3E2BB24c744fD',
            }
            ethereum.autoRefreshOnNetworkChange = false
            let that = this
            ethereum.enable().then(function (accounts) {
                let provider = window['ethereum'] || window.web3.currentProvider
                window.web3 = new Web3(provider)
                window.web3.currentProvider.setMaxListeners(300)
                let currentContractAddress = contractAddress[currentChainId]
                if(currentContractAddress !== undefined){
                    window.MyContract = new window.web3.eth.Contract(abi.abi,currentContractAddress)
                    window.defaultAccount = accounts[0].toLowerCase()
                    //that.allEvents(window.MyContract)
                    resolve(true)
                }else{
                    reject('Unknow Your ChainId:'+currentChainId)
                }
            }).catch(function (error) {
                console.log(error)
            })
            ethereum.on('accountsChanged', function (accounts) {
                console.log("accountsChanged:"+accounts)
                window.location.reload()
                that.init()
            })
            ethereum.on('chainChanged', function (chainId) {
                console.log("chainChanged:"+chainId)
                window.location.reload()
                that.init()
            })
            ethereum.on('networkChanged', function (networkVersion) {
                console.log("networkChanged:"+networkVersion)
                window.location.reload()
                that.init()
            })
        })
    }
}
    
export default MyWeb3;