const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, 'public', 'gen');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Full Emoji map
const emojiMap = {
  apple: "🍎", ant: "🐜", arm: "💪", bear: "🐻", ball: "⚽", boy: "👦",
  cat: "🐱", car: "🚗", cake: "🍰", dog: "🐶", duck: "🦆", door: "🚪",
  elephant: "🐘", egg: "🥚", eye: "👁️", fish: "🐟", frog: "🐸", flower: "🌸",
  goat: "🐐", girl: "👧", grapes: "🍇", hat: "🎩", horse: "🐴", house: "🏠",
  "ice cream": "🍦", igloo: "🧊", island: "🏝️", juice: "🧃", jump: "🏃", jacket: "🧥",
  kite: "🪁", king: "👑", kangaroo: "🦘", lion: "🦁", leaf: "🍃", lemon: "🍋",
  monkey: "🐒", moon: "🌙", milk: "🥛", nest: "🪹", nose: "👃", net: "🕸️",
  orange: "🍊", owl: "🦉", octopus: "🐙", pig: "🐷", pizza: "🍕", pen: "🖊️",
  queen: "👸", quilt: "🛏️", quiet: "🤫", rabbit: "🐰", rainbow: "🌈", ring: "💍",
  sun: "☀️", snake: "🐍", star: "⭐", tiger: "🐯", tree: "🌳", train: "🚂",
  umbrella: "☂️", unicorn: "🦄", up: "⬆️", van: "🚐", vase: "🏺", violin: "🎻",
  water: "💧", whale: "🐳", window: "🪟", "x-ray": "🩻", xylophone: "🎶", box: "📦",
  yellow: "🟡", "yo-yo": "🪀", yak: "🐂", zebra: "🦓", zoo: "🦁", zero: "0️⃣",
  toy: "🧸", mom: "👩", dad: "👨", toys: "🧸", dogs: "🐶", play: "🎮", morning: "🌅",
  night: "🌃", run: "🏃", sing: "🎤", eyes: "👀", sister: "👧", happy: "😊",
  red: "🔴", sunny: "☀️", bird: "🐦", go: "🚶", cats: "🐱", yes: "✅", book: "📖",
  here: "📍", question: "❓", that: "👉", see: "👀", me: "🙋‍♂️", hug: "🤗", bugs: "🐛",
  dirt: "🪨", rain: "🌧️", friend: "🧑‍🤝‍🧑", running: "🏃", tall: "🦒", playing: "🎮",
  friends: "🧑‍🤝‍🧑", family: "👨‍👩‍👧‍👦", eating: "🍽️", together: "🫂", name: "📛", hands: "👐",
  wash: "🧼", shoes: "👟", blue: "🔵", green: "🟢", one: "1️⃣", two: "2️⃣", three: "3️⃣",
  cow: "🐮", head: "🗣️", toes: "🦶", bread: "🍞", rice: "🍚", sad: "😢", angry: "😠",
  hello: "👋",
  banana: "🍌", bananas: "🍌", brother: "👦", teacher: "👩‍🏫", swim: "🏊",
  read: "📖", draw: "🎨", bike: "🚲", student: "🧑‍🎓", tired: "😫",
  brave: "🦁", dance: "💃", music: "🎵", table: "🪵", bed: "🛏️",
  scared: "😨", excited: "🤩", cold: "🥶", hot: "🥵", mouth: "👄",
  ears: "👂", feet: "🦶", fingers: "🖐️", carrots: "🥕", smile: "😊",
  bag: "🎒", heavy: "🏋️", white: "⚪", black: "⚫", pink: "🌸",
  purple: "💜", four: "4️⃣", five: "5️⃣", six: "6️⃣", seven: "7️⃣",
  eight: "8️⃣", ten: "🔟", books: "📖"
};

const alphabetMap = {
  a: "🍎", b: "🐻", c: "🐱", d: "🐶", e: "🐘", f: "🐸", g: "🦒", h: "🏠", i: "🍦",
  j: "🧃", k: "🪁", l: "🦁", m: "🐒", n: "👃", o: "🍊", p: "🐷", q: "👸", r: "🐰",
  s: "☀️", t: "🐯", u: "☂️", v: "🚐", w: "💧", x: "🩻", y: "🟡", z: "🦓"
};

const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#FF9F43', '#54A0FF', '#10AC84', '#EE5253', '#00D2D3', '#9b59b6', '#34495e'];

function generateSvg(text, prefix, type = 'word') {
  let emoji = "✨";
  let searchWord = text.toLowerCase().replace(/[^a-z0-9 ]/g, '');
  const stopWords = ['i', 'a', 'the', 'an', 'is', 'am', 'are', 'this', 'that', 'my', 'your', 'he', 'she', 'they', 'we', 'it'];
  
  if (type === 'main' && alphabetMap[searchWord.replace('letter ', '')]) {
    emoji = alphabetMap[searchWord.replace('letter ', '')];
  } else if (emojiMap[searchWord]) {
    emoji = emojiMap[searchWord];
  } else if (searchWord.endsWith('s') && emojiMap[searchWord.slice(0, -1)]) {
    emoji = emojiMap[searchWord.slice(0, -1)];
  } else {
    const words = searchWord.split(' ');
    let found = false;
    for (let w of words) {
      if (stopWords.includes(w)) continue;
      if (emojiMap[w]) { emoji = emojiMap[w]; found = true; break; }
      if (w.endsWith('s') && emojiMap[w.slice(0, -1)]) { emoji = emojiMap[w.slice(0, -1)]; found = true; break; }
    }
    
    if (!found) {
      for (let w of words) {
        if (emojiMap[w]) { emoji = emojiMap[w]; break; }
        if (w.endsWith('s') && emojiMap[w.slice(0, -1)]) { emoji = emojiMap[w.slice(0, -1)]; break; }
      }
    }
  }

  // Use a better hash to prevent collisions (e.g. apple and snake summing to 530)
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = ((hash << 5) - hash) + text.charCodeAt(i);
    hash |= 0;
  }
  hash = Math.abs(hash);
  
  const bgColor = colors[hash % colors.length];

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" width="400" height="300">
    <rect width="400" height="300" fill="${bgColor}" rx="20" ry="20" />
    <text x="200" y="120" font-size="100" text-anchor="middle" dominant-baseline="middle">${emoji}</text>
    <text x="200" y="240" font-size="28" font-family="Arial, sans-serif" font-weight="bold" fill="#ffffff" text-anchor="middle">${text.replace(/"/g, "'")}</text>
  </svg>`;
  
  const safeFilename = prefix + '_' + hash + '.svg';
  fs.writeFileSync(path.join(outDir, safeFilename), svg);
  return `gen/${safeFilename}`;
}

const lettersRaw = [
  { l: "A", w: ["apple", "ant", "arm"], s: ["This is an apple.", "The ant is small.", "I have two arms."] },
  { l: "B", w: ["bear", "ball", "boy"], s: ["The bear is brown.", "I play with a ball.", "He is a boy."] },
  { l: "C", w: ["cat", "car", "cake"], s: ["The cat sleeps.", "I like the blue car.", "This cake is sweet."] },
  { l: "D", w: ["dog", "duck", "door"], s: ["The dog runs.", "Look at the duck.", "Open the door."] },
  { l: "E", w: ["elephant", "egg", "eye"], s: ["The elephant is big.", "I eat an egg.", "Close your eyes."] },
  { l: "F", w: ["fish", "frog", "flower"], s: ["The fish swims.", "The frog jumps.", "A pretty flower."] },
  { l: "G", w: ["goat", "girl", "grapes"], s: ["The goat eats.", "She is a girl.", "I like grapes."] },
  { l: "H", w: ["hat", "horse", "house"], s: ["My hat is red.", "Ride the horse.", "This is my house."] },
  { l: "I", w: ["ice cream", "igloo", "island"], s: ["I love ice cream.", "An igloo is cold.", "A sunny island."] },
  { l: "J", w: ["juice", "jump", "jacket"], s: ["Drink the juice.", "I can jump.", "Wear your jacket."] },
  { l: "K", w: ["kite", "king", "kangaroo"], s: ["Fly a kite.", "The king is tall.", "A hopping kangaroo."] },
  { l: "L", w: ["lion", "leaf", "lemon"], s: ["The lion roars.", "A green leaf.", "A yellow lemon."] },
  { l: "M", w: ["monkey", "moon", "milk"], s: ["A funny monkey.", "Look at the moon.", "Drink your milk."] },
  { l: "N", w: ["nest", "nose", "net"], s: ["A bird's nest.", "Touch your nose.", "Catch with a net."] },
  { l: "O", w: ["orange", "owl", "octopus"], s: ["An orange is round.", "The owl hoots.", "An octopus swims."] },
  { l: "P", w: ["pig", "pizza", "pen"], s: ["The pig is pink.", "I like pizza.", "Write with a pen."] },
  { l: "Q", w: ["queen", "quilt", "quiet"], s: ["The queen waves.", "A warm quilt.", "Please be quiet."] },
  { l: "R", w: ["rabbit", "rainbow", "ring"], s: ["The rabbit hops.", "A colorful rainbow.", "A shiny ring."] },
  { l: "S", w: ["sun", "snake", "star"], s: ["The sun is hot.", "A long snake.", "A bright star."] },
  { l: "T", w: ["tiger", "tree", "train"], s: ["The tiger runs.", "A tall tree.", "A fast train."] },
  { l: "U", w: ["umbrella", "unicorn", "up"], s: ["Use an umbrella.", "A magic unicorn.", "Look up high."] },
  { l: "V", w: ["van", "vase", "violin"], s: ["A blue van.", "Flowers in a vase.", "Play the violin."] },
  { l: "W", w: ["water", "whale", "window"], s: ["Drink some water.", "A big whale.", "Open the window."] },
  { l: "X", w: ["x-ray", "xylophone", "box"], s: ["See the x-ray.", "Play xylophone.", "A toy box."] },
  { l: "Y", w: ["yellow", "yo-yo", "yak"], s: ["The sun is yellow.", "Play with yo-yo.", "A hairy yak."] },
  { l: "Z", w: ["zebra", "zoo", "zero"], s: ["A striped zebra.", "Go to the zoo.", "Count to zero."] }
];

const sentencesRaw = [
  { id: "this_is", t: "1. This is (这是)", i: ["This is a cat.", "This is an apple.", "This is my mom.", "This is a dog.", "This is a book.", "This is a car.", "This is my dad.", "This is a tree.", "This is a ball."] },
  { id: "i_like", t: "2. I like (我喜欢)", i: ["I like toys.", "I like apples.", "I like dogs.", "I like cats.", "I like milk.", "I like books.", "I like bananas.", "I like cars.", "I like ice cream."] },
  { id: "i_want", t: "3. I want (我想要)", i: ["I want a car.", "I want a ball.", "I want to play.", "I want a dog.", "I want a toy.", "I want an apple.", "I want to run.", "I want to sing.", "I want some milk."] },
  { id: "greetings", t: "4. 问候语 (Greetings)", i: ["Hello! How are you?", "Good morning!", "Good night!", "Goodbye! See you!", "Nice to meet you.", "Thank you so much.", "You are welcome.", "How is it going?", "Have a nice day!"] },
  { id: "i_can", t: "5. I can (我能)", i: ["I can run.", "I can jump.", "I can sing.", "I can swim.", "I can read.", "I can draw.", "I can fly a kite.", "I can ride a bike.", "I can clap my hands."] },
  { id: "i_have", t: "6. I have (我有)", i: ["I have a pen.", "I have two eyes.", "I have a sister.", "I have a book.", "I have a cat.", "I have a brother.", "I have two hands.", "I have a red hat.", "I have many toys."] },
  { id: "i_am", t: "7. I am (我是/我很)", i: ["I am a boy.", "I am happy.", "I am five.", "I am a girl.", "I am sad.", "I am six years old.", "I am a student.", "I am tired.", "I am brave."] },
  { id: "it_is", t: "8. It is (它是)", i: ["It is red.", "It is sunny.", "It is a bird.", "It is big.", "It is small.", "It is blue.", "It is a toy.", "It is raining.", "It is a green leaf."] },
  { id: "lets", t: "9. Let's (让我们)", i: ["Let's play.", "Let's go.", "Let's sing.", "Let's run.", "Let's jump.", "Let's dance.", "Let's read a book.", "Let's eat cake.", "Let's go to the zoo."] },
  { id: "do_you", t: "10. Do you like (你喜欢)", i: ["Do you like milk?", "Do you like cats?", "Yes, I do.", "Do you like dogs?", "Do you like apples?", "Do you like toys?", "No, I don't.", "Do you like cars?", "Do you like music."] },
  { id: "where_is", t: "11. Where is (在哪里)", i: ["Where is mom?", "Where is the book?", "It is here.", "Where is dad?", "Where is my toy?", "Where is the cat?", "It is on the table.", "It is under the bed.", "It is there."] },
  { id: "what_is", t: "12. What is (这是什么)", i: ["What is this?", "It is a toy.", "What is that?", "It is a dog.", "It is a banana.", "What is your name?", "It is a box.", "What is this color?", "It is an apple."] },
  { id: "can_you", t: "13. Can you (你能吗)", i: ["Can you jump?", "Can you see?", "Yes, I can.", "Can you run?", "Can you swim?", "Can you sing.", "No, I can't.", "Can you draw a cat?", "Can you ride a bike."] },
  { id: "look_at", t: "14. Look at (看)", i: ["Look at the dog.", "Look at me.", "Look at the star.", "Look at the cat.", "Look at the tree.", "Look at the car.", "Look at the rainbow.", "Look at the birds.", "Look at the moon."] },
  { id: "i_see", t: "15. I see (我看见)", i: ["I see a bird.", "I see the moon.", "I see a car.", "I see a cat.", "I see a dog.", "I see a tree.", "I see a star.", "I see the sun.", "I see my mom."] },
  { id: "give_me", t: "16. Give me (给我)", i: ["Give me the ball.", "Give me a hug.", "Give me the apple.", "Give me the book.", "Give me the toy.", "Give me some milk.", "Give me the pen.", "Please give me a cake.", "Give me a smile."] },
  { id: "dont_like", t: "17. I don't like (我不喜欢)", i: ["I don't like bugs.", "I don't like dirt.", "I don't like rain.", "I don't like snakes.", "I don't like cold days.", "I don't like onions.", "I don't like to cry.", "I don't like spiders.", "I don't like this color."] },
  { id: "she_is", t: "18. She is (她是)", i: ["She is my friend.", "She is happy.", "She is running.", "She is a girl.", "She is my teacher.", "She is beautiful.", "She is singing.", "She is jumping.", "She is eating an apple."] },
  { id: "he_is", t: "19. He is (他是)", i: ["He is a boy.", "He is tall.", "He is playing.", "He is my friend.", "He is my dad.", "He is strong.", "He is running fast.", "He is reading a book.", "He is happy."] },
  { id: "they_are", t: "20. They are (他们是)", i: ["They are playing.", "They are friends.", "They are happy.", "They are running.", "They are singing.", "They are brothers.", "They are big.", "They are eating pizza.", "They are at the zoo."] },
  { id: "we_are", t: "21. We are (我们是)", i: ["We are family.", "We are eating.", "We are together.", "We are happy.", "We are friends.", "We are playing a game.", "We are singing songs.", "We are running.", "We are in the house."] },
  { id: "my", t: "22. My (我的)", i: ["My name is Tom.", "This is my house.", "My hands are clean.", "This is my dog.", "My bag is heavy.", "My dad is strong.", "I love my mom.", "My book is new.", "This is my toy car."] },
  { id: "your", t: "23. Your (你的)", i: ["Is this your pen?", "Wash your hands.", "Your shoes are big.", "Is this your book?", "I like your hat.", "Close your eyes.", "Show me your toy.", "Your smile is pretty.", "Where is your house?"] },
  { id: "colors", t: "24. Colors (颜色)", i: ["The apple is red.", "The sky is blue.", "The grass is green.", "The sun is yellow.", "The cat is white.", "The dog is black.", "The flower is pink.", "I like purple grapes.", "The orange is orange."] },
  { id: "numbers", t: "25. Numbers (数字)", i: ["I have one nose.", "I see two birds.", "Count to three.", "I see four apples.", "I have five toys.", "He has six pens.", "There are seven stars.", "I see eight cars.", "Let's count to ten."] },
  { id: "animals", t: "26. Animals (动物)", i: ["The cow says moo.", "The dog barks.", "The cat meows.", "The lion is big.", "The bird can fly.", "The fish can swim.", "The monkey eats bananas.", "The frog is green.", "The rabbit likes carrots."] },
  { id: "body_parts", t: "27. Body (身体)", i: ["This is my head.", "Touch your toes.", "Clap your hands.", "Touch your nose.", "Close your eyes.", "Open your mouth.", "These are my ears.", "I have two feet.", "Wiggle your fingers."] },
  { id: "food", t: "28. Food (食物)", i: ["I eat bread.", "Drink some milk.", "I like rice.", "I eat an apple.", "I like sweet cake.", "This pizza is yummy.", "I want some juice.", "I love ice cream.", "Eat your banana."] },
  { id: "family", t: "29. Family (家庭)", i: ["She is my mom.", "He is my dad.", "I love my family.", "I have a sister.", "I have a brother.", "This is my baby brother.", "We play together.", "My dad loves me.", "My mom is nice."] },
  { id: "feelings", t: "30. Feelings (感受)", i: ["I feel happy.", "I am sad.", "Are you angry?", "I feel hot.", "It is cold.", "I am tired.", "She is excited.", "Are you scared?", "Don't be afraid."] }
];

let lettersDataOut = "export const lettersData = [\n";
for (const l of lettersRaw) {
  let words = l.w.map(word => `{ text: "${word}", image: import.meta.env.BASE_URL + "${generateSvg(word, 'word')}" }`).join(",\n      ");
  let sentences = l.s.map(sentence => `{ text: "${sentence}", image: import.meta.env.BASE_URL + "${generateSvg(sentence, 'sentence')}" }`).join(",\n      ");
  
  let mainImage = `import.meta.env.BASE_URL + "${generateSvg(`Letter ${l.l}`, 'main', 'main')}"`;

  lettersDataOut += `  { \n    letter: "${l.l}", \n    image: ${mainImage}, \n    words: [\n      ${words}\n    ], \n    sentences: [\n      ${sentences}\n    ] \n  },\n`;
}
lettersDataOut += "];\n\n";

let sentencesDataOut = "export const sentencesData = [\n";
for (const s of sentencesRaw) {
  let items = s.i.map(item => `{ text: "${item}", image: import.meta.env.BASE_URL + "${generateSvg(item, 'item')}" }`).join(",\n      ");
  sentencesDataOut += `  { \n    id: "${s.id}", \n    title: "${s.t}", \n    items: [\n      ${items}\n    ] \n  },\n`;
}
sentencesDataOut += "];\n";

fs.writeFileSync('src/data.js', lettersDataOut + sentencesDataOut);
console.log("Local SVG assets generated successfully and data.js updated.");
