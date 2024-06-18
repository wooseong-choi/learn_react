import React, {Component, useState, useReducer } from 'react';
import { Link, useParams } from 'react-router-dom';
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

function update(props){
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
        bbsId : Number(props.bbsId),
        uId : Number(user.uId),
        title : title,
        content : content
    }

    bbsList.push(bbsInfo);

    localStorage.setItem('bbsList', JSON.stringify(bbsList));

    localStorage.setItem('bbsCount',Number(bbsCount)+1);
    
    window.location.href = '/detail/'+bbsCount;

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
    let bbs;
    let title = '';
    let content = '';
    if (bbsId != null && bbsId != undefined ){
        bbs = update_setting(bbsId);
        console.log(bbs);
        title = bbs.title;
        content = bbs.content;
    } 
    return (
        <>
        <div className='buttonBox'>
            <button><Link to={'/list'}>뒤로가기</Link></button>
            <button onClick={write}>글 작성</button>
        </div>
        <div className='writeBox'>
            <form>
                <input name="title" placeholder='제목을 입력해주세요' value={title}/>
                <textarea name='content' placeholder='내용을 입력해주세요'>{content}</textarea>
            </form>
        </div>
        </>
    );
}

export default Write;