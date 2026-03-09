// const GamePage = () => {
//   return (
//     <div>
//       <h1>Game Page Working ✅</h1>
//     </div>
//   );
// };

// export default GamePage;

import Chatbot from "../components/Chatbot";

function GamePage() {
  return (
    <div>
      <h1>Game</h1>
      {/* Game content */}
      
      {/* AI Chatbot */}
      <Chatbot />
    </div>
  );
}

export default GamePage;
