
import { useEffect } from "react";
import { useGameState } from "@/Game/Chat/hooks/useGameState";
import { StartScreen } from "@/Game/Chat/components/game/StartScreen";
import { ChatSidebar } from "@/Game/Chat/components/game/ChatSidebar";
import { ChatWindow } from "@/Game/Chat/components/game/ChatWindow";
import { ScoreHeader } from "@/Game/Chat/components/game/ScoreHeader";
import { ExplanationScreen } from "@/Game/Chat/components/game/ExplanationScreen";
import { FinishScreen } from "@/Game/Chat/components/game/FinishScreen";
import { levels } from "@/Game/Chat/data/levels";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {

  const game = useGameState();
  const isMobile = useIsMobile();

  // logged in user
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleGameComplete = async (score:number)=>{

    try{

     await fetch("http://localhost:5000/api/scores",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          userId:user._id,
          username: user.name,
          avatar: `https://api.dicebear.com/7.x/identicon/svg?seed=${user.name}`,
          points:score,
          level:game.currentLevel
        })
      })

    }catch(err){
      console.error("Score save failed",err)
    }

  }

  // game finish hone par score save
  useEffect(()=>{

    if(game.phase === "finished"){
      handleGameComplete(game.score)
    }

  },[game.phase])


  if (game.phase === "start") {
    return <StartScreen onStart={game.startGame} />;
  }

  if (game.phase === "finished") {
    return (
      <FinishScreen
        score={game.score}
        correctAnswers={game.correctAnswers}
        wrongAnswers={game.wrongAnswers}
        elapsedTime={game.elapsedTime}
        formatTime={game.formatTime}
        leaderboard={game.leaderboard}
        playerName={game.playerName}
        setPlayerName={game.setPlayerName}
        submitted={game.submitted}
        onSubmit={game.submitScore}
        onRestart={game.restart}
      />
    );
  }

  const showExplanation = game.phase === "explanation" || game.phase === "critical";

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background">

      <ScoreHeader
        score={game.score}
        currentLevel={game.currentLevel}
        totalLevels={levels.length}
      />

      <div className="flex flex-1 min-h-0">

        {!isMobile && (
          <div className="w-[320px] shrink-0 border-r border-border">
            <ChatSidebar
              currentLevel={game.currentLevel}
              completedLevels={game.currentLevel}
            />
          </div>
        )}

        <div className="flex-1 flex flex-col min-h-0">
          {showExplanation ? (
            <ExplanationScreen
              level={game.level}
              wasCritical={game.phase === "critical"}
              onNext={game.nextLevel}
              isLastLevel={game.currentLevel === levels.length - 1}
            />
          ) : (
            <ChatWindow
              level={game.level}
              visibleMessages={game.visibleMessages}
              showOptions={game.showOptions}
              selectedOption={game.selectedOption}
              onSelectOption={game.selectOption}
              allMessagesVisible={game.level.messages.every(m =>
                game.visibleMessages.includes(m.id)
              )}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;