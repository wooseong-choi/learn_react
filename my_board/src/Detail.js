import React, {Component, useState, useReducer } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import './App.css';

function ButtonBox(props){

    let isUpdate = '';

    if( props.uId != null )
        isUpdate = <button><Link to={'/write/'+props.bbsId}>글 수정</Link></button>

    return (
        <div className='buttonBox'>
            <button><Link to={'/list'}>뒤로가기</Link></button>
            {isUpdate}
        </div>
    )
}

function Detail(){
    // const location = useLocation();
    // let temp = location.pathname.split('/');
    // bbsId = temp[temp.length-1];
    const { bbsId } = useParams();

    let bbs;

    console.log(bbsId);
    const bbsList = JSON.parse( localStorage.getItem('bbsList') );
    let user = localStorage.getItem('user');

    let uId;

    if(user != null && user != undefined){
        user = JSON.parse(user);
        uId = user.uId;
    }else
        uId = null;

    for (let i = 0; i < bbsList.length; i++) {
        if(bbsList[i].bbsId == bbsId ){
            bbs = bbsList[i];
            break;
        }
    }



    return (
        <>
        <ButtonBox uId={uId} bbsId = {bbsId} />
        <div className='writeBox'>
            <div>
                <div>
                    <h2>{bbs.title}</h2>
                </div>
                <div>
                    <pre>{bbs.content}</pre>
                </div>
            </div>
            <div className='commentDiv'>


            </div>
        </div>
        </>
    );
}

export default Detail;