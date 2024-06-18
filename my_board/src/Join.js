import React from 'react';
import { Link } from 'react-router-dom';
import './Join.css'

function join(id, pw){
    let userList = localStorage.getItem('userList');
    
    if(userList == null || userList == undefined)
        userList = [];
    else{
        userList = JSON.parse(userList);
    }
    for (const user in userList) {
        if(userList[user].id == id){ 
            return alert("이미 사용중인 아이디입니다.");
        }
    }

    let uid = localStorage.getItem('uidCount');

    if(uid == null || uid == undefined) uid = 1;

    let userInfo = {
        uid : Number(uid),
        id : id,
        pw : pw
    };

    userList.push(userInfo);

    localStorage.setItem("userList",JSON.stringify(userList));
    
    // 화면이 재 렌더링되지 않음
    // window.history.pushState(null,null,'/');
    localStorage.setItem('uidCount',Number(uid)+1);

    window.location.href = '/';

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