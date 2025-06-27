import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAppSelector } from "@/redux/hooks";
import * as Progress from "@radix-ui/react-progress";

// Helper function to get performance rating and color based on the percentage
const getPerformance = (percentage: number) => {
  if (percentage >= 90) {
    return { rating: "Excellent", color: "bg-green-800" };
  } else if (percentage >= 50) {
    return { rating: "Good", color: "bg-yellow-500" };
  } else if (percentage >= 30) {
    return { rating: "Needs Improvement", color: "bg-orange-500" };
  } else {
    return { rating: "Poor", color: "bg-red-500" };
  }
};

export function QuizSummary() {
  const { questions, userAnswer } = useAppSelector((state) => state.quiz);

  // Calculate correct and incorrect answers
  const correctAnswersCount = questions.reduce((count, question, index) => {
    return question.correctAnswer === userAnswer[index] ? count + 1 : count;
  }, 0);
  const incorrectAnswersCount = questions.length - correctAnswersCount;

  const correctPercentage = parseFloat(
    ((correctAnswersCount / questions.length) * 100).toFixed(2)
  );
  console.log(correctPercentage);

  // Get performance rating and progress bar color based on the correct percentage
  const { rating, color } = getPerformance(correctPercentage);

  return (
    <Card className="max-w-lg mx-auto p-6 rounded-xl shadow-xl">
      <CardHeader>
        <h2 className="text-2xl font-bold">Quiz Summary</h2>
      </CardHeader>
      <CardContent>
        <h3 className="text-xl font-medium mb-4 ">
          You got {correctAnswersCount} out of {questions.length} correct!
        </h3>

        {/* Progress Bar */}
        <div className="mb-4">
           <Progress.Root className="h-4 bg-gray-200 rounded-full overflow-hidden" value={correctPercentage}>
            <Progress.Indicator
              className={`h-full transition-all duration-300 ${color}`}
              style={{ width: `${correctPercentage}%` }}
            />
          </Progress.Root>
          <div className="flex justify-between mt-2">
            <span className="text-sm">{correctPercentage}%</span>
            <span className="text-sm">Performance: {rating}</span>
          </div>
        </div>

        {/* Statistics */}
        <div className="mb-4">
          <p className="text-sm">
            <strong>Incorrect Answers:</strong> {incorrectAnswersCount}
          </p>
        </div>

        <div className="mt-4">
          <p className="text-sm">
            Great job! Keep practicing to improve your performance.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
