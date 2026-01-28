import './App.scss';
import React, { useState } from "react";

// Game Data
const CHARACTERS = [
  { id: 1, name: "Scout", health: 60, strength: 40, agility: 80, description: "Fast and nimble, but fragile" },
  { id: 2, name: "Soldier", health: 100, strength: 80, agility: 40, description: "Strong and tough, but slow" },
  { id: 3, name: "Survivor", health: 75, strength: 60, agility: 60, description: "Well-rounded stats" },
];

const LOCATIONS = [
  { id: 1, name: "Abandoned Hospital", baseDifficulty: 30, description: "High risk, high reward" },
  { id: 2, name: "Shopping Mall", baseDifficulty: 50, description: "Moderate danger, good loot" },
  { id: 3, name: "Military Base", baseDifficulty: 70, description: "Extremely dangerous, best gear" },
];

const GEAR = [
  { id: 1, name: "Baseball Bat", healthBonus: 0, strengthBonus: 10, agilityBonus: 0, unlockLevel: 0 },
  { id: 2, name: "Machete", healthBonus: 0, strengthBonus: 25, agilityBonus: 0, unlockLevel: 1 },
  { id: 3, name: "Body Armor", healthBonus: 30, strengthBonus: 0, agilityBonus: -5, unlockLevel: 1 },
  { id: 4, name: "Assault Rifle", healthBonus: 0, strengthBonus: 50, agilityBonus: -10, unlockLevel: 2 },
  { id: 5, name: "Combat Suit", healthBonus: 50, strengthBonus: 20, agilityBonus: 10, unlockLevel: 3 },
];

const FORMULA_PIECES_NEEDED = 5;

function App() {
  // Game State
  const [gamePhase, setGamePhase] = useState('character'); // character, location, gear, raiding, results
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedGear, setSelectedGear] = useState(null);
  const [raidCount, setRaidCount] = useState(0);
  const [formulaPieces, setFormulaPieces] = useState(0);
  const [raidResult, setRaidResult] = useState(null);
  const [raidLog, setRaidLog] = useState([]);

  // Calculate total stats with gear bonuses
  const getTotalStats = () => {
    if (!selectedCharacter) return { health: 0, strength: 0, agility: 0 };
    
    const gearBonus = selectedGear ? {
      health: selectedGear.healthBonus,
      strength: selectedGear.strengthBonus,
      agility: selectedGear.agilityBonus
    } : { health: 0, strength: 0, agility: 0 };

    return {
      health: selectedCharacter.health + gearBonus.health,
      strength: selectedCharacter.strength + gearBonus.strength,
      agility: selectedCharacter.agility + gearBonus.agility
    };
  };

  // Calculate raid success probability
  const calculateSuccessChance = () => {
    if (!selectedLocation || !selectedCharacter) return 0;
    
    const stats = getTotalStats();
    const totalPower = stats.health + stats.strength + stats.agility;
    const difficulty = selectedLocation.baseDifficulty + (raidCount * 10);
    
    // Base success chance: power vs difficulty
    let successChance = Math.max(10, Math.min(90, (totalPower / difficulty) * 100));
    
    return Math.round(successChance);
  };

  // Execute raid
  const executeRaid = () => {
    setGamePhase('raiding');
    
    // Add delay to show raiding phase
    setTimeout(() => {
      const successChance = calculateSuccessChance();
      const roll = Math.random() * 100;
      const success = roll <= successChance;
      
      const log = [];
      log.push(`Entering ${selectedLocation.name}...`);
      log.push(`Your total power: ${getTotalStats().health + getTotalStats().strength + getTotalStats().agility}`);
      log.push(`Location difficulty: ${selectedLocation.baseDifficulty + (raidCount * 10)}`);
      log.push(`Success chance: ${successChance}%`);
      log.push('');
      
      if (success) {
        log.push('🎉 RAID SUCCESSFUL!');
        log.push('You fought through the zombies and found a formula piece!');
        setFormulaPieces(prev => prev + 1);
        setRaidResult('success');
        
        if (formulaPieces + 1 >= FORMULA_PIECES_NEEDED) {
          log.push('');
          log.push('🏆 YOU HAVE ALL FORMULA PIECES!');
          log.push('The cure is complete! You saved the world!');
        }
      } else {
        log.push('💀 RAID FAILED!');
        log.push('You were overwhelmed by zombies...');
        setRaidResult('failure');
      }
      
      setRaidLog(log);
      setRaidCount(prev => prev + 1);
      setGamePhase('results');
    }, 1500); // 1.5 second delay
  };

  // Reset for next raid
  const startNewRaid = () => {
    setSelectedLocation(null);
    setSelectedGear(null);
    setRaidResult(null);
    setRaidLog([]);
    setGamePhase('location');
  };

  // Reset entire game
  const resetGame = () => {
    setGamePhase('character');
    setSelectedCharacter(null);
    setSelectedLocation(null);
    setSelectedGear(null);
    setRaidCount(0);
    setFormulaPieces(0);
    setRaidResult(null);
    setRaidLog([]);
  };

  // Get available gear based on raid count
  const getAvailableGear = () => {
    return GEAR.filter(g => g.unlockLevel <= raidCount);
  };

  // Render Character Selection
  const renderCharacterSelection = () => (
    <div className="game-phase">
      <h2>Choose Your Character</h2>
      <div className="selection-grid">
        {CHARACTERS.map(char => (
          <div 
            key={char.id} 
            className={`selection-card ${selectedCharacter?.id === char.id ? 'selected' : ''}`}
            onClick={() => {
              setSelectedCharacter(char);
              setGamePhase('location');
            }}
          >
            <h3>{char.name}</h3>
            <p>{char.description}</p>
            <div className="stats">
              <div>❤️ Health: {char.health}</div>
              <div>⚔️ Strength: {char.strength}</div>
              <div>🏃 Agility: {char.agility}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Render Location Selection
  const renderLocationSelection = () => (
    <div className="game-phase">
      <h2>Choose Raid Location</h2>
      <div className="selection-grid">
        {LOCATIONS.map(loc => (
          <div 
            key={loc.id} 
            className={`selection-card ${selectedLocation?.id === loc.id ? 'selected' : ''}`}
            onClick={() => {
              setSelectedLocation(loc);
              setGamePhase('gear');
            }}
          >
            <h3>{loc.name}</h3>
            <p>{loc.description}</p>
            <div className="difficulty">
              Difficulty: {loc.baseDifficulty + (raidCount * 10)}
            </div>
          </div>
        ))}
      </div>
      <button className="back-button" onClick={() => setGamePhase('character')}>
        ← Back to Character Selection
      </button>
    </div>
  );

  // Render Gear Selection
  const renderGearSelection = () => {
    const availableGear = getAvailableGear();
    const stats = getTotalStats();
    const successChance = calculateSuccessChance();
    
    return (
      <div className="game-phase">
        <h2>Choose Your Gear</h2>
        <div className="selection-grid">
          <div 
            className={`selection-card ${selectedGear === null ? 'selected' : ''}`}
            onClick={() => setSelectedGear(null)}
          >
            <h3>No Gear</h3>
            <p>Go in with just your character stats</p>
          </div>
          {availableGear.map(gear => (
            <div 
              key={gear.id} 
              className={`selection-card ${selectedGear?.id === gear.id ? 'selected' : ''}`}
              onClick={() => setSelectedGear(gear)}
            >
              <h3>{gear.name}</h3>
              {gear.healthBonus > 0 && <div>+{gear.healthBonus} Health</div>}
              {gear.strengthBonus > 0 && <div>+{gear.strengthBonus} Strength</div>}
              {gear.agilityBonus > 0 && <div>+{gear.agilityBonus} Agility</div>}
              {gear.agilityBonus < 0 && <div>{gear.agilityBonus} Agility</div>}
            </div>
          ))}
        </div>
        <div className="raid-preview">
          <h3>Raid Preview</h3>
          <div className="preview-stats">
            <div>Total Health: {stats.health}</div>
            <div>Total Strength: {stats.strength}</div>
            <div>Total Agility: {stats.agility}</div>
            <div className="success-chance">Success Chance: {successChance}%</div>
          </div>
        </div>
        <div className="button-group">
          <button className="back-button" onClick={() => setGamePhase('location')}>
            ← Back to Location Selection
          </button>
          <button className="raid-button" onClick={executeRaid}>
            Start Raid →
          </button>
        </div>
      </div>
    );
  };

  // Render Raiding Phase
  const renderRaiding = () => (
    <div className="game-phase">
      <h2>Raid in Progress...</h2>
      <div className="loading">⚔️ Fighting zombies...</div>
    </div>
  );

  // Render Results
  const renderResults = () => (
    <div className="game-phase">
      <h2>Raid Results</h2>
      <div className={`result-box ${raidResult}`}>
        {raidLog.map((line, idx) => (
          <div key={idx} className="log-line">{line}</div>
        ))}
      </div>
      <div className="progress">
        <h3>Progress</h3>
        <div className="formula-progress">
          Formula Pieces: {formulaPieces} / {FORMULA_PIECES_NEEDED}
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${(formulaPieces / FORMULA_PIECES_NEEDED) * 100}%` }}
            ></div>
          </div>
        </div>
        <div>Raids Completed: {raidCount}</div>
        <div>Next Raid Difficulty: +{raidCount * 10}</div>
      </div>
      {formulaPieces >= FORMULA_PIECES_NEEDED ? (
        <div className="button-group">
          <button className="reset-button" onClick={resetGame}>
            🎉 New Game
          </button>
        </div>
      ) : (
        <div className="button-group">
          <button className="raid-button" onClick={startNewRaid}>
            Go on Another Raid →
          </button>
          <button className="reset-button" onClick={resetGame}>
            Reset Game
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="Header-title">Z-RAID</h1>
        <p className="Header-subtitle">Zombie Raid Game</p>
      </header>
      <div className="App-body">
        {gamePhase === 'character' && renderCharacterSelection()}
        {gamePhase === 'location' && renderLocationSelection()}
        {gamePhase === 'gear' && renderGearSelection()}
        {gamePhase === 'raiding' && renderRaiding()}
        {gamePhase === 'results' && renderResults()}
      </div>
    </div>
  );
}

export default App;
