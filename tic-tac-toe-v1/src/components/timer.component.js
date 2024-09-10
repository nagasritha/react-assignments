// import React, { Component } from 'react'

// export class Timer extends Component {

//     state = {
//         ms : 0,
//         timerCondition : this.props.timerCondition,
//         running:false
//     }

//     toggle=()=>{
//         let {running} = this.state;

//         if(running || this.iid){
//             clearInterval(this.iid);
//         }else{
//             this.iid = setInterval(()=>this.setState({ms:this.state.ms+100}),100);
//         }
//         this.setState(state=>state.running = !state.running);
//     }

//     start=()=>{
//         if(this.iid) {
//             clearInterval(this.iid);
//         }
//         this.iid=setInterval(()=>this.setState({ms:this.state.ms+100,running:true}),100);
//     }

//     stop=()=>{
//         if(this.iid) {
//             clearInterval(this.iid);
//         }
//         this.setState({running:false});
//     }
//     reset=()=>{
//         if(this.iid){
//             clearInterval(this.iid);
//             this.setState({ms:0,running:false})
//         }
//     }

//     // componentDidMount(){
//     //     let {name,currentPlayer} = this.props;
//     //     console.log(name,currentPlayer);
//     //     if(name===currentPlayer){
//     //         this.toggle();
//     //     }else{
//     //         this.reset();
//     //     }
//     // }

//     componentDidUnMount(){
//         clearInterval(this.iid);

//     }

//     componentDidUpdate(){
//         console.log('updated')
//         let {name,timerCondition} = this.props;
//         console.log(name,timerCondition);
//         if(timerCondition){
//             this.start();
//             //this.toggle();
//         }else{
//             //this.stop();
//             //this.toggle();
//         }
//     }

//     formateTime= (num)=>{
//         if(num<10){
//             return `0${num}`;
//         }else{
//             return num;
//         }
//     }
//     formateMiliseconds= (num)=>{
//         if(num<100){
//             return `00${num}`;
//         }else if(num<10){
//             return `0${num}`;
//         }else{
//             return num;
//         }
//     }

//     render() {
//         let ms = this.state.ms;
//         let _ms = ms%1000;
//         let sec = Math.ceil((ms-_ms)/1000);
//         let minutes = Math.round(sec/60); 
//         //console.log(this.props.name,this.props.currentPlayer);
//         return <div>

//             <div className='timer-component'>
//                 <h1>{this.props.name}</h1>
//                 <div className='timer'>
//                     <span className='minites'>{this.formateTime(minutes)}:</span>
//                     <span className='seconds'>{this.formateTime(sec)}.</span>
//                     <span className='milliseconds'>{this.formateMiliseconds(_ms)}</span>
//                 </div>
//                 <button onClick={this.toggle}>{this.state.running ? 'Stop' :'Pause'} </button>
//                 <button onClick={this.reset}>Reset</button>
//             </div>
//         </div>
//     }
// }

import React, { Component } from 'react';
import { If } from './if.component';

export class Timer extends Component {
    state = {
        ms: 0,
        running: false
    };

    toggle = () => {
        let { running } = this.state;

        if (running || this.iid) {
            clearInterval(this.iid);
        } else {
            this.iid = setInterval(() => this.setState({ ms: this.state.ms + 100 }), 100);
        }
        this.setState(state => ({ running: !state.running }));
    };

    start = () => {
        if (this.iid) {
            clearInterval(this.iid);
        }
        this.iid = setInterval(() => this.setState({ ms: this.state.ms + 100, running: true }), 100);
    };

    stop = () => {
        if (this.iid) {
            clearInterval(this.iid);
        }
        this.setState({ running: false });
    };

    reset = () => {
        if (this.iid) {
            clearInterval(this.iid);
            this.setState({ ms: 0, running: false });
        }
    };

    componentDidUpdate(prevProps) {
        if (prevProps.timerCondition !== this.props.timerCondition) {
            if (this.props.timerCondition && !this.state.running) {
                this.start();
            } else if (!this.props.timerCondition && this.state.running) {
                this.stop();
            }
        }
        if(prevProps.restarted !== this.props.restarted && this.props.restarted){
            this.reset();
        }
    }

    componentWillUnmount() {
        clearInterval(this.iid);
    }

    formatTime = num => (num < 10 ? `0${num}` : num);

    formatMilliseconds = num => {
        if (num < 10) {
            return `00${num}`;
        } else if (num < 100) {
            return `0${num}`;
        } else {
            return num;
        }
    };

    buttons = () => (
        <div>
            <button onClick={this.toggle}>{this.state.running ? 'Stop' : 'Start'}</button>
            <button onClick={this.reset}>Reset</button>

        </div>
    )

    render() {
        let ms = this.state.ms;
        let _ms = ms % 1000;
        let sec = Math.floor(ms / 1000);
        let minutes = Math.floor(sec / 60);
        sec = sec % 60;

        return (
            <div className='timer-component'>
                <h1>{this.props.name}</h1>
                <div className='timer'>
                    <span className='minutes'>{this.formatTime(minutes)}:</span>
                    <span className='seconds'>{this.formatTime(sec)}.</span>
                    <span className='milliseconds'>{this.formatMilliseconds(_ms)}</span>
                </div>
                <If condition='false' child={this.buttons} />
            </div>
        );
    }
}