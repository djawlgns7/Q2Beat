import React from 'react';
import GoogleLoginComponent from './components/GoogleLogin';
import NaverLoginComponent from './components/NaverLogin';
import KakaoLoginComponent from './components/KakaoLogin';
import './App.css';

function App() {
    return (
        <div className="App">
            <h1>Login</h1>
            <GoogleLoginComponent />
            <NaverLoginComponent />
            <KakaoLoginComponent />
        </div>
    );
}

export default App;
