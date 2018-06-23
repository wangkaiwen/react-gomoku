import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//棋盘格子组件
class Square extends React.Component {
    render() {
        return (
            <button className="square" onClick={()=>{this.props.onClick()}}>
                <div className={'circle '+(this.props.value||'')}> </div>
            </button>
        );
    }
}
//棋盘组件
const num=10;
class Board extends React.Component {
    constructor(){
        super();
        let cell=new Array(num).fill(null);
        let squares=cell.map(item=>cell.slice());
        this.state={
            squares:squares,
            whiteNext:true,
            hasWinner:false
        }
    }
    renderSquare(i,j) {
        return <Square key={i+j+''}
            value={this.state.squares[i][j]}
            onClick={()=>this.handleClick(i,j)}
        />;
    }
    handleClick(i,j){
        if(this.state.hasWinner){
            return;
        }
        const squares=this.state.squares.slice();
        squares[i][j]=this.state.whiteNext?'white':'black';
        let hasWinner=calculateWinner(squares,i,j);
        this.setState({squares:squares,whiteNext:!this.state.whiteNext,hasWinner:hasWinner});
    }

    render() {
        let status = '该'+(this.state.whiteNext?'白':'黑')+'色方玩家下子';
        if(this.state.hasWinner){
            let color=this.state.hasWinner==='white'?'白':'黑';
            status=color+'方胜出';
        }
        return (
            <div className="board">
                <div className="status">{status}</div>
                {this.state.squares.map((row,i)=>{
                    return (
                    <div className="board-row" key={i}>
                        {row.map((col,j)=>{
                            return this.renderSquare(i,j)
                        })}
                    </div>)
                })}
            </div>
        );
    }
}
//整个游戏组件
class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares,i,j) {
    let color=squares[i][j];
    let rows=[];
    let col=[];
    let left=[],right=[];
    for(let ii=0;ii<squares.length;ii++){
        for(let jj=0;jj<squares[ii].length;jj++){
            if(ii===i){
                rows.push(squares[ii][jj]);
            }
            if(jj===j){
                col.push(squares[ii][jj]);
            }
            if(ii+jj===i+j){
                right.push(squares[ii][jj]);
            }
            if(ii-jj===i-j){
                left.push(squares[ii][jj]);
            }
        }
    }
    if(rows.join('').includes(color.repeat(5))||col.join('').includes(color.repeat(5))||right.join('').includes(color.repeat(5))||left.join('').includes(color.repeat(5))){
        return squares[i][j];
    }
    return false;
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
