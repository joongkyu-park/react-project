import React, { Component } from 'react';

class TOC extends Component{
    shouldComponentUpdate(newProps, newState){
		if(this.props.data === newProps.data){
			return false;
		}
		else{
			return true;
		}
    }
    
    render(){
        var lists=[];
        var data = this.props.data;
        var i = 0;
        while(i<data.length){
            lists.push(
            <li key={data[i].id}>
                <a 
                    href={"/content/"+data[i].id}
                    id = {data[i].id}
                    onClick={function(id, e){
                        e.preventDefault();
                        /* this.props.onChangePage(e.target.id);
                        // e.target으로 해당태그를 선택후 id값 넣기
                        */
                       this.props.onChangePage(id);
                    }.bind(this, data[i].id)} // 이 bind함수에서 넘겨준 매개변수가 이벤트 함수 매개변수 첫번째로 전달됨.
                >{data[i].title}</a>
            </li>)
            // 위의 key 값은 각각의 목록을 다른 것들과 구분해주는 식별자의 역할을 하는데, 애플리케이션에서 사용한다기보다는 리액트가 자기가 내부적으로 필요해서 우리에게 요청하는거라고 생각하면된다.
            i++;
        }
        return (
            <nav>
                <ul>
                    {lists}
                </ul>
            </nav>
        );
    }
  }

export default TOC; 