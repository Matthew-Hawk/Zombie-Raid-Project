import "./Catagories.scss"
import React, { useState } from 'react';


function Catagories() {

    // Variables for game
    // var w = 0
    // var a = 0
    // var f = 0
    // var count = w + a + f

    // names for selected itmes
    const [wName, setWName] = useState("")
    const [aName, setAName] = useState("")
    const [fName, setFName] = useState("")

    // values for the catagory items
    const [weapon, setWeapon] = useState(null)
    const [armor, setArmor] = useState(null)
    const [food, setFood] = useState(null)

    // state for total and count
    const [total, setTotal] = useState("");
    // const [count , setCount] = useState(weapon + armor + food)

    // Logic for seeing the players outcome bases on total
    const count = weapon + armor + food
    function check(){
      // console.log("Count: "+""+count)
      
      if(count <= 5){
        setTotal("You're Zombie Food 😖")
      }else if(count <= 7){
        setTotal("You lived! 🥳")
      }else if(count <= 9){
        setTotal("You were VERY Greedy, but ya made it 😎")
      } else{
        setTotal("☠️ You died ☠️")
      }
    }
    //This resets the total and count state for a new game
    function reset (){
      setTotal("")
      setWName("")
      setAName("")
      setFName("")
    }

    //onClick functions for the sections
    function wselect(numToAdd, WeaponName) {
      setWeapon(numToAdd)
      setWName(WeaponName)
      // console.log(w)
    }

    function aselect(numToAdd, armorName) {
      setArmor(numToAdd)
      setAName(armorName)
      // console.log(a)
    }

    function fselect(numToAdd, foodName) {
      setFood(numToAdd)
      setFName(foodName)
      // console.log(f)
    }


  return (
    <div className='options'>
      <div className="catO">
        <section className='cat'>
            <h3 className='cat__title'>Weapons</h3>
            <button className='cat__wbutton' onClick={() => wselect(3, "Bat")}>Bat</button>
            <button className='cat__wbutton' onClick={() => wselect(5, "Gun")}>Gun</button>
            <button className='cat__wbutton' onClick={() => wselect(2, "Glue")}>Glue</button>
            <h2 className="cat__selected">You selected: {wName}</h2>
        </section>
        <section className='cat'>
            <h3 className='cat__title bob'>Armor</h3>
            <button className='cat__abutton' onClick={() => aselect(3, "Jacket")}>Jacket</button>
            <button className='cat__abutton' onClick={() => aselect(4, "Leather")}>Leather</button>
            <button className='cat__abutton'onClick={() => aselect(9, "Scarf")}>Scarf</button>
            <h2 className="cat__selected">You selected: {aName}</h2>
        </section>
        <section className='cat'>
            <h3 className='cat__title'>Food</h3>
            <button className='cat__fbutton' onClick={() => fselect(3, "Slurp")}>Slurpy</button>
            <button className='cat__fbutton' onClick={() => fselect(2, "Cherry Soda")}>Cherry Soda</button>
            <button className='cat__fbutton' onClick={() => fselect(9, "Spicy Gum")}>Spicy Gum</button>
            <h2 className="cat__selected">You selected: {fName}</h2>

        </section>
      </div>
      <div className="button-div">
        <button className="button-div__sub" onClick={check}>Run It</button>
        <button className="button-div__res" onClick={reset}>Reset</button>
      </div>
        <h1 className="total">{total}</h1>
        <h3 className="total">{count}</h3>
    </div>
  )
}

export default Catagories