import React, { Component } from 'react';
class Subject extends Component {
    render(){
      return (
        <header>
            <h1><a href="/" onClick={function(e){
              e.preventDefault();
              this.props.onChangePage();
            }.bind(this)}>
            {/* 상위컴포넌트에서 props로 던져준함수를 받음!*/}               
            {this.props.title}</a></h1>
            {this.props.sub}
        </header>  
      );
    }
  }

export default Subject; 