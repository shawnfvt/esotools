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
      <Form.Label>{label} ({value} = {value*each} = {Number((value*each/219).toFixed(1))}%)</Form.Label>
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
  const [toggles, setToggles] = useState({light: 1, setcritchance: 0, precision: true, thiefmundus: true, nbassassin: 0, resists: 33000 });
  const [critchance, setCritChance] = useState(calculateCritChance(toggles));
  const [resists, setResists] = useState(33000);

  function handleToggle(i) {
    console.log(i.target.name);
    console.log(i.target.type);
    const nextToggles = toggles;
    if (i.target.type=='range') nextToggles[i.target.name] = i.target.value;
    else nextToggles[i.target.name] = i.target.checked;
    setToggles(nextToggles);
    setCritChance(calculateCritChance(toggles));
    // setResists(toggles['resists'])
  }


  return (
    <>
          <Navbar sticky="top"  bg="dark" data-bs-theme="dark" className="text-center"> 
            <Navbar.Brand className="ps-5">
              <h3>Crit Chance: {Number((critchance/219).toFixed(1))}% / 100%</h3>
            </Navbar.Brand>
          </Navbar>
        <Container>
          <Row className="py-5">
            <Col lg={6} sm={12}>
              <h5>Minor Prophecy / Savagery <Badge pill bg="primary">Group</Badge> (1314 = 6%)</h5>
                <ToggleAOE id='hemorrhage' label='Nightblade Hemorrhage' onToggleClick={(e) => handleToggle(e)} />
                <ToggleAOE id='exploitation' label='Sorcerer Exploitation' onToggleClick={(e) => handleToggle(e)} />
              <h5>Major Prophecy / Savagery (2629 = 12%)</h5>
                <Toggle id='weaponcritpotion' label='Weapon Critical Potion' onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='spellcritpotion' label='Spell Critical Potion' onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='camohunter' label='Fighters Camo Hunter' onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='magelight' label='Mages Magelight' onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='shadowcloak' label='Nightblade Shadow Cloak (Either Bar)' onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='inferno' label='DK Inferno (Either Bar)' onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='lotusflower' label='Warden Lotus Flower (Active)' onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='sunfire' label='Templar Sun Fire (Active)' onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='oakensoul' label='Oakensoul' onToggleClick={(e) => handleToggle(e)} />
              <h5>Character Options</h5>
                <Toggle id='precision' label='Precision CP (320 = 1.46%)' defaultvalue={true} onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='thiefmundus' label='Thief Mundus 7 Divines (2182 = 10%)' defaultvalue={true} onToggleClick={(e) => handleToggle(e)} />
                <Slider id='nbassassin' label='Nightblade Assassin Skill (438/slotted skill = 2%)' value={toggles['nbassassin']} each={438} min={0} max={6} step={1} onToggleClick={(e) => handleToggle(e)} />
            </Col>
            <Col lg={6} sm={12}>        
              <h5>Sets</h5>
                <Toggle id='orderswrath'label='Orders Wrath (1752 = 8%)' onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='slimecraw'label='Slimecraw (771 = 3.5%)' onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='kilt'label='Kilt Max Stacks (1100 = 5%)' onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='whispers'label='Moras Whispers Max (1528 = 7%)' onToggleClick={(e) => handleToggle(e)} />
                <Slider id='setcritchance' label="Standard Set Crit Chance (657/line)" value={toggles['setcritchance']} each={657} min={0} max={7} step={1} onToggleClick={(e) => handleToggle(e)} />
              <h5>Gear Options</h5>
                <Toggle id='2hprecise'label='2H Precise Trait (1576 = 7.2%)' onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='1hprecise'label='1H Precise Trait (788 = 3.6%)' onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='dagger'label='Dagger Passive (657 = 3%)' onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='seconddagger'label='Second Dagger Passive (657 = 3%)' onToggleClick={(e) => handleToggle(e)} />
                <Slider id='light' label="Light Armor (219/piece)" value={toggles['light']} each={219} min={0} max={7} step={1} defaultValue={1} onToggleClick={(e) => handleToggle(e)} />

            </Col>

          </Row>
        </Container>
    </>
  );
}

function calculateCritChance(toggles) {
  let critchance=2190
  // major savagery/prophesy
  if (toggles['camohunter']||toggles['magelight']||toggles['weaponcritpotion']||toggles['spellcritpotion']||toggles['shadowcloak']||toggles['inferno']||toggles['lotusflower']||toggles['sunfire']||toggles['oakensoul']) critchance=critchance+2629;
  // minor savagery/prophesy
  if (toggles['exploitation']||toggles['hemorrhage']) critchance=critchance+1314;

  if (toggles['2hprecise']) critchance=critchance+1533;
  if (toggles['1hprecise']) critchance=critchance+766;
  if (toggles['dagger']) critchance=critchance+657;
  if (toggles['seconddagger']) critchance=critchance+657;
  if (toggles['orderswrath']) critchance=critchance+1752;
  if (toggles['slimecraw']) critchance=critchance+771;
  if (toggles['kilt']) critchance=critchance+1100;
  if (toggles['whispers']) critchance=critchance+1528;
  if (toggles['thiefmundus']) critchance=critchance+2182;
  // if (toggles['']) critchance=critchance+;
  // if (toggles['']) critchance=critchance+;
  // if (toggles['']) critchance=critchance+;
  // if (toggles['']) critchance=critchance+;
  // if (toggles['']) critchance=critchance+;


  if (toggles['light']) critchance=critchance+(219*toggles['light']);
  if (toggles['setcritchance']) critchance=critchance+(657*toggles['setcritchance']);
  if (toggles['nbassassin']) critchance=critchance+(438*toggles['nbassassin']);


  // if (toggles['tankresists']) armor=armor;


  // if (armor < 0) armor=0;
  console.log(toggles);
  // console.log("total is "+armor);
  return critchance;
}

