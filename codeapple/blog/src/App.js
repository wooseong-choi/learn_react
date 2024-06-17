// warning messege 없애는 주석
/// /* eslint-disable */
// 워닝 메세지같은거 출력해주는 기능을 lint 라고 하는데 그러 비활성화 해주는 것

import logo from './logo.svg';
import './App.css';
import { useState } from 'react';


function App() {
  let title = "";
  let [name, setName] = useState({name1:'남자 코트 추천',name2:'강남 우동맛집',name3:'파이썬독학'});
  // js의 Destructuring 문법
  // let num = [1,2,3]; 여기서 [1,2,3] 이라는 배열의 요소를 변수로 쓰고싶다 => Destructuring 등장배경
  // let a = num[0]; // 이게 아니라
  // let [a,c] = [1,2]; 이렇게 선언하면 1:1 대응되게 됨
  // Q:변수 문법이 따로 있는데 왜 state를 써야하나?
  // A:예를들어 title 변수값을 바꾸면 바로 바뀌지 않고 바꿔주는 코드를 짜야 하는데
  // state가 dispatch 함수로 변경되게 되면 자동으로 컴포넌트를 다시 렌더링하기 때문
  let [like, setLike] = useState({like1:0,like2:0,like3:0});

  function updateLike(likeId){
    if(likeId == '1')
      setLike({like1:like.like1+1, like2:like.like2, like3:like.like3});
    else if(likeId == '2')
      setLike({like1:like.like1, like2:like.like2+1, like3:like.like3});
    else if(likeId == '3')
      setLike({like1:like.like1, like2:like.like2, like3:like.like3+1});
  }

  return (
    <div className="App">
      <div className="black-nav">
        <h4>React Blog</h4>
      </div>
      <button onClick={ (e)=>{
        const sort = (ob)=>{
          const arr = [];
          for (let i in ob){
            arr.push([i,ob[i]]);
          }         
          console.log(ob);
          // console.log(arr);
          let temp_arr = arr.sort((a,b) => a[1] < b[1]? -1 : (a[1] > b[1]? 1:0) );
          console.log(temp_arr);
          const json = {};
          // 이부분 다시 보기
          for (let i in temp_arr){
            console.log(i);
            json['name'+(Number(i)+1)] = temp_arr[i][1];        
          }
          // 색인배열화 라고 하던데 잘 모르겠음
          return json;
        }
        let temp = sort({...name});
        console.log(temp);
        setName(temp);
      }}>가나다순 정렬</button>
      <div className="list">
        <h4>{ name.name1 }
          <span id='1' onClick={ (e) => { updateLike(e.target.id); }}>👍</span> {like.like1}
        </h4>
        <input type='button' onClick={(e) => { 
          let copy = {...name}; // ... 문법은 괄호 벗겨주세요 라는 뜻이다 이후 다시 괄호를 씌워주면 새 오브젝트가 된다.
          copy.name1 = '여자 코트 추천';
          setName(copy);
         }} value="변경"/>
        <p>2월 17일 발행</p>
      </div>
      <div className="list">
        <h4>{ name.name2 }
          <span id='2' onClick={ (e) => { updateLike(e.target.id); }}>👍</span> {like.like2}
        </h4>
        <p>2월 17일 발행</p>
      </div>
      <div className="list">
        <h4>{ name.name3 }
          <span id='3' onClick={ (e) => { updateLike(e.target.id); }}>👍</span> {like.like3}
        </h4>
        <p>2월 17일 발행</p>
      </div>
      <h4>{title}</h4>

      <Modal />

    </div>
  );
}

function Modal (){
  return (
  <div className='modal'>
    <h4>제목</h4>
    <p>날짜</p>
    <p>상세내용</p>
  </div>
  )
}

export default App;
