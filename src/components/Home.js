import { Board } from "./Board"
import { useState, useEffect } from "react"

const Player_X = 'X';
const Player_O = 'O';

const winningCombinations = [
    {combo:[0, 1, 2], strikeClass: "strike-row-1"},
    {combo:[3, 4, 5], strikeClass: "strike-row-2"},
    {combo:[6, 7, 8], strikeClass: "strike-row-3"},

    {combo:[0, 3, 6], strikeClass: "strike-column-1"},
    {combo:[1, 4, 7], strikeClass: "strike-column-2"},
    {combo:[2, 5, 8], strikeClass: "strike-column-3"},

    {combo:[0, 4, 8], strikeClass: "strike-diagonal-1"},
    {combo:[6, 4, 2], strikeClass: "strike-diagonal-2"}
    
];



export const Home = () => {
    const [tiles, setTiles] = useState(Array(9).fill(null));
    const [playertTurn, setPlayerTurn] = useState(Player_X);
    const [strike, setStrike] = useState(null);

    const [winner, setWinner] = useState(null);
    const [Restart, setRestart] = useState(null);
    const [names, setNames] = useState(' ');
    const [turnA, setAturn] = useState('bg-success');
    const [turnB, setBturn] = useState(' ');


    const [count, setCount] = useState(1);
    const [flag, setFlag] = useState(true);
    

   const handleTileClick = (index) => {
    if(flag){

    if(tiles[index] !== null){
        return '';
    }
    setCount(count+1)
      
    
    const newTiles = [...tiles];
    newTiles[index] = playertTurn;
    
    setTiles(newTiles);

    if(playertTurn === Player_X) {
         setPlayerTurn(Player_O)
         setAturn('')
        setBturn('bg-success')
    } else{
        setPlayerTurn(Player_X)
        setAturn('bg-success')
        setBturn('')
    }

    if(count === tiles.length){
        setWinner('Draw No one')
        setRestart('v')
        setAturn()
        setBturn()
        
    }
    }else
        return '';
   }
   
   function checkWinner() {
    if(flag)
    for(const { combo, strikeClass } of winningCombinations) {
        const tileValue1 = tiles[combo[0]];
        const tileValue2 = tiles[combo[1]];
        const tileValue3 = tiles[combo[2]];

        if(
            tileValue1 !== null &&
            tileValue1 === tileValue2 && 
            tileValue1 === tileValue3
        ) {
            
            (tileValue1 === 'X' ) ? setWinner(nameA) : setWinner(nameB);
           
            setFlag(false)
            setRestart('v');
            setStrike(strikeClass);
            setAturn()
            setBturn()
        }

    }

    }
    function Reset () {
        setTiles(Array(9).fill(null))
        setWinner(null)
        setRestart(null)
        setStrike('')
        setCount(1)
        setFlag(true)

        if(playertTurn !== Player_X) {
            setAturn('')
           setBturn('bg-success')
       } else{
           setAturn('bg-success')
           setBturn('')
       }
        
        
    }
   
   useEffect(() => {
    
        checkWinner(); // eslint-disable-next-line 
   }, [tiles])
   
   const [nameA, setA] = useState(null);
   const [nameB, setB] = useState(null);
   
    function TextA(e) {
        if(e.target.value !== null && e.target.value.trim() !== '')
            setA(e.target.value.trim()); 
        else
        setA(null);     
    }
    function TextB(e) {
        if(e.target.value !== null && e.target.value.trim() !== '')
            setB(e.target.value.trim());
        else
        setB(null); 
    }
    function PlayAgain() {
        setA(null)
        setB(null)
        setNames('v')
        Reset ()
    }

    function Start(){
        setNames(null);
        
    }
   
    

    return (
        <div>
            <h1>Tic Tac Toe</h1>
            { names && 
                <div>
                    <label className="form-label" htmlFor='NameA'>Enter player 1 name</label> : [ X ] <input onChange={TextA} type="search" className="form-control" name="" id="NameA" placeholder="Enter Name here.." /><br />
                    <label className="form-label" htmlFor='NameB'>Enter player 2 name</label> : [ O ] <input onChange={TextB} className="form-control" type="search" name="" id="NameB" placeholder="Enter Name here.." />
                </div>    
            }
            {(nameA && nameB) && names &&
            <div className="text-center">
             <button onClick={Start} className="btn btn-success mt-4">Submit</button>
            </div>
            }
             
            {!names &&
            <> 
            
                <div className="d-flex justify-content-between mb-5">
                    <label className={`turns p-1 me-2 ${turnA}`}>{nameA.toUpperCase()} '<b className="text-danger">X</b>'</label>
                    <label className={`turns p-1 ms-2 ${turnB}`}>{nameB.toUpperCase()} '<b className="text-danger">O</b>'</label>
                </div>
            
                <Board flag={flag} strike={strike} tiles={tiles} onTileClick={handleTileClick} playertTurn={playertTurn} />
            </>
            }
            {winner && <div className="game-over">{winner.toUpperCase()} Won</div>}
            {Restart && <button className="reset-button" onClick={Reset}>Play Again</button>}
            {Restart && 
                <div className="text-center">
                    <button onClick={PlayAgain} className="btn btn-info mt-4">New Players ?</button>
                </div>
            }
            
        </div>
    )
}
