import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';

const isLogin = function(){
    let user = localStorage.getItem('user');
    return user!=null&user!=undefined?true:false;
}

function goLogin(){
    // document.getElementById('login-form');
    let id = document.getElementById('id').value;
    let pw = document.getElementById('pwd').value;

    validateLogin(id, pw);
}

function validateLogin(id, pw){
    axios.post('http://localhost:3333/user/login',{ id:id, password:pw })
    .then(response =>{
        console.log(response.data);
        if(response.data == '')
            return alert('유저 정보가 없습니다.');
        localStorage.setItem("user",JSON.stringify(response.data));
        return window.location.href = '/list';
    })
    .catch(error=>{
        console.error('Error fetching data:', error);
        return alert('유저 정보가 없습니다.');
    });


}

function Login(){
    if(isLogin()){
        window.location.replace('/list');
    }
    return (<div className="login-div">
      <div>
        <form id="login-form" onSubmit={(e)=>{
            e.preventDefault();
            // e.stopPropagation();
            // alert(e.target.id.value, ':',e.target.pwd.value);
            // validateLogin(e.target.id.value, e.target.pwd.value);
        }}>
            <h2>로그인</h2>
            <input type="text" id="id" className="login-input" />
            <input type="password" id="pwd" className="login-input" />
            <p className='underLine'>Press '<span className='bold' onClick={goLogin}>Enter</span>' for Login</p>
            <p className='underLine'>or <span className='bold'><Link to="/join">'Join'</Link></span> us</p>
        </form>
      </div>
    </div>)
  }
  export default Login;