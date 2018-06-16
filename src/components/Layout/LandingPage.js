import React from 'react';

const LandingPage = ({history}) => {
  return <div>
      <div className="ui inverted vertical masthead center aligned segment">
        <div className="ui text container">
          <h1>Would You Rather?</h1>
          <h1 className="ui inverted stackable header">
            <img className="ui image massive" src="https://images.pexels.com/photos/356079/pexels-photo-356079.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="logo" />
          </h1>
          <div className="ui huge white inverted button" id="homeButton"
          onClick={() => history.push('/login')}
          >
            Play Now
            <i className="right arrow icon" />
          </div>
        </div>
      </div>
    </div>;
}

export default LandingPage
