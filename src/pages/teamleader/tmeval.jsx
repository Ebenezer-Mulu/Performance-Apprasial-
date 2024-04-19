import React from 'react';
import EvaluateAll from '../../features/Users/EvaluateAll';
import Row from "../../ui/Row";




function RatingScale() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ marginRight: '10px', fontSize: '18px', color: 'Red' }}>RATING SCALES</div>

      <React.Fragment>
        <br />
        <div style={{ background: 'linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)', width: '50%', height: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div style={{ color: 'black', fontSize: '15px' }}>Very bad(1)</div>
            <div style={{ color: 'black', fontSize: '15px' }}>bad(2)</div>
            <div style={{ color: 'black', fontSize: '15px' }}>neutral(3)</div>
            <div style={{ color: 'white', fontSize: '15px' }}>good(4)</div>
            <div style={{ color: 'white', fontSize: '15px' }}>Very good(5)</div>
          </div>
        </div>
      </React.Fragment>
    </div>
  );
}

const Tmeval = () => {
  return (
    <>
      
      <RatingScale /> 

      <EvaluateAll />
    </>
  );
};

export default Tmeval;
