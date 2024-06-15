import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function Header(props){
  // console.log('props',props);
  return <header className="App-header">
  <img src={logo} className="App-logo" alt="logo" />
  <p>
    Edit <code>src/App.js</code> and save to reload.
  </p>
  <a
    className="App-link"
    href="/"
    rel="noopener noreferrer"
    onClick={(e)=>{
      e.preventDefault();
      e.stopPropagation();
      props.onChangeMode();
    }}
  >
    {props.title}
  </a>
</header>
}

function Navigation(props){
const lis = [];
for(let i = 0; i<props.topics.length;i++){
  let t = props.topics[i];
  lis.push(<li key={t.id}><a id={t.id} href={'/read/' + t.id} onClick={(e)=>{
    e.preventDefault();
    e.stopPropagation();
    props.onChangeMode2(Number(e.target.id));
  }}>{t.title}</a></li>);
}
return <nav>
        <ol>
          {lis}
        </ol>
      </nav>
}

function Article(props){
  return       <article>
  <h2>{props.title}</h2>
  {props.body}
</article>

}
function Create(props){
  return <article>
    <h2>Create</h2>
    <form onSubmit={e=>{
      e.preventDefault();
      const title = e.target.title.value;
      const body = e.target.body.value;
      props.onCreate(title,body);
    }}>
      <p><input type='text' name='title' placeholder='title'/></p>
      <p><textarea name="body" placeholder='body'></textarea></p>
      <p><input type='submit' value="create"/> </p>
    </form>
  </article>
}
function Update(props){
  const [title,setTitle] = useState(props.title);
  const [body,setBody] = useState(props.body);
  return <article>
    <h2>Update</h2>
    <form onSubmit={e=>{
      e.preventDefault(); 
      const title = e.target.title.value;
      const body = e.target.body.value;
      props.onUpdate(title,body);
    }}>
      <p><input type='text' name='title' placeholder='title' value={title} onChange={(e)=>{
        // 이벤트 주체인 해당 태그의 값 
        setTitle(e.target.value);
      }}/></p>
      <p><textarea name="body" placeholder='body' value={body} onChange={(e)=>{
        setBody(e.target.value);
      }}></textarea></p>
      <p><input type='submit' value="update"/> </p>
    </form>
  </article>
}

function App() {
  // const _mode = useState('WELCOME');
  // console.log(_mode);
  // // 스테이트는 2개의 인자를 가지는데 0번째 인자는 값, 1번쨰 인덱스는 바꾸는 함수
  // const mode = _mode[0]; // 스테이트의 값 매핑
  // const setMode = _mode[1]; // 스테이트의 변경하는 함수
  let [mode, setMode] = useState('WELCOME'); // 주석과 동일한 코드 
  let [id, setId] = useState(null);
  let [nextId, setNextId] = useState(4);
  const [topics, setTopincs] = useState([
    {id:1, title:'html', body:'html is ...'},
    {id:2, title:'css', body:'css is ...'},
    {id:3, title:'js', body:'js is ...'}
  ]);
  let content = null;
  
  let contextControl = null;

  if(mode == 'WELCOME'){
    content = <Article title="Welcome" body="Hello, WEB"></Article>
  }else if(mode == 'READ'){
    let title, body = null;
    for (let i = 0; i < topics.length; i++) {
      // console.log(topics[i].id,id);
      if(topics[i].id == id){
        title = topics[i].title;
        body = topics[i].body;
        break;
      }
    }
    content = <Article title={title} body={body}></Article>
    contextControl = <> <li><a href={'/update/'+id} onClick={e=>{
      e.preventDefault();
      setMode('UPDATE');

    }}>Update</a></li>
    <li><input type="button" value="Delete" onClick={e=>{
      const newTopics = []
      for (let index = 0; index < topics.length; index++) {
        if(topics[index].id !== id){
          newTopics.push(topics[index]);
        }
      }
      setTopincs(newTopics);
      setMode('WELCOME');
    }} /></li> </>
  } else if(mode == 'CREATE'){
    content = <Create onCreate={(title,body)=>{
      const newTopic = {id:nextId,title:title, body:body}
      // js immutability 관련 처리 범 객체 타입은 불변성이 있어 
      // 새 객체를 만든 후 거기에 새 값을 담아서 다시 할당
      // 리액트는 새 스테이트에 같은 값을할당하려 하면 값이 같은지 확인 후 같다면
      // 굳이 컴포넌트를 다시 로드하지 않는다. 하지만 js에서 객체타입은 설령 객체타입 안의 값이 변경되더라도
      // 같은 객체이기 때문에 리액트에서는 같은 값으로 인식, 컴포넌트를 다시 로드하지 않는다.
      // 그래서 이렇게 처리한다.
      const newTopics = [...topics];
      newTopics.push(newTopic);
      setTopincs(newTopics);
      // 글 작성후 상세 페이지 이동 처리
      setMode('READ');
      setId(nextId);
      setNextId(nextId+1);
    }}/>
  }else if(mode == 'UPDATE'){
    let title, body = null;
    for (let i = 0; i < topics.length; i++) {
      if(topics[i].id == id){
        title = topics[i].title;
        body = topics[i].body;
        break;
      }
    }
    content = <Update title={title} body={body} onUpdate={(title,body)=>{
      console.log(title, body);
      const newTopics = [...topics]
      const updatedTopic = {id:id, title:title, body:body}
      for(let i=0; i < newTopics.length; i++){
        if(newTopics[i].id === id){
          newTopics[i] = updatedTopic;
          break;
        }
      }
      setTopincs(newTopics);
      setMode('READ');
    }}></Update>
  }

  return (
    <div className="App">
      <Header title = "WEB" onChangeMode={()=>{
        setMode('WELCOME');

      }}></Header>
      <Navigation topics={topics} onChangeMode2={(id)=>{
        setMode('READ');
        setId(id);
      }}></Navigation>
      {content}
      <ul>
        <li><a href="/create" onClick={event=>{
          event.preventDefault();
          setMode('CREATE');
        }}>Create</a>
        </li>
        {contextControl}
      </ul>
    </div>
  );
}

export default App;
