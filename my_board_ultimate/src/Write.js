import React, {Component, useState, useReducer, useEffect } from 'react';
import { Link, useAsyncError, useParams } from 'react-router-dom';
import './App.css';
import axios from 'axios';

function write(){
    let user = JSON.parse(localStorage.getItem('user'));

    let title = document.querySelector('[name=title]').value;
    let content = document.querySelector('[name=content]').value;

    let bbsInfo = {
        uid : Number(user.uid),
        title : title,
        content : content,
        use_yn : 'Y'
    }

    axios.post('http://localhost:3333/bbs/write',bbsInfo)
    .then(response =>{
        console.log(response);
        if(response.data == null || response.data == '')
            return alert("생성이 실패하였습니다.");

        window.location.href = '/detail/'+response.data.bbs_id;
    })
    .catch(error=>{
        console.error('Error fetching data:', error);
        return alert("에러가 발생했습니다.");
    });


}

function update(bbsId){
    let user = JSON.parse(localStorage.getItem('user'));

    let title = document.querySelector('[name=title]').value;
    let content = document.querySelector('[name=content]').value;

    let bbsInfo = {
        bbsId : Number(bbsId),
        uId : Number(user.uid),
        title : title,
        content : content
    }

    axios.post('http://localhost:3333/bbs/write/'+bbsId,bbsInfo)
    .then(response =>{
        console.log(response);
        if(response.data == null || response.data == '')
            return alert("수정이 실패하였습니다.");

        window.location.href = '/detail/'+response.data.bbs_id;
    })
    .catch(error=>{
        console.error('Error fetching data:', error);
        return alert("에러가 발생했습니다.");
    });
}

function Writebox(props){
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        if (props.mode === 'UPDATE') {
            setTitle(props.title);
            setContent(props.content);
        }
    }, [props.mode, props.title, props.content]);

    const handleChange = (e) => {
        if (e.target.name === 'title') {
            setTitle(e.target.value);
        } else if (e.target.name === 'content') {
            setContent(e.target.value);
        }
    };

    return (
        <div className='writeBox'>
            <form>
                <input name="title" placeholder='제목을 입력해주세요' value={title} onChange={handleChange} />
                <textarea name='content' placeholder='내용을 입력해주세요' value={content} onChange={handleChange}></textarea>
            </form>
        </div>
    );
}

function Write(){
    const { bbsId } = useParams();
    let [mode, setMode] = useState('WRITE');
    let [bbs, setBbs] = useState({ title: '', content: '' });
    useEffect(() => {
        if (bbsId != null && bbsId != undefined) {
            setMode('UPDATE');
            axios.get('http://localhost:3333/bbs/detail/' + bbsId)
                .then(res => {
                    console.log(res);
                    setBbs(res.data);
                })
                .catch(err => {
                    console.error('Error fetching data:', err);
                });
        }
    }, [bbsId]);

    let buttonBox;

    if( mode === 'WRITE' ){
        buttonBox = <div className='buttonBox'>
                        <button><Link to={'/list'}>뒤로가기</Link></button>
                        <button onClick={write}>글 작성</button>
                    </div>
    }else if(mode === 'UPDATE'){
        // bbs = update_setting(bbsId);
        // console.log(bbs);
        // content = bbs.content;
        // title = bbs.title;
        buttonBox = <div className='buttonBox'>
                        <button><Link to={'/detail/'+bbsId}>뒤로가기</Link></button>
                        <button onClick={e=>{update(bbsId)}}>글 수정</button>
                    </div>
    }

    return (
        <>
        {buttonBox}
        <Writebox mode={mode} title={bbs.title} content={bbs.content}/>
        </>
    );
}

export default Write;