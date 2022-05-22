import React, { Component } from 'react';
import Box from './components/Box';
import { BACKGROUND,  BALL, PLAYER } from './components/Box';
/* taille du tableau de jeu */
const ROW_SIZE = 10;
const COL_SIZE = 20;

/* taille  barre de joueur  
		 _
		|_|		
		|_|
		|_|
*/
const PADDLE_BOARD_SIZE = 3;
const PADDLE_EDGE_SPACE = 1; // espacee de 1 du bord

/* input utilisateur */
// const PLAYER_UP   = 38; // up arrow
// const PLAYER_DOWN = 40;  // down arrow
// const PAUSE       = 32;  // space

/* affichage de tableau 2d
	fr est une unite, chaque case fera 1 fr */
	const style = {
		width: "250px",
		heigth: "250px",
		display: "grid",
		gridTemplate: `repeat(${ROW_SIZE}, 1fr) / repeat(${COL_SIZE}, 1fr)`
	}

const inner = {
	display: "flex",
	flexDirection: "row",
	justifyContent: "justify",
	marginTop: "200px",
	marginLeft: "1px",
	Text: "100px",
	padding: "100px"
}

// const dividerStyle = {
//     marginLeft: "50px",
//     fontSize: "50px",
//     color: "white"
// }

const InitialState = () => {
		
	const paddle = [...Array(PADDLE_BOARD_SIZE)].map((_, pos) => pos);
	return {
		/* on cree la barre de jeu
			On a definitle Array(3) => board_size
			et on itere 3x fois pour creer la barre, a partir de la position 
			si x = 0 la barre sera sur le 1,
			et va s'etendre sur trois case x++ sur le 21 et x++ sur le 31*/
		player: paddle.map(x => (x * COL_SIZE) + PADDLE_EDGE_SPACE), // player sera a gauche du tab
		oponnent: paddle.map(x => ((x + 1) * COL_SIZE) - (PADDLE_EDGE_SPACE + 1)), // opponent sera a droite du tab
		ball: Math.round((ROW_SIZE * COL_SIZE) / 2) + (ROW_SIZE),  // on positionne la balle au milieu
		ballSpeed: 100,
		deltaY: -COL_SIZE,
		deltaX: -1, // si -1 la balle va vers le player / si 1 elle va vers l'opposant
		pause: true, // pour commencer le jeu
		// /* for dumb AI? */
		opponentSpeed: 150,
		opponentDir: false,
		/* Score */
		playerScore: 0,
		opponentScore: 0, 
	}
}

class App extends Component {

	

	constructor(props) {
		super(props);
		this.state = InitialState();
	}


	/*	reset the game 
			quand le jeu est reste on remt la balle au milieu
	*/
	resetGame = () => this.setState({
		ball: Math.round((ROW_SIZE * COL_SIZE) / 2) + ROW_SIZE,
	})

	/* check si on peut bouger le planche du palyer ou de celle de l'opposant */
	moveBoard = (playerBoard, isUp) => {}

	/* check si la balle touche les bords du tableau */
	touchingEdge = (pos) => {}

	/* check si la balle touche la barre du joueur -en vertical- */
	touchingPaddle = (pos)=> {}

	/* check si la ball touche le haut ou bas dela barre du jouer -horizontal- */
	touchingPaddleEdge = (pos) => {}

	/* check si la balle a marque un point */
	isScore = (pos) => {}

	/* fait rebondir la balle */
	bounceBall = () => {}

	/* gere les touches pressees par l'utilisateur */
	keyInput = ({keyCode}) => {}

	/* le rendu de tout le code 'mis' sur la page */



	render() {

		//on itere case par case sur le tableau
		const board = [...Array(ROW_SIZE * COL_SIZE)].map((_, pos) => {
			let val = BACKGROUND;
			// indoexOf() renvoie le premier indice pour lequel on trouve un element donne dans le tableau
			// si rien n'est trouve on renvoit -1 donc dans la condition ci dessus , si !== -1 on a trouve la position
			//|| (this.state.opponent.indexOf(pos) !== -1)) { 
			if ((this.state.player.indexOf(pos) !== -1) || (this.state.oponnent.indexOf(pos) !== -1)){ 
				val = PLAYER;
			}
			if (this.state.ball === pos) {
				val = BALL;
			}
			return <Box key={pos} k={pos} name={val} />;

		})
		// const divider = [...Array(ROW_SIZE/2)].map(_=> <div>{"|"}</div>);
		return (
			<div style={inner}>
				{/* on retourne le retour de board a chaque position */}
					<div style={style}>{board}</div> 
					{/* <div style={{dividerStyle}}>  {divider} </div> */}
			</div>
		);
	}
}

export default App;