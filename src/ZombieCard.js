import React, { Component } from 'react';
import ZombiePreview from "./ZombiePreview"

class ZombieCard extends Component {
    constructor(props) {
        super(props)
        this.state = { zombie:this.props.zombie,name:this.props.name,level:this.props.level}
    }
    UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps!==this.props){
            this.setState({ _className:nextProps._className,_style:nextProps._style})
            return true
        }else{
            return false
        }
    }
    render() { 
        return ( 
            <div className="game-card home-card selectable">
                <div className="zombie-char">
                <ZombiePreview zombie={this.state.zombie}></ZombiePreview>
                    <div className="zombie-card card bg-shaded">
                        <div className="card-header bg-dark hide-overflow-text">
                            <strong>{this.state.name}</strong>
                        </div>
                        <small className="hide-overflow-text">CryptoZombie{this.state.level}级</small>
                    </div>
                </div>
            </div>            
        )
    }
}
 
export default ZombieCard;