import React, { Component } from 'react';
import  ZombieArmy  from "./ZombieArmy"
import  MyZombie  from "./MyZombie"
import  ZombieMarket  from "./ZombieMarket"
import  ZombieSimulator  from "./ZombieSimulator"
import ZombieDetail from "./ZombieDetail";
import ZombieAttack from "./ZombieAttack";
import ContractAdmin from "./ContractAdmin";

class Page extends Component {
    constructor(props) {
        super(props)
        this.state = {page:'ZombieArmy' }
    }
    UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps!==this.props){
            this.setState({nextProps})
            let search = nextProps.location.search.replace(/\?/,'')
            let page = search === '' ?  'ZombieArmy' : search
            this.setState({page:page})
            return true
        }else{
            return false
        }
    }
    render() { 
        switch (this.state.page){
            case 'ZombieArmy':
                return(<ZombieArmy></ZombieArmy>)
            case 'MyZombie':
                return(<MyZombie></MyZombie>)
            case 'ZombieMarket':
                return(<ZombieMarket></ZombieMarket>)
            case 'ZombieSimulator':
                return(<ZombieSimulator></ZombieSimulator>)
            case 'ZombieDetail':
                return(<ZombieDetail></ZombieDetail>)
            case 'ZombieAttack':
                return(<ZombieAttack></ZombieAttack>)
            case 'ContractAdmin':
                return(<ContractAdmin></ContractAdmin>)
            default:
                return(<ZombieArmy></ZombieArmy>)
        }
    }
}
 
export default Page;