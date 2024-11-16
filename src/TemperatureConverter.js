import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import Badge from 'react-bootstrap/Badge';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


// defaultvalue doesn't work because it doesn't automatically run the calculation on initialization

function Toggle({id, label, onToggleClick, defaultvalue=false}) {
  return (
      <Form.Check // prettier-ignore
        type="switch"
        id={id}
        name={id}
        label={label}
        onChange={onToggleClick}
        defaultChecked={defaultvalue}
      />
  );
}


function ToggleAOE({id, label, onToggleClick, defaultvalue=false}) {
  return (
          <Form.Check type="switch" id={'check-'+id}>
            <Form.Check.Input
        id={id}
        name={id}
        onChange={onToggleClick}
        defaultChecked={defaultvalue}
        />
            <Form.Check.Label>{label} <Badge pill bg="primary">AOE</Badge></Form.Check.Label>
          </Form.Check>

  );
}


function Slider({id, label, min, max, value, each, step, defaultValue=0, onToggleClick}) {
  return (
    <>
      <Form.Label>{label} ({value} = {value*each} = {Number((value*each/663).toFixed(1))}%)</Form.Label>
      <Form.Range as={Col} id={id} name={id} onChange={onToggleClick} min={min} max={max} step={step} defaultValue={defaultValue} />
    </>
  );
}


function ToggleTremorscale({id, label, resistvalue, onToggleClick, defaultvalue}) {
  return (
          <Form.Check type="switch" id={'check-'+id}>
            <Form.Check.Input
        id={id}
        name={id}
        onChange={onToggleClick}
        defaultChecked={defaultvalue}
        />
            <Form.Check.Label>Tremorscale ({Number((resistvalue*.08).toFixed(0))} = {Number((resistvalue*.08/663).toFixed(1))}%) <Badge pill bg="primary">AOE</Badge></Form.Check.Label>
          </Form.Check>

  );
}


function SliderTremorscale({id, togglevalue, resistvalue, resists, onToggleClick}) {
  return (
    <>
      <Form.Label>Tank Resistances (Tremorscale = 8% of {resistvalue})</Form.Label>
      <Form.Range id={id} name={id} onChange={onToggleClick} min={0} max={50000} step={1000} defaultValue={33000} />
    </>
  );
}


export default function Gross() {
  const [toggles, setToggles] = useState({light: 1, setpen: 0, piercing: true, forceofnature: 0, resists: 33000 });
  const [armor, setArmor] = useState(calculateArmor(toggles));
  const [resists, setResists] = useState(33000);
  // setArmor(calculateArmor(toggles));

  function handleToggle(i) {
    console.log(i.target.name);
    console.log(i.target.type);
    const nextToggles = toggles;
    if (i.target.type=='range') nextToggles[i.target.name] = i.target.value;
    else nextToggles[i.target.name] = i.target.checked;
    setToggles(nextToggles);
    setArmor(calculateArmor(toggles));
    setResists(toggles['resists'])
  }


  return (
    <>
          <Navbar sticky="top"  bg="dark" data-bs-theme="dark" className="text-center"> 
            <Navbar.Brand className="ps-5">
              <h3>Boss Armor: {armor} ({Number((armor/663).toFixed(1))}% damage reduction)</h3>
            </Navbar.Brand>
          </Navbar>
        <Container>
          <Row className="py-5">
            <Col lg={4} sm={12}>
              <h5>Major Breach (5948 = 9%)</h5>
              <h5>Minor Breach (2974 = 4.5%)</h5>      
              <h5>Weapon Skills</h5>      
                <Toggle id='pierce' label='Pierce Armor (Major+Minor)' onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='elesus' label='Elemental Susceptibility (Major)' onToggleClick={(e) => handleToggle(e)} />
                <ToggleAOE id='wall' label='Frost Wall of Elements (Minor)' onToggleClick={(e) => handleToggle(e)} />
              <h5>World Skills</h5>
                <ToggleAOE id='caltrops' label='Assault Razor Caltrops (Major)' onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='psijic' label='Psijic Crushing Weapon (Major)' onToggleClick={(e) => handleToggle(e)} />
              <h5>Class skills</h5>
                <ToggleAOE id='fissure' label='Warden Deep Fissure (Major+Minor)' onToggleClick={(e) => handleToggle(e)} />
                <ToggleAOE id='boneyard' label='Necromancer Boneyard (Major)' onToggleClick={(e) => handleToggle(e)} />
                <ToggleAOE id='noxious' label='Dragonknight Noxious Breath (Major)' onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='marktarget' label='Nightblade Mark Target (Major)' onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='fatewoven' label='Arcanist Fatewoven Armor (Minor)' onToggleClick={(e) => handleToggle(e)} />
            </Col>
            <Col lg={4} sm={12}>        
              <h5>Common Support Skills</h5>
                <Toggle id='2hicrusher'label='2H Infused Crusher Enchant (2108 = 3%)' onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='2hcrusher'label='2H Crusher Enchant (1622 = 2.4%)' onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='1hicrusher'label='1H Infused Crusher Enchant (1054 = 1.6%)' onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='1hcrusher'label='1H Crusher Enchant (811 = 1.2%)' onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='crystal' label='Sorcerer Crystal Weapon (1000 = 1.5%)' onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='runic' label='Arcanist Runic Sunder (2200 = 3.3%)' onToggleClick={(e) => handleToggle(e)} />
              <h5>Common Support Sets</h5>
                <ToggleAOE id='crimson' label='Crimson Oath (3541 = 5.3%)' onToggleClick={(e) => handleToggle(e)} />
                <ToggleAOE id='alkosh' label='Alkosh (6000 = 9%)' onToggleClick={(e) => handleToggle(e)} />

                <ToggleTremorscale id='tremorscale' resistvalue={toggles['resists']} resists={resists} onToggleClick={(e) => handleToggle(e)} />
                <SliderTremorscale id='resists' togglevalue={toggles['tremorscale']} resistvalue={toggles['resists']} resists={resists} onToggleClick={(e) => handleToggle(e)} />
            </Col>
            <Col lg={4} sm={12}>        
              <h5>Gear Options</h5>
                <Toggle id='1hsharp' label='Sharpened 1H Weapon (1638 = 2.5%)' onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='2hsharp' label='Sharpened 2H Weapon (3276 = 5%)' onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='mace' label='Mace (1650 = 2.5%)' onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='maul' label='Maul or 2x Maces (3300 = 5%)' onToggleClick={(e) => handleToggle(e)} />
                <Slider id='light' label="Light Armor (939/piece)" value={toggles['light']} each={939} min={0} max={7} step={1} defaultValue={1} onToggleClick={(e) => handleToggle(e)} />
                <Slider id='setpen' label="Set Pen Bonus (1487/bonus)" value={toggles['setpen']} each={1487} min={0} max={7} step={1} onToggleClick={(e) => handleToggle(e)} />

              <h5>Character Options</h5>
                <Toggle id='piercing' label='Piercing CP (700 = 1%)' defaultvalue={true} onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='necro' label='Necro Grave Lord (1500 = 2.2%)' onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='nb' label='Nightblade Flanking (2974 = 4.5%)' onToggleClick={(e) => handleToggle(e)} />
                <Slider id='splintered' label='Arcanist Passive (991/slotted skill)' value={toggles['splintered']} each={991} min={0} max={6} step={1} onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='woodelf' label='Wood Elf Passive (950 = 1.4%)' onToggleClick={(e) => handleToggle(e)} />
                <Slider id='forceofnature' label='Force of Nature CP (660/status effect)' value={toggles['forceofnature']} each={660} min={0} max={8} step={1} onToggleClick={(e) => handleToggle(e)} />
            </Col>


          </Row>
        </Container>
    </>
  );
}

function calculateArmor(toggles) {
  let armor=18200
  // major breach
  if (toggles['pierce']||toggles['elesus']||toggles['caltrops']||toggles['psijic']||toggles['fissure']||toggles['boneyard']||toggles['noxious']||toggles['marktarget']) armor=armor-5948;
  // minor breach
  if (toggles['pierce']||toggles['fissure']||toggles['fatewoven']||toggles['wall']) armor=armor-2974;

  if (toggles['crimson']) armor=armor-3451;
  if (toggles['alkosh']) armor=armor-6000;
  if (toggles['2hicrusher']) armor=armor-2108;
  if (toggles['2hcrusher']) armor=armor-1622;
  if (toggles['1hicrusher']) armor=armor-1054;
  if (toggles['1hcrusher']) armor=armor-811;
  if (toggles['crystal']) armor=armor-1000;
  if (toggles['runic']) armor=armor-2200;

  if (toggles['tremorscale']) armor=armor-Number((toggles['resists']*.08).toFixed(0));
  if (toggles['resists']) armor=armor-10+10;

  if (toggles['1hsharp']) armor=armor-1638;
  if (toggles['2hsharp']) armor=armor-3276;
  if (toggles['mace']) armor=armor-1650;
  if (toggles['2ndmace']) armor=armor-1650;
  if (toggles['maul']) armor=armor-3300;
  if (toggles['piercing']) armor=armor-700;
  if (toggles['necro']) armor=armor-1500;
  if (toggles['nb']) armor=armor-2974;
  if (toggles['woodelf']) armor=armor-950;
  if (toggles['light']) armor=armor-(939*toggles['light']);
  if (toggles['setpen']) armor=armor-(1487*toggles['setpen']);
  if (toggles['forceofnature']) armor=armor-(660*toggles['forceofnature']);
  if (toggles['splintered']) armor=armor-(991*toggles['splintered']);

  if (toggles['tankresists']) armor=armor;


  if (armor < 0) armor=0;
  console.log(toggles);
  console.log("total is "+armor);
  return armor;
}

