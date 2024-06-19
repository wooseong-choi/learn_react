import React, {Component, useState, useReducer } from 'react';
import { Link, useParams } from 'react-router-dom';
import './App.css';

function Update(){
    return (
        <>
        <div className='buttonBox'>
            <button><Link to={'/list'}>목록</Link></button>
            <button><Link to={'/update'}>수정</Link></button>
        </div>
        <div>

        </div>
        </>
    );
}

export default Update;