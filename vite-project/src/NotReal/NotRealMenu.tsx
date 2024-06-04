import React, { useContext } from 'react';
import { CanvasContext } from './NotRealCanvas';

const NotRealMenu: React.FC = () => {
  const { setSelectedComponent } = useContext(CanvasContext);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedComponent(event.target.value);
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: '180px',
        right: '150px',
        zIndex: 1,
        background: 'rgba(100, 100, 100, 0.8)',
        padding: '10px',
        fontSize: '1.2em',
        fontWeight: '100',
        borderRadius: '5px',
      }}
    >
      <h3>Select a Component:</h3>
      <select onChange={handleSelectChange} defaultValue="ShaderEngineFBO">
        <option value="x">Default Component</option>
        <option value="ThreeFiberBasics">ThreeFiberBasics</option>
        <option value="ThreeFiberDreiLeva">ThreeFiberDreiLeva</option>
        <option value="ShaderEngineFBO">ShaderEngineFBO</option>
        <option value="DynamicTorus">DynamicTorus</option>
        <option value="ShaderLab">ShaderLab</option>
        <option value="ParticleSimulator">ParticleSimulator</option>
        <option value="FBOParticlesChaotic">FBOParticlesChaotic</option>
        <option value="FBOParticlesGeometric">FBOParticlesGeometric</option>
      </select>
    </div>
  );
}

export default NotRealMenu;