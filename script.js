// const shouldComponentUpdate(nextProps, nextState) {

const ranks = [
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  'Jack',
  'Queen',
  'King',
  'Ace',
];

const fixedranks = {
  '2': 'Two',
  '3': 'Three',
  '4': 'Four',
  '5': 'Five',
  '6': 'Six',
  '7': 'Seven',
  '8': 'Eight',
  '9': 'Nine',
  '10': 'Ten',
  Jack: 'Jack',
  Queen: 'Queen',
  King: 'King',
  Ace: 'Ace',
};

const suits = ['Hearts', 'Spades', 'Diamonds', 'Clubs'];

console.log('export default {');

// for (const suit of suits) {
//   for (const rank of ranks) {
//     console.log(`${rank[0]}${suit[0]},`);
//   }
// }

// for (const suit of suits) {
//   for (const rank of ranks) {
//     console.log(`import ${fixedranks[rank]}${suit} from '../images/${rank[0] === '1' ? 'T' : rank[0]}${suit[0]}.svg;'`);
//   }
// }

console.log('export default {');

for (const suit of suits) {
  for (const rank of ranks) {
    console.log(`'${rank}${suit}': ${fixedranks[rank]}${suit},`);
  }
}

console.log('}');
