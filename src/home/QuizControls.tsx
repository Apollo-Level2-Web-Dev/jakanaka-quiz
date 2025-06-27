import { Button } from "@/components/ui/button";
import { nextQuestion, previousQuestion } from "@/redux/features/quizSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

export default function QuizControls() {
  const { questions, currentQuestionIndex, userAnswer } = useAppSelector(
    (state) => state.quiz
  );
  const dispatch = useAppDispatch();
  const isAnswerSelected = userAnswer[currentQuestionIndex] !== null;
  const handleNext = () => {
    if (isAnswerSelected) {
      dispatch(nextQuestion());
    }
  };
  const handlePrev = () => {
    dispatch(previousQuestion());
  };
  return (
    <div className="flex justify-between mt-4 space-x-4">
      <Button onClick={handlePrev}>previous</Button>
      <Button onClick={handleNext}>next</Button>
    </div>
  );
}
