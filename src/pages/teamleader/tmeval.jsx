import React from 'react';
import EvaluateAll from '../../features/Users/EvaluateAll';
import Row from "../../ui/Row";




function RatingScale() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2 style={{ color: 'red', marginBottom: '10px' }}>RATING SCALES</h2>

      <div style={{ width: '80%', position: 'relative', marginBottom: '10px' }}>
        <div style={{ background: 'linear-gradient(to right, red, orange, yellow, green, indigo, violet)', width: '100%', height: '20px', borderRadius: '10px', marginBottom: '5px', position: 'relative' }}>
          <span style={{ position: 'absolute', left: '4%', top: '30%', transform: 'translate(-50%, -50%)', fontSize: '1px' }}>Very Bad</span>
          <span style={{ position: 'absolute', left: '25%', top: '30%', transform: 'translate(-50%, -50%)', fontSize: '14px' }}>Bad</span>
          <span style={{ position: 'absolute', left: '50%', top: '30%', transform: 'translate(-50%, -50%)', fontSize: '14px', color: 'red' }}>Neutral</span>
          <span style={{ position: 'absolute', left: '75%', top: '30%', transform: 'translate(-50%, -50%)', fontSize: '14px' }}>Good</span>
          <span style={{ position: 'absolute', left: '93%', top: '30%', transform: 'translate(-50%, -50%)', fontSize: '14px' }}>Very Good</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
          <span style={{ width: '20px', textAlign: 'center' }}>1</span>
          <span style={{ width: '20px', textAlign: 'center' }}>2</span>
          <span style={{ width: '20px', textAlign: 'center' }}>3</span>
          <span style={{ width: '20px', textAlign: 'center' }}>4</span>
          <span style={{ width: '20px', textAlign: 'center' }}>5</span>
        </div>
      </div>
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
