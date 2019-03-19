import React, { Component } from 'react';
import Routes from '../Routes';

//Components
import Navbar from './layout/Navbar';

class App extends Component {
    render() {
        return (
            <div className="container">  
                <Navbar/>
                <main>  
                    <Routes/>
                </main>  
            </div>
        );
    }
}

export default App;

