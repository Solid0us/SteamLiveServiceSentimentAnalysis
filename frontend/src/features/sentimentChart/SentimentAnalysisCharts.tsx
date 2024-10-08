import { useEffect, useState } from "react";
import { SteamGames } from "../../lib/db_interface";
import { getReviewsByGameId } from "../../services/gameServices";
import { useQuery } from "@tanstack/react-query";
import RobertaCharts from "./RobertaCharts";
import SteamTotalRecommendationCharts from "./SteamTotalRecommendationCharts";
import SteamRecPastMonthCharts from "./SteamRecPastMonthCharts";

interface SentimentAnalysisChartProps {
  gamesList: SteamGames[];
  selectedGame: SteamGames | undefined;
  setSelectedGame: React.Dispatch<React.SetStateAction<SteamGames | undefined>>;
}

const SentimentAnalysisCharts = ({
  gamesList,
  selectedGame,
  setSelectedGame,
}: SentimentAnalysisChartProps) => {
  const { data: gameReviews } = useQuery({
    queryKey: ["games", selectedGame?.id],
    queryFn: () => getReviewsByGameId(selectedGame?.id ?? "UNKNOWN"),
    enabled: !!selectedGame?.id,
  });

  useEffect(() => {
    if (gamesList) {
      setSelectedGame(gamesList[0]);
    }
  }, [gamesList]);
  return (
    <div className="w-full p-3 flex flex-col gap-3 text-secondary-foreground border rounded-lg bg-secondary-foreground">
      <div className="flex flex-col gap-3 items-center">
        <h1 className="text-primary text-2xl font-bold">
          {selectedGame?.name} Sentiment Analysis
        </h1>
        <div className="flex flex-col items-center justify-center w-full gap-3">
          <div className="flex flex-col lg:flex-row gap-3">
            <RobertaCharts gameReviews={gameReviews} />
            <SteamRecPastMonthCharts gameReviews={gameReviews} />
          </div>
          <SteamTotalRecommendationCharts gameReviews={gameReviews} />
        </div>
      </div>
    </div>
  );
};

export default SentimentAnalysisCharts;
