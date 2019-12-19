import React,{Component} from 'react'
import './static/ZombiePreview.css';
import  ZombiePreview  from "./ZombiePreview";
import  ZombieToggler  from "./ZombieToggler";



class ZombieSimulator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _value:{
                "head":1,
                "eye":1,
                "shirt":1
            },
            _className:"zombie-parts head-visible-1 eye-visible-1 shirt-visible-1",
            _style:{
                eye_color:{filter:"hue-rotate(0deg)"},
                skin:{filter:"hue-rotate(0deg)"},
                color:{filter:"hue-rotate(0deg)"},
            }
        };
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(event) {
        var _id = event.target.id.replace(/_select/,"");

        var _value = this.state._value
        var _className = this.state._className
        var _style = this.state._style
        _value[_id] = event.target.value;

        if(_id === "head" || _id === "eye" || _id === "shirt"){
            _className = "zombie-parts head-visible-"+ _value["head"] +" eye-visible-"+ _value["eye"] +" shirt-visible-" + _value["shirt"];
        }else{
            _style[_id] = {filter:"hue-rotate("+_value[_id]+"deg)"}
        }
        this.setState({_className,_style,_value});
    }
    render() {
        return  <div className="App">
        <div className="row zombie-parts-bin-component zombie-simulator" authenticated="true" lesson="1" lessonidx="1">
            <div  className="zombie-preview" id="zombie-preview">
                <div className="zombie-char">
                    <ZombiePreview _style={this.state._style} _className={this.state._className} _value={this.state._value}></ZombiePreview>
                </div>
            </div>
            <ZombieToggler handleChange={this.handleChange}></ZombieToggler>
        </div>
    </div>;
    }
}



export default ZombieSimulator
