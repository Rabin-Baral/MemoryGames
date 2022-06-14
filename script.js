//Let's just grab a couple of things
const container = document.querySelector('.container')
const playerLiveCount = document.querySelector("span")
let playerLives = 6;

//fetching lives to the playerLiveCount
playerLiveCount.textContent = playerLives

//Generate the Data
const getData = () => [
    {imgSrc: "./images/avatar.jpg", name: "avatar"},
    {imgSrc: "./images/divo.jpg", name: "divo"},
    {imgSrc: "./images/fordGT.jpg", name: "fordGT"},
    {imgSrc: "./images/la.jpg", name: "la"},
    {imgSrc: "./images/maserati.jpg", name: "maserati"},
    {imgSrc: "./images/regera.jpg", name: "regera"},
    {imgSrc: "./images/terzo.jpg", name: "terzo"},
    {imgSrc: "./images/zonda.jpg", name: "zonda"},
    {imgSrc: "./images/avatar.jpg", name: "avatar"},
    {imgSrc: "./images/divo.jpg", name: "divo"},
    {imgSrc: "./images/fordGT.jpg", name: "fordGT"},
    {imgSrc: "./images/la.jpg", name: "la"},
    {imgSrc: "./images/maserati.jpg", name: "maserati"},
    {imgSrc: "./images/regera.jpg", name: "regera"},
    {imgSrc: "./images/terzo.jpg", name: "terzo"},
    {imgSrc: "./images/zonda.jpg", name: "zonda"},
]  //if you don't give { after => it will automatically return the object we asign inside

//randomize the data

const randomize = () => {
    const cardData = getData()
    cardData.sort(()=> Math.random() - 0.5);   //this will randomize the array
    return cardData
}

//Card Generator Function
const cardGenerator = () => {
    const cardData = randomize();

    cardData.forEach(item =>{

        //Generate the element
        const card = document.createElement('div')
        const face = document.createElement('img')
        const back = document.createElement('div')

        //assigning class to the element
        card.classList = 'card'
        face.classList = 'face'
        back.classList = 'back'
        
        //Attatch the info to hte cards
        face.src = item.imgSrc
        card.setAttribute('name', item.name)

        //appending the card into the container
        container.appendChild(card)
        card.appendChild(face)
        card.appendChild(back)

        //adding eventlisterner
        card.addEventListener("click", (e)=>{
            card.classList.toggle("toggleCard")
            checkCards(e)
        })

    })
}

//Checking Cards
const checkCards = (e) =>{
    console.log(e)
    const clickedCard = e.target    //this will collect the information from the clicked cards
    clickedCard.classList.add('flipped')
    const flippedCard = document.querySelectorAll('.flipped')
    const toggleCard = document.querySelectorAll('.toggleCard')
    //Logic behind the game


    if(flippedCard.length === 2){
        if(flippedCard[0].getAttribute("name") === flippedCard[1].getAttribute("name")){
            console.log("matched")
            flippedCard.forEach(card =>{
                card.classList.remove('flipped')   //removing the 'flipped' class so that we can count the card again
                card.style.pointerEvents = 'none'   //if two cards are matched it can't be toggled back, it makes the card unclickable
            })
        }
        else{
            console.log("wrong car")
            flippedCard.forEach(card =>{
                card.classList.remove('flipped')
                setTimeout(() => card.classList.remove('toggleCard'), 1000)  //removing 'toggleCrd' class ie. flipping if two clicked cards arent matched to eachother
            })

            playerLives --
            playerLiveCount.textContent = playerLives

            if(playerLives === 0){
                restart('wish you good luck for the next time.')
            }
        }             
    }

    // Check if we win the game 
    if(toggleCard.length ===16){
        alert('BINGO!!!')
    }
}

//restart the game
const restart = (message) => {
    let cardData = randomize()
    let faces = document.querySelectorAll('.face')
    let cards = document.querySelectorAll('.card')

    container.style.pointerEvents = 'none'
    cardData.forEach((items, index) => {
        cards[index].classList.remove('toggleCard')

        setTimeout(() =>{  //giving them time to animate(flip)
                    //setting back the blocked pointer events so that we can clicked on the previous clicked correct cards's pair
        cards[index].style.pointerEvents = 'all'

        //shuffling all the cards again
        faces[index].src = items.imgSrc

        //Setting 'name' attribute to the new randomize cards
        cards[index].setAttribute('name', items.name)

        container.style.pointerEvents = 'all'

        }, 1000)

    })
    playerLives = 6;
    playerLiveCount.textContent = playerLives
    setTimeout(() => window.alert(message), 1000)
}


cardGenerator()