import React, { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import Badge from 'react-bootstrap/Badge';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


// defaultvalue doesn't work because it doesn't automatically run the calculation on initialization

function Toggle({id, label, onToggleClick, defaultvalue=false, lessCommon=false}) {
  return (
      <Form.Check // prettier-ignore
        type="switch"
        id={id}
        name={id}
        label={label}
        onChange={onToggleClick}
        className={lessCommon ? 'visually-hidden' : 'undefined'}
        defaultChecked={defaultvalue}
      />
  );
}


function ToggleAOE({id, label, onToggleClick, defaultvalue=false, lessCommon=false}) {
  return (
          <Form.Check type="switch" id={'check-'+id} className={lessCommon ? 'visually-hidden' : 'undefined'}>
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


function Slider({id, label, min, max, value, each, factor, step, defaultValue=0, onToggleClick, lessCommon=false}) {
  return (
    <>
      <Form.Label className={lessCommon ? 'visually-hidden' : 'undefined'}>{label} ({value} = {value*each} = {Number((value*each/factor).toFixed(1))}%)</Form.Label>
      <Form.Range className={lessCommon ? 'visually-hidden' : 'undefined'} as={Col} id={id} name={id} onChange={onToggleClick} min={min} max={max} step={step} defaultValue={defaultValue} />
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


function SliderArmorWeight({id, value, each, onToggleClick}) {
  return (
    <>
      <Form.Range className="w-75 text-start" id={id} name={id} onChange={onToggleClick} min={0} max={7} step={1} defaultValue={2} />
      <Form.Label className="">Medium Armor: {7-value} pieces. 2% Crit Damage/piece = {Number(((7-value)*2).toFixed(1))}% <small>(Also {Number(((7-value)*2).toFixed(1))}% Weapon/Spell damage!)</small></Form.Label>
      <Form.Label className="">Light Armor: {value} pieces. 939 Penetration/piece = {value*939} = {Number((939*value/663).toFixed(1))}% and 219 Crit Chance/piece = {value*219} = {value}%</Form.Label>
    </>
  );
}


function SliderArmorWeightX({id, value, each, onToggleClick}) {
  return (
    <>
      <InputGroup className="">
        <Form.Label className="col text-end pe-3">Medium Armor: {7-value} pieces<br />
              2% Crit Damage/piece = {Number(((7-value)*2).toFixed(1))}%<br />
              <small>(Also {Number(((7-value)*2).toFixed(1))}% Weapon/Spell damage!)</small>
        </Form.Label>
        <Form.Range className="col-3 w-25" id={id} name={id} onChange={onToggleClick} min={0} max={7} step={1} defaultValue={2} />
        <Form.Label className="col text-start ps-3">Light Armor: {value} pieces<br />
              939 Penetration/piece = {value*939} = {Number((939*value/663).toFixed(1))}%<br />
              219 Crit Chance/piece = {value*219} = {value}%
        </Form.Label>
      </InputGroup>
    </>
  );
}


export default function Gross() {
  const searchParams = new URLSearchParams(document.location.search)
  const pretoggles=
    {  

// group stuff

       light: 1, 
       medium: 5, 

       setpen: 0, 

       piercing: true, 
       precision: true, 

       forceofnature: 0, 
       splintered: 0, 
       resists: 33000,
       setcritchance: 0, 

       thiefmundus: true, 

       slimecraw: true, 
       morascribe: 0, 

       nbassassin: 0,
       wardenpet: 0, 
       overcap: ""

     };
  for (const [key, value] of searchParams.entries()) {
    pretoggles[key]=true;
  }
  const [toggles, setToggles] = useState(pretoggles);
  const [lessCommon, setLessCommon] = useState(true);
  const [critdam, setCritDam] = useState(calculateCritDam(toggles));
  const [critchance, setCritChance] = useState(calculateCritChance(toggles));
  // const [armor, setArmor] = useState(calculateArmor(toggles));
  const [pen, setPen] = useState(calculatePen(toggles));
  const [resists, setResists] = useState(33000);

  const toggleContent = () => {
    setLessCommon(!lessCommon);
  };

  function handleToggle(i) {
    console.log(i.target.name);
    console.log(i.target.type);
    const nextToggles = toggles;
    if (i.target.type=='range') nextToggles[i.target.name] = i.target.value;
    else if (i.target.id=='hideUncommon') {
         nextToggles[i.target.name] = i.target.checked;
         Document.getElementById('pierce').className=i.target.checked?'visually-hidden':'undefined';
         }
    else nextToggles[i.target.name] = i.target.checked;
    setToggles(nextToggles);
    setPen(calculatePen(toggles));
    setResists(toggles['resists'])
    setCritDam(calculateCritDam(toggles));
    setCritChance(calculateCritChance(toggles));
  }


  return (
    <>
        <Navbar sticky="top" bg="dark" data-bs-theme="dark" className="text-center ps-5"> 
          <Navbar.Brand className="text-start">
            <img
              alt=""
              src="esotools/dtc-bot.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}Dragon Trading Company PS/NA
          </Navbar.Brand>
        </Navbar>
        <Container fluid>
          <Row className="pt-2 pb-5">
            <Col lg={12} sm={12} className="ps-5">
              <h2 className="text-start p-3">How to use this page</h2>
              There are two sections to this page. <br />
              First, choose which sets and skills are being run by your support roles. The foundation of any good trial starts with 4 or 5 players buffing the team and debuffing the enemies. <br />
              Second, adjust your personal sets and skills so that your character is filling in the gaps. You want 100% penetration, 125% crit damage, and as much crit chance as you can manage.<br />
              Some sets or skills aren't used often, to see those click this toggle: <Button className="btn btn-sm" onClick={toggleContent}>Hide/Show Uncommon Sources</Button><br />
              <br />
              There are running totals at the bottom of the page showing the result of your current choices.<br />
              <span class="text-danger">This code isn't that smart. For example, you can equip 3 mythics, a bow, and daggers at the same time. Sorry!</span>

            </Col>
          </Row>

          <Row className="ps-5">
            <Col lg={12} sm={12}>
              <h2 className="text-start p-3 border-top">Buffs &amp; Debuffs provided by Tanks, Healers, and Supports
              </h2>
            </Col>
          </Row>
          <Row className="ps-5">
            <Col lg={4} sm={12}>
              <h4><u>Group buffs to Penetration</u></h4>
            </Col>
            <Col lg={4} sm={12}>
              <h4><u>Group buffs to Crit Chance</u></h4>
            </Col>
            <Col lg={4} sm={12}>
              <h4><u>Group buffs to Crit Damage</u></h4>
            </Col>
          </Row>
          <Row className="ps-5">
            <Col lg={4} sm={12}>
              <h5>Major Breach (5948 = 9%)</h5>
              <h5>Minor Breach (2974 = 4.5%)</h5>      
                <Toggle id='pierce' defaultvalue={toggles['pierce']} label='Pierce Armor (Major+Minor)' onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='elesus' defaultvalue={toggles['elesus']} label='Elemental Susceptibility (Major)' onToggleClick={(e) => handleToggle(e)} />
                <ToggleAOE id='wall' label='Frost Wall of Elements (Minor)' onToggleClick={(e) => handleToggle(e)} />
                <ToggleAOE id='caltrops' label='Assault Razor Caltrops (Major)' onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='psijic' label='Psijic Crushing Weapon (Major)' lessCommon={lessCommon} onToggleClick={(e) => handleToggle(e)} />
                <ToggleAOE id='fissure' label='Warden Deep Fissure (Major+Minor)' onToggleClick={(e) => handleToggle(e)} />
                <ToggleAOE id='boneyard' label='Necromancer Boneyard (Major)' lessCommon={lessCommon} onToggleClick={(e) => handleToggle(e)} />
                <ToggleAOE id='noxious' label='Dragonknight Noxious Breath (Major)' lessCommon={lessCommon} onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='marktarget' label='Nightblade Mark Target (Major)' lessCommon={lessCommon} onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='fatewoven' defaultvalue={toggles['fatewoven']} label='Arcanist Fatewoven Armor (Minor)' onToggleClick={(e) => handleToggle(e)} />
              <h5>Support Sets &amp; Skills</h5>
                <ToggleAOE id='crimson' defaultvalue={toggles['crimson']} label='Crimson Oath (3541 = 5.3%)' onToggleClick={(e) => handleToggle(e)} />
                <ToggleAOE id='alkosh' defaultvalue={toggles['alkosh']} label='Alkosh (6000 = 9%)' onToggleClick={(e) => handleToggle(e)} />
                <ToggleTremorscale id='tremorscale' resistvalue={toggles['resists']} resists={resists} onToggleClick={(e) => handleToggle(e)} />
                <SliderTremorscale id='resists' togglevalue={toggles['tremorscale']} resistvalue={toggles['resists']} resists={resists} onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='2hicrusher' defaultvalue={toggles['2hicrusher']} label='2H Infused Crusher Enchant (2108 = 3%)' onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='2hcrusher'label='2H Crusher Enchant (1622 = 2.4%)' lessCommon={lessCommon} onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='1hicrusher'label='1H Infused Crusher Enchant (1054 = 1.6%)' lessCommon={lessCommon} onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='1hcrusher'label='1H Crusher Enchant (811 = 1.2%)' lessCommon={lessCommon} onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='crystal' label='Sorcerer Crystal Weapon (1000 = 1.5%)' lessCommon={lessCommon} onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='runic' label='Arcanist Runic Sunder (2200 = 3.3%)' lessCommon={lessCommon} onToggleClick={(e) => handleToggle(e)} />
            </Col>
            <Col lg={4} sm={12}>
              <h5>Minor Prophecy / Savagery (6%)</h5>
                <Toggle id='hemorrhage' defaultvalue={toggles['hemorrhage']} label='Nightblade in group using an Assassination skill - Hemorrhage' onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='exploitation' defaultvalue={toggles['exploitation']} label='Sorcerer in group using a Dark Magic skill - Exploitation' onToggleClick={(e) => handleToggle(e)} />
            </Col>
            <Col lg={4} sm={12}>
              <h5>Major Force (20%)</h5>
                <Toggle id='warhorn' defaultvalue={toggles['warhorn']} label='Aggressive Warhorn' onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='sax' defaultvalue={toggles['sax']} label='Saxhleel Champion' onToggleClick={(e) => handleToggle(e)} />
              <h5>Minor Brittle (10%)</h5>
                <Toggle id='chilled' defaultvalue={toggles['chilled']} label='Chilled + Ice Staff' onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='colorless' defaultvalue={toggles['colorless']} label='Arcanist Colorless Pool' onToggleClick={(e) => handleToggle(e)} />
              <h5>Support Sets </h5>
                <Toggle id='catalyst' defaultvalue={toggles['catalyst']} label='Elemental Catalyst, Max (15%)' onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='lucent' defaultvalue={toggles['lucent']} label='Lucent Echoes (11%)' onToggleClick={(e) => handleToggle(e)} />
            </Col>
          </Row>
          <Row className="pt-5">
            <Col lg={12} sm={12}>
              <h2 className="text-start p-3 border-top">Buffs and Debuffs provided by your Character</h2>
            </Col>
          </Row>
          <Row className="ps-2 pb-3">
            <Col lg={4} className="text-end">
              Use this slider to adjust between medium and light:<br />
              <br />
              Most DPS don't wear much heavy armor.
            </Col>
            <Col lg={8} className="text-start">
              <SliderArmorWeight id='light' value={toggles['light']} onToggleClick={(e) => handleToggle(e)} />
            </Col>
          </Row>
          <Row className="ps-2 pb-3">
            <Col lg={4} className="text-end">        
              Some sets have bonuses in multiple areas.<br />
              If you're wearing one of these, choose it here:
            </Col>
            <Col lg={8} className="text-start">        
                <Toggle id='velothi' label='Velothi Amulet (1650 Pen + Minor Force)' onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='oakensoul' label='Oakensoul (Major Proph + Minor Force)' onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='kilt'label='Kilt Max Stacks (1110/5% crit chance  + 10% crit dam)' onToggleClick={(e) => handleToggle(e)} />               
                <Toggle id='orderswrath'label='Orders Wrath (2257/10.3% crit chance + 8% crit dam)' onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='sulxan'label='Sul-Xan Proc (2160/9.8% crit chance + 12% crit dam)' onToggleClick={(e) => handleToggle(e)} />
                <Slider id='morascribec' label="Mora Scribe (128/0.6% crit chance / major buff)" value={toggles['morascribe']}  lessCommon={lessCommon} each={128} min={0} max={12} factor={219} step={1} onToggleClick={(e) => handleToggle(e)} />
                <Slider id='morascribed' label="Mora Scribe (1% crit damage / minor buff)" value={toggles['morascribe']}  lessCommon={lessCommon} each={1} min={0} max={12} factor={1} step={1} onToggleClick={(e) => handleToggle(e)} />
            </Col>
          </Row>
          <Row className="ps-5">
            <Col lg={4} sm={12}>
              <h4><u>Penetration Options</u></h4>
            </Col>
            <Col lg={4} sm={12}>
              <h4><u>Crit Chance Options</u></h4>
            </Col>
            <Col lg={4} sm={12}>
              <h4><u>Crit Damage Options</u></h4>
            </Col>
          </Row>
          <Row className="ps-5">
            <Col lg={4} sm={12}>        
              <h5>Gear Options</h5>
                <Toggle id='1hsharp' label='Sharpened 1H Weapon (1638 = 2.5%)' onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='2hsharp' label='Sharpened 2H Weapon (3276 = 5%)' onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='mace' label='Mace (1650 = 2.5%)' onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='maul' label='Maul or 2x Maces (3300 = 5%)' onToggleClick={(e) => handleToggle(e)} />
                <Slider id='setpen' label="Any Set Pen Line (1487/line)" value={toggles['setpen']} each={1487} min={0} max={7} factor={663} step={1} onToggleClick={(e) => handleToggle(e)} />

              <h5>Character Options</h5>
                <Toggle id='piercing' label='Piercing CP (700 = 1%)' defaultvalue={true} onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='necro' label='Necro Grave Lord (Active) (3271 = 5%)' onToggleClick={(e) => handleToggle(e)} />
                <Slider id='splintered' label='Arcanist Passive (1240/slotted skill)' value={toggles['splintered']} each={1240} min={0} max={6} factor={663} step={1} onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='woodelf' label='Wood Elf Passive (950 = 1.4%)' onToggleClick={(e) => handleToggle(e)} />
                <Slider id='forceofnature' label='Force of Nature CP (660/status effect)' value={toggles['forceofnature']} each={660} min={0} max={8} factor={663} step={1} onToggleClick={(e) => handleToggle(e)} />
            </Col>
            <Col lg={4} sm={12}>        
              <h5>Major Prophecy / Savagery (2629 = 12%)</h5>
                <Toggle id='weaponcritpotion' label='Weapon Critical Potion' onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='spellcritpotion' label='Spell Critical Potion' onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='camohunter' label='Fighters Camo Hunter' onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='magelight' label='Mages Magelight' onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='shadowcloak' label='Nightblade Shadow Cloak (Either Bar)' onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='inferno' label='DK Inferno (Either Bar)' onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='lotusflower' label='Warden Lotus Flower (Active)' onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='sunfire' label='Templar Sun Fire (Active)' onToggleClick={(e) => handleToggle(e)} />
              <h5>Character Options</h5>
                <Toggle id='precision' label='Precision CP (320 = 1.46%)' defaultvalue={true} onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='thiefmundus' label='Thief Mundus 7 Divines (2182 = 10%)' defaultvalue={true} onToggleClick={(e) => handleToggle(e)} />
                <Slider id='nbassassin' label='Nightblade Assassin Skill (548/slotted skill = 2.5%)' value={toggles['nbassassin']} each={548} min={0} max={6} factor={219} step={1} onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='nb' label='Nightblade Flanking (1445 = 6.6%)' onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='necroex' label='Necro Death Knell Passive (20%)' onToggleClick={(e) => handleToggle(e)} />
              <h5>Sets</h5>
                <Toggle id='whispers'label='Moras Whispers Max (1528 = 7%)' onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='slimecraw'label='Monster Helm 1pc (657 = 3%)' defaultvalue={true} onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='forestwraith'label='Forest Wraith (Class Skills Only) (3351 = 15.3%)' onToggleClick={(e) => handleToggle(e)} />
                <Slider id='setcritchance' label="Any Set Crit Chance Line (657/line)" value={toggles['setcritchance']} each={657} min={0} max={7} factor={219}  step={1} onToggleClick={(e) => handleToggle(e)} />

              <h5>Gear Options</h5>
                <Toggle id='2hprecise'label='2H Precise Trait (1576 = 7.2%)' onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='1hprecise'label='1H Precise Trait (788 = 3.6%)' onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='dagger'label='Dagger Passive (657 = 3%)' onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='seconddagger'label='Second Dagger Passive (657 = 3%)' onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='bow'label='Bow Passive (1314 = 6%)' onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='vinedusk'label='Bow Distance Passive (1314 = 6%)' onToggleClick={(e) => handleToggle(e)} />


            </Col>
            <Col lg={4} sm={12}>
              <h5>Minor Force (10%)</h5>
                <Toggle id='barbedtrap' label='Fighters Barbed Trap (Active)' onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='accelerate' label='Psijic Accelerate (Active)' onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='medusa' label='Medusa' onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='tzogvin' label='Tzogvin, Max Stacks' onToggleClick={(e) => handleToggle(e)} />
              <h5>Sets</h5>
                <Toggle id='archers'label='Archers Mind Not Sneaking(8%)' lessCommon={lessCommon} onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='archersneak'label='Archers Mind Sneaking (24%)' lessCommon={lessCommon} onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='gourmand'label='Back-Alley Gourmand (13%)' lessCommon={lessCommon} onToggleClick={(e) => handleToggle(e)} />
              <h5>Gear Options</h5>
                <Toggle id='axe'label='1H Axe Passive (6%)' onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='axes'label='2H Axe or Dual Axes Passive (12%)' onToggleClick={(e) => handleToggle(e)} />
              <h5>Character Options</h5>
                <Toggle id='finesse' label='Finesse CP (8%)' onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='backstabber' label='Backstabber CP (10%)' onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='shadowmundus' label='Shadow Mundus 7 Divines (18%)' onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='hemorrhage' label='Nightblade Passive (10%)' onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='templar' label='Templar Passive (12%)' onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='arcanist' label='Arcanist Passive (12%)' onToggleClick={(e) => handleToggle(e)} />
                <Toggle id='khajiit' label='Khajiit Passive (12%)' onToggleClick={(e) => handleToggle(e)} />
                <Slider id='wardenpet' label='Warden Animal Skill (4%/slotted skill)' value={toggles['wardenpet']} each={4} min={0} max={6} factor={1} step={1} onToggleClick={(e) => handleToggle(e)} />


            </Col>



          </Row>




        </Container>
          <Navbar sticky="bottom"  bg="dark" data-bs-theme="dark" className="text-center ps-5"> 
            <Navbar.Text className="text-start col">
                <h3>Pen: <span className={toggles['overcappen']}>{pen}</span> / 18200</h3>
                <h4>({Number((18200-Math.min(pen,18200))/663).toFixed(1)}% damage reduction)</h4>
            </Navbar.Text>
            <Navbar.Text className="text-start col">
                <h3>Crit Chance</h3>
                <h3><span className={toggles['overcapchance']}>{Number((critchance/219).toFixed(1))}%</span> / 100%</h3>
            </Navbar.Text>
            <Navbar.Text className="text-start col">
                <h3>Crit Damage</h3>
                <h3><span className={toggles['overcapcritdam']}>{Number((critdam).toFixed(1))}%</span> / 125%</h3>
            </Navbar.Text>
          </Navbar>



    </>
  );
}


function hideSomeSkills(toggles) {
  if (toggles['hideUncommon']) 
    toggles['uncommon']='visually-hidden';
  else toggles['uncommon']='undefined';
}



function calculatePen(toggles) {
  let pen=0
  // major breach
  if (toggles['pierce']||toggles['elesus']||toggles['caltrops']||toggles['psijic']||toggles['fissure']||toggles['boneyard']||toggles['noxious']||toggles['marktarget']) pen=pen+5948;
  // minor breach
  if (toggles['pierce']||toggles['fissure']||toggles['fatewoven']||toggles['wall']) pen=pen+2974;

  if (toggles['crimson']) pen=pen+3451;
  if (toggles['alkosh']) pen=pen+6000;
  if (toggles['2hicrusher']) pen=pen+2108;
  if (toggles['2hcrusher']) pen=pen+1622;
  if (toggles['1hicrusher']) pen=pen+1054;
  if (toggles['1hcrusher']) pen=pen+811;
  if (toggles['crystal']) pen=pen+1000;
  if (toggles['runic']) pen=pen+2200;

  if (toggles['tremorscale']) pen=pen+Number((toggles['resists']*.08).toFixed(0));
  if (toggles['resists']) pen=pen+10+10;

  if (toggles['1hsharp']) pen=pen+1638;
  if (toggles['velothi']) pen=pen+1650;
  if (toggles['2hsharp']) pen=pen+3276;
  if (toggles['mace']) pen=pen+1650;
  if (toggles['2ndmace']) pen=pen+1650;
  if (toggles['maul']) pen=pen+3300;
  if (toggles['piercing']) pen=pen+700;
  if (toggles['necro']) pen=pen+3271;
  if (toggles['nb']) pen=pen+2974;
  if (toggles['woodelf']) pen=pen+950;
  if (toggles['light']) pen=pen+(939*toggles['light']);
  if (toggles['setpen']) pen=pen+(1487*toggles['setpen']);
  if (toggles['forceofnature']) pen=pen+(660*toggles['forceofnature']);
  if (toggles['splintered']) pen=pen+(1240*toggles['splintered']);

  if (toggles['tankresists']) pen=pen;

  if (pen > 18200) toggles['overcappen']="text-danger";
  else toggles['overcappen']="";

  console.log(toggles);
  console.log("total is "+pen);
  return pen;
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
  if (toggles['orderswrath']) critchance=critchance+2257;
  if (toggles['slimecraw']) critchance=critchance+771;
  if (toggles['sulxan']) critchance=critchance+2160;
  if (toggles['forestwraith']) critchance=critchance+=3351;
  if (toggles['morascribec']) critchance=critchance+(128*toggles['morascribe']);
  if (toggles['kilt']) critchance=critchance+1100;
  if (toggles['whispers']) critchance=critchance+1528;
  if (toggles['thiefmundus']) critchance=critchance+2182;
  if (toggles['bow']) critchance=critchance+1314;
  if (toggles['vinedusk']) critchance=critchance+1314;
  if (toggles['nb']) critchance=critchance+1445;
  // if (toggles['']) critchance=critchance+;
  // if (toggles['']) critchance=critchance+;
  // if (toggles['']) critchance=critchance+;
  // if (toggles['']) critchance=critchance+;
  // if (toggles['']) critchance=critchance+;


  if (toggles['light']) critchance=critchance+(219*toggles['light']);
  if (toggles['setcritchance']) critchance=critchance+(657*toggles['setcritchance']);
  if (toggles['nbassassin']) critchance=critchance+(548*toggles['nbassassin']);
  if (toggles['necroex']) critchance=critchance+2190+2190;


  if (critchance > 21900) toggles['overcapchance']="text-danger";
  else toggles['overcapchance']="";

  return critchance;
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
  if (toggles['light']) critdam=critdam+(2*(7-toggles['light']));
  if (toggles['morascribed']) critdam=critdam+(1*toggles['morascribe']);
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
  if (critdam > 125) toggles['overcapcritdam']="text-danger";
  else toggles['overcapcritdam']="";
  console.log(toggles);
  // console.log("total is "+armor);
  return critdam;
}








