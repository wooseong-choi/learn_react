import React from 'react';
import { Link } from 'react-router-dom';
import './Join.css'
import axios from 'axios';

function join(id, pw){
    axios.post('http://localhost:3333/user/create',{ id:id, password:pw })
    .then(response =>{
        console.log(response);
        if(response.data == null || response.data == '')
            return alert("생성이 실패하였습니다.");

        localStorage.setItem("user",JSON.stringify(response.data));
        return window.location.href = '/';
    })
    .catch(error=>{
        console.error('Error fetching data:', error);
        return alert("에러가 발생했습니다.");
    });

}
function Join(){
    return (
        <div className="login-div">
            <div>
                <form id="login-form" onSubmit={(e)=>{
                    e.preventDefault();
                    e.stopPropagation();
                    join(e.target.id.value, e.target.pwd.value);
                }}>
                    <h2>회원가입</h2>
                    <input type="text" id="id" className="login-input" />
                    <input type="passward" id="pwd" className="login-input" />
                    <p className='underLine'>press '<input type="submit" value='X'/>' to <span className='bold'>'Join'</span> us</p>

                </form>
            </div>
        </div>
    )
}

export default Join;