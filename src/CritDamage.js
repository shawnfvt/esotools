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
        id={'check-'+id}
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
      <Form.Label>{label} ({value} = {Number((value*each).toFixed(1))}%)</Form.Label>
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
  const searchParams = new URLSearchParams(document.location.search)
  const pretoggles={medium: 5, morascribe: 0, wardenpet: 0, resists: 33000, overcap: ""}
  for (const [key, value] of searchParams.entries()) {
    pretoggles[key]=true;
  }

  // const [toggles, setToggles] = useState({medium: 5, morascribe: 0, wardenpet: 0, resists: 33000, overcap: "" });
  const [toggles, setToggles] = useState(pretoggles);
  const [critdam, setCritDam] = useState(calculateCritDam(toggles));
  const [resists, setResists] = useState(33000);



  function handleToggle(i) {
    console.log(i.target.name);
    console.log(i.target.type);
    const nextToggles = toggles;
    if (i.target.type=='range') nextToggles[i.target.name] = i.target.value;
    else nextToggles[i.target.name] = i.target.checked;
    setToggles(nextToggles);
    setCritDam(calculateCritDam(toggles));
    // setResists(toggles['resists'])
  }


  return (
    <>
          <Navbar sticky="top"  bg="dark" data-bs-theme="dark" className="text-center"> 
            <Navbar.Brand className="ps-5">
              <h3>Crit Damage: <span className={toggles['overcap']}>{Number((critdam).toFixed(1))}%</span> / 125%</h3>
            </Navbar.Brand>
          </Navbar>
        <Container>
          <Row className="py-5">
            <Col lg={4} sm={12}>
              <h5>Major Force <Badge pill bg="primary">Group</Badge> (20%)</h5>
                <Toggle id='warhorn' defaultvalue={toggles['warhorn']} label='Aggressive Warhorn' onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='sax' defaultvalue={toggles['sax']} label='Saxhleel Champion' onToggleClick={(e) => handleToggle(e)} />
              <h5>Minor Brittle <Badge pill bg="primary">Group</Badge> (10%)</h5>
                <Toggle id='chilled' defaultvalue={toggles['chilled']} label='Chilled + Ice Staff' onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='colorless' defaultvalue={toggles['colorless']} label='Arcanist Colorless Pool' onToggleClick={(e) => handleToggle(e)} />
              <h5>Support Sets <Badge pill bg="primary">Group</Badge> </h5>
                <Toggle id='catalyst' defaultvalue={toggles['catalyst']} label='Elemental Catalyst, Max (15%)' onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='lucent' defaultvalue={toggles['lucent']} label='Lucent Echoes (11%)' onToggleClick={(e) => handleToggle(e)} />
            </Col>
            <Col lg={4} sm={12}>
              <h5>Minor Force (10%)</h5>
                <Toggle id='velothi' label='Velothi Amulet' onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='barbedtrap' label='Fighters Barbed Trap (Active)' onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='accelerate' label='Psijic Accelerate (Active)' onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='oakensoul' label='Oakensoul' onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='medusa' label='Medusa' onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='tzogvin' label='Tzogvin, Max Stacks' onToggleClick={(e) => handleToggle(e)} />
              <h5>Sets</h5>
                <Toggle id='orderswrath'label='Orders Wrath (8%)' onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='archers'label='Archers Mind Not Sneaking(8%)' onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='archersneak'label='Archers Mind Sneaking (24%)' onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='gourmand'label='Back-Alley Gourmand (13%)' onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='kilt'label='Kilt Max Stacks (10%)' onToggleClick={(e) => handleToggle(e)} />               
                <Toggle id='sulxan'label='Sul-Xan Proc (12%)' onToggleClick={(e) => handleToggle(e)} />               
                <Slider id='morascribe' label="Mora Scribe (1% / minor buff)" value={toggles['morascribe']} each={1} min={0} max={12} step={1} onToggleClick={(e) => handleToggle(e)} />
            </Col>
            <Col lg={4} sm={12}>        
              <h5>Gear Options</h5>
                <Toggle id='axe'label='1H Axe Passive (6%)' onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='axes'label='2H Axe or Dual Axes Passive (12%)' onToggleClick={(e) => handleToggle(e)} />
                <Slider id='medium' label="Medium Armor (2%/piece)" value={toggles['medium']} each={2} min={0} max={7} step={1} defaultValue={5} onToggleClick={(e) => handleToggle(e)} />
              <h5>Character Options</h5>
                <Toggle id='finesse' label='Finesse CP (8%)' onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='backstabber' label='Backstabber CP (10%)' onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='shadowmundus' label='Shadow Mundus 7 Divines (18%)' onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='hemorrhage' label='Nightblade Passive (10%)' onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='templar' label='Templar Passive (12%)' onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='arcanist' label='Arcanist Passive (12%)' onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='khajiit' label='Khajiit Passive (12%)' onToggleClick={(e) => handleToggle(e)} />
                <Slider id='wardenpet' label='Warden Animal Skill (4%/slotted skill)' value={toggles['wardenpet']} each={4} min={0} max={6} step={1} onToggleClick={(e) => handleToggle(e)} />


            </Col>

          </Row>
        </Container>
    </>
  );
}

function calculateCritDam(toggles) {
  let critdam=50
  // minor force
  if (toggles['velothi']||toggles['barbedtrap']||toggles['accelerate']||toggles['oakensoul']||toggles['medusa']||toggles['tzogvin']) critdam=critdam+10;
  // major force
  if (toggles['warhorn']||toggles['sax']) critdam=critdam+20;
  // minor brittle
  if (toggles['chilled']||toggles['colorless']) critdam=critdam+10;


  if (toggles['catalyst']) critdam=critdam+15;
  if (toggles['lucent']) critdam=critdam+11;

  if (toggles['orderswrath']) critdam=critdam+8;
  if (toggles['archers']) critdam=critdam+8;
  if (toggles['archersneak']) critdam=critdam+24;
  if (toggles['gourmand']) critdam=critdam+13;
  if (toggles['kilt']) critdam=critdam+10;
  if (toggles['axe']) critdam=critdam+6;
  if (toggles['axes']) critdam=critdam+12;
  if (toggles['medium']) critdam=critdam+(2*toggles['medium']);
  if (toggles['morascribe']) critdam=critdam+(1*toggles['morascribe']);
  if (toggles['wardenpet']) critdam=critdam+(4*toggles['wardenpet']);
  if (toggles['shadowmundus']) critdam=critdam+18;
  if (toggles['hemorrhage']) critdam=critdam+10;
  if (toggles['finesse']) critdam=critdam+8;
  if (toggles['backstabber']) critdam=critdam+10;
  if (toggles['templar']) critdam=critdam+12;
  if (toggles['arcanist']) critdam=critdam+12;
  if (toggles['sulxan']) critdam=critdam+12;
  if (toggles['khajiit']) critdam=critdam+12;





  // if (toggles['tankresists']) armor=armor;


  // if (critdam > 125) critdam=125;
  if (critdam > 125) toggles['overcap']="text-danger";
  else toggles['overcap']="";
  console.log(toggles);
  // console.log("total is "+armor);
  return critdam;
}

