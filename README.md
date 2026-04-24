# Just Divide - Kid Math Puzzle 🐱➗

![Just Divide Gameplay](./assets/Game_Play.png) <!-- Add a screenshot link here if available -->

Welcome to **Just Divide**! An intuitive, drag-and-drop math puzzle game designed to sharpen division skills in a fun, relaxing, and highly interactive environment. Help your cartoon cat buddy solve the board!

🌟 **Play it live here:** [Just Divide on Vercel](https://kid-math-puzzle.vercel.app)

---

## 🎮 How to Play

The objective of the game is to clear tiles from the board using simple division rules.

1. **Drag and Drop:** Pick up numbers from the Queue and drop them into the empty slots on the 4x4 grid.
2. **Divide to Conquer:** If you place a tile adjacent to a grid number that it divides into evenly (e.g., dropping a `2` next to an `8`), they will merge together and reward you with the quotient (`4`).
3. **Match to Clear:** If you place a tile next to an identical number, they both pop and clear from the board!
4. **Use Your Tools:**
   - **Keep Slot:** Need a tile for later? Drop it in the Keep slot to stash it.
   - **Trash:** Stuck with a bad number? Throw it in the trash perfectly (be careful, you only have limited uses!).
5. **Level Up:** Score big to advance to the next level—higher levels refill your trash allowances to keep the game going!

---

## 🚀 Features

- **Kid-Friendly Interface:** Vibrant, cartoonish graphics with an adorable cat companion and smooth, playful animations.
- **Responsive Layout:** Flawlessly transitions between desktop displays and mobile touch screens with a specialized dock.
- **Drag-and-Drop Interaction:** Built with a robust physical drag-and-drop mechanics supporting both mouse and mobile touch pointers.
- **Smart Logic System:** A custom game loop that watches for valid mathematical moves.
- **Timers & Progress:** Built-in play timer, level progression, and high-score persistence!

---

## 🛠️ Technologies Used

This project was built using modern web development standards and optimized for performance:

- **Framework:** [React 18](https://react.dev/) via [Vite](https://vitejs.dev/) for lightning-fast compilation.
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) for fully responsive, atomic styling and bespoke utility classes.
- **Animations:** [Framer Motion](https://www.framer.com/motion/) for fluid transitions, physics-based modal pop-ups, and overlay rendering.
- **Drag and Drop:** [@dnd-kit/core](https://dndkit.com/) for reliable and fully customizable grid sensor controls.
- **Icons:** [Lucide React](https://lucide.dev/) for crisp, scalable SVG indicators.

---

## 💻 Running the Game Locally

Want to tinker with the code or run it on your own machine? It's simple:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/lucky20T/kid-math-puzzle.git
   cd kid-math-puzzle
   ```

2. **Install the dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Play!**
   Open your browser and navigate to the address shown in your terminal (usually `http://localhost:5175`).

---

### Inspiration
Designed specifically to make mathematical division less intimidating for kids through bright aesthetics, gamification, and engaging interactions.

*Created with ❤️ for learning and playing.*
