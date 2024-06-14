import React, { useContext, useState } from 'react';
import { CanvasContext } from './NotRealCanvas';
import { TbAppsOff, TbApps } from "react-icons/tb";

const NotRealMenu: React.FC = () => {
  const { setSelectedComponent } = useContext(CanvasContext);
  const [isVisible, setIsVisible] = useState(false);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedComponent(event.target.value);
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
      {isVisible ? (
        <div
          style={{
            position: 'absolute',
            top: '180px',
            right: '150px',
            zIndex: 1,
            background: 'rgba(100, 100, 100, 1.0)',
            padding: '10px',
            fontSize: '1.2em',
            fontWeight: '100',
            borderRadius: '5px',
          }}
        >
          <button
            onClick={toggleVisibility}
            style={{
              background: 'rgba(255, 255, 255, 0.8)',
              padding: '5px 10px',
              borderRadius: '5px',
              cursor: 'pointer',
              marginBottom: '10px',
              display: 'block',
              marginLeft: 'auto',
              border: 'none', 
              backgroundColor: 'white',
              opacity: '0.9',
            }}
          >
            <TbAppsOff />
          </button>
          <h3>Select a Component:</h3>
          
          <select onChange={handleSelectChange} defaultValue="ShaderLab">
            <option value="x">Default Component</option>
            <option value="ThreeFiberBasics">ThreeFiberBasics</option>
            <option value="ThreeFiberDreiLeva">ThreeFiberDreiLeva</option>
            <option value="ShaderEngineFBO">ShaderEngineFBO</option>
            <option value="DynamicTorus">DynamicTorus</option>
            <option value="Generative2D">Generative2D</option>
            <option value="RayMarchingExample">RayMarchingExample</option>
            <option value="ShaderLab">ShaderLab</option>
            <option value="ParticleSimulator">ParticleSimulator</option>
            <option value="FBOParticlesChaotic">FBOParticlesChaotic</option>
            <option value="FBOParticlesGeometric">FBOParticlesGeometric</option>
          </select>
        </div>
      ) : (
        <button
          onClick={toggleVisibility}
          style={{
            position: 'absolute',
            top: '180px',
            right: '150px',
            zIndex: 2,
            background: 'rgba(255, 255, 255, 0.8)',
            padding: '5px 10px',
            borderRadius: '5px',
            borderColor: 'red',
            cursor: 'pointer',
            opacity: '0.9',
            backgroundColor: 'red',
            // border: 'none', // Remove default button border
            // backgroundColor: 'transparent', // Make background transparent
          }}
        >
          <TbApps />
        </button>
      )}
    </div>
  );
};

export default NotRealMenu;
