import React, {Component, useState, useReducer } from 'react';
import { Link, useAsyncError, useParams } from 'react-router-dom';
import './App.css';

function write(){
    let user = JSON.parse(localStorage.getItem('user'));
    
    let bbsCount = localStorage.getItem('bbsCount');

    if(bbsCount == null || bbsCount == undefined) bbsCount = 1;

    let bbsList = localStorage.getItem('bbsList');
    
    if(bbsList == null || bbsList == undefined) 
        bbsList = [];
    else{
        bbsList = JSON.parse(bbsList);
    }

    let title = document.querySelector('[name=title]').value;
    let content = document.querySelector('[name=content]').value;

    let bbsInfo = {
        bbsId : Number(bbsCount),
        uId : Number(user.uId),
        title : title,
        content : content
    }

    bbsList.push(bbsInfo);

    localStorage.setItem('bbsList', JSON.stringify(bbsList));

    localStorage.setItem('bbsCount',Number(bbsCount)+1);
    
    window.location.href = '/detail/'+bbsCount;

}

function update(bbsId){
    let user = JSON.parse(localStorage.getItem('user'));
    
    let bbsCount = localStorage.getItem('bbsCount');

    if(bbsCount == null || bbsCount == undefined) bbsCount = 1;

    let bbsList = localStorage.getItem('bbsList');
    
    if(bbsList == null || bbsList == undefined) 
        bbsList = [];
    else{
        bbsList = JSON.parse(bbsList);
    }

    let title = document.querySelector('[name="title"]').value;
    let content = document.querySelector('[name="content"]').value;
    console.log(bbsId);
    let bbsInfo = {
        bbsId : Number(bbsId),
        uId : Number(user.uId),
        title : title,
        content : content
    }

    for (let i = 0; i < bbsList.length; i++) {
        if(bbsList[i].bbsId == bbsId){
            bbsList[i] = bbsInfo;
        }
    }

    bbsList.push(bbsInfo);

    // localStorage.setItem('bbsList', JSON.stringify(bbsList));
    
    window.location.href = '/detail/'+bbsId;
}

function update_setting( bbsId ){
    let bbsList = JSON.parse(localStorage.getItem('bbsList') );
    let temp;
    for (let i = 0; i < bbsList.length; i++) {
        if(bbsList[i].bbsId == bbsId){
            temp = bbsList[i];
        }
    }
    return temp;
}


function Write(){
    const { bbsId } = useParams();
    let [mode, setMode] = useState('WRITE');
    let bbs;
    let [title,setTitle] = useState('');
    let content = '';
    if (bbsId != null && bbsId != undefined ){
        if(mode == 'WRITE'){
            setMode('UPDATE');
        }
    }

    let buttonBox;

    if( mode === 'WRITE' ){
        buttonBox = <div className='buttonBox'>
                        <button><Link to={'/list'}>뒤로가기</Link></button>
                        <button onClick={write}>글 작성</button>
                    </div>
    }else if(mode === 'UPDATE'){
        bbs = update_setting(bbsId);
        // console.log(bbs);
        content = bbs.content;
        title = bbs.title;
        buttonBox = <div className='buttonBox'>
                        <button><Link to={'/detail/'+bbsId}>뒤로가기</Link></button>
                        <button onClick={e=>{update(bbsId)}}>글 수정</button>
                    </div>
    }

    return (
        <>
        {buttonBox}
        <div className='writeBox'>
            <form>
                <input name="title" placeholder='제목을 입력해주세요' value={title} onChange={e=>{ setTitle( e.target.value) }}/>
                <textarea name='content' placeholder='내용을 입력해주세요' >{content}</textarea>
            </form>
        </div>
        </>
    );
}

export default Write;