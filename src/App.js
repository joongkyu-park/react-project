import './App.css';
import TOC from './components/TOC';
import ReadContent from './components/ReadContent';
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';
import Subject from './components/Subject';
import Control from './components/Control';
import React, {Component} from 'react';

class App extends Component {
  constructor(props){ //생성자를 이용하여 state 초기화
    super(props);
    this.max_content_id = 3;
    this.state = {
      mode:'welcome',
      selected_content_id:2,
      subject:{title:"WEB", sub:"World Wide Web!"},
      welcome:{title:"Welcome", desc:"Hello, React!"},
      contents:[
        {id:1, title:"HTML", desc:"HTML is for information"},
        {id:2, title:"CSS", desc:"CSS is for design"},
        {id:3, title:"JavaScript", desc:"JavaScript is for interactive"}
      ]
    }
  }
  getReadContent(){
    var i = 0;
    while(i<this.state.contents.length){
      var data = this.state.contents[i];
      if(data.id===this.state.selected_content_id){
        return data;
      }
      i++;
    }
  }
  getContent(){
    var _title, _desc, _article, _content = null;
    if(this.state.mode==='welcome'){
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    }else if(this.state.mode === 'read'){
      _content = this.getReadContent();
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>
    } else if(this.state.mode ==='create'){
      _article = <CreateContent onSubmit={function(_title,_desc){
        this.max_content_id++;
        // this.state.contents.push(
        //   {id:this.max_content_id, title:_title, desc:_desc}
        //   );
        var _contents = this.state.contents.concat(
          {id:this.max_content_id, title:_title, desc:_desc}
        );
        this.setState({
          contents:_contents,
          mode:'read',
          selected_content_id:this.max_content_id
        });
      }.bind(this)}></CreateContent>
    } else  if(this.state.mode === 'update'){
      _content = this.getReadContent();
      _article = <UpdateContent data={_content} onSubmit={function(_id,_title, _desc){
        var _contents = Array.from(this.state.contents);
        var i = 0;
        while(i<_contents.length){
          if(_contents[i].id === _id){
            _contents[i] = {id:_id, title:_title, desc:_desc};
            break;
            }
            i++;
          }        

        this.setState({
          contents:_contents,
          mode:'read'
        });
      }.bind(this)}></UpdateContent>
    }
    return _article;
  }
  render(){
 
    return (
      <div className="App">
        <Subject 
        title={this.state.subject.title} 
        sub={this.state.subject.sub}
        onChangePage = {function(){
          this.setState({mode:'welcome'});
        }.bind(this)
        // 컴포넌트로써 관리하기위해 props에 state를 바꾸는 함수를 만들어서 넣고 하위컴포넌트로 던져준다.
        }>
        </Subject>

        
        {/* <header>
            <h1><a href="/" onClick={function(e){
              e.preventDefault(); //이벤트의 기본동작을 막는다. 여기서는 a태그의 기본적인 동작인 href이 가리키는 페이지로 이동하는 것을 막음.
              // this.state.mode = 'welcome';
              // 위 코드가 안되는 2가지 이유.
              // 1. this가 가리키는게 없음 => 이벤트함수끝에 .bind()를 해줌으로써 this가 해당 컴포넌트를 가리키게한다.
              // 2. 리액트가 원하는 방식이 아님 => this.setState 메소드를 이용
위의 방법으로도 mode 값이 바뀌긴하지만, 정말 값만 바뀔뿐 내부적으로는 바뀐지도모르고 관련된 일을 처리하지 못함. setState 함수를 사용해야 내부적으로 관련된 일들을 진행해준다.
              
              this.setState({
                mode:'welcome'
              });
            }.bind(this)}>{this.props.title}</a></h1>
            {this.props.sub}
        </header>   */}
        

        <TOC 
        data={this.state.contents}
        onChangePage={function(id){
          this.setState({
            mode :'read',
            selected_content_id:Number(id) // Number : 문자를 강제로 숫자로 바꾸는 함수
          });

        }.bind(this)}

        ></TOC>

       <Control onChangeMode={function(_mode){
         if(_mode==='delete'){
            if(window.confirm('really?')){
              var _contents = Array.from(this.state.contents)
              var i =0;
              while(i < _contents.length){
                if(_contents[i].id===this.state.selected_content_id){
                  _contents.splice(i,1);
                  break;
                }
                i++;
              }
              this.setState({
                mode:'welcome',
                contents:_contents
              });
              alert('deleted!');
            }
         } else{
          this.setState({
            mode:_mode
          });         }
         
       }.bind(this)
       }></Control>

        
        {this.getContent()}
      </div>
    );
  }
}

export default App;
