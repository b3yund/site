// src/App.js
import React, { useRef } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import Home from './pages/Home';
import About from './pages/About';
import BackgroundVideo from './components/BackgroundVideo';
import './styles/App.css';
import './styles/Transitions.css';

const App = () => {
  const location = useLocation();
  const nodeRef = useRef(null); // Create a ref for the transitioning element

  return (
    <AuthProvider>
      <div className="app-container">
        <BackgroundVideo />
        <SwitchTransition mode="out-in">
          <CSSTransition
            key={location.pathname}
            classNames="fade"
            timeout={{ enter: 1500, exit: 500 }}
            unmountOnExit
            appear
            nodeRef={nodeRef} // Use nodeRef to avoid findDOMNode
          >
            <div className="page-content" ref={nodeRef}>
              <AuthContext.Consumer>
                {({ isAuthenticated }) => (
                  <Routes location={location}>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                  </Routes>
                )}
              </AuthContext.Consumer>
            </div>
          </CSSTransition>
        </SwitchTransition>
      </div>
    </AuthProvider>
  );
};

export default App;
