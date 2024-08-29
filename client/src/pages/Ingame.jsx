import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import axios from "axios";
import classNames from "classnames";
import toast from "react-hot-toast";
import he from "he";
import { FaArrowRotateLeft } from "react-icons/fa6";
import { BsQuestionCircleFill } from "react-icons/bs";
import { FaForward } from "react-icons/fa";
import { ImHome } from "react-icons/im";
import { IoPlay } from "react-icons/io5";
import sports from "../assets/sports.png";
import mythology from "../assets/mythology.png";
import scienceNature from "../assets/scienceNature.png";
import art from "../assets/art.png";
import animal from "../assets/animal.png";
import history from "../assets/history.png";
import geography from "../assets/geography.png";
import generalKnowledge from "../assets/generalKnowledge.png";
import computer from "../assets/computer.png";
import math from "../assets/math.png";
import film from "../assets/film.png";
import books from "../assets/books.png";
import music from "../assets/music.png";
import videoGame from "../assets/videoGame.png";
import animeManga from "../assets/animeManga.png";
import gadget from "../assets/gadget.png";
import Header from "../components/Header";
import { userRoute } from "../utils/APIRoutes";
import { useUserContext } from "../contexts/UserContextProvider";
import SubHeaderButton from "../components/SubHeaderButton";
import Confetti from "react-confetti-boom";

function decodeHtmlEntities(text) {
  return he.decode(text);
}

function Ingame() {
  const { user, updateStats } = useUserContext();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryCode = queryParams.get("category");

  const getCategoryInfo = () => {
    switch (categoryCode) {
      case "9":
        return {
          name: "general knowledge",
          image: generalKnowledge,
          desc: "Explore a broad spectrum of topics, testing your understanding of the world with questions that cover various subjects.",
        };
      case "17":
        return {
          name: "science & nature",
          image: scienceNature,
          desc: "Dive into the wonders of the natural world and scientific discoveries, from the microscopic to the cosmic",
        };
      case "25":
        return {
          name: "art & creativity",
          image: art,
          desc: "Celebrate human expression through art, literature, and creativity, with questions that inspire and challenge your imagination.",
        };
      case "23":
        return {
          name: "history",
          image: history,
          desc: "Travel back in time and test your knowledge of key events, figures, and moments that have shaped our world.",
        };
      case "27":
        return {
          name: "animal world",
          image: animal,
          desc: "Uncover fascinating facts about the animal kingdom, from the exotic to the everyday, and everything in between.",
        };
      case "22":
        return {
          name: "geography",
          image: geography,
          desc: "Put your knowledge of the world's landscapes, countries, and cultures to the test with questions on global geography.",
        };
      case "21":
        return {
          name: "sports",
          image: sports,
          desc: "Challenge yourself with questions on the world of sports, from iconic events to legendary athletes.",
        };
      case "20":
        return {
          name: "mythology",
          image: mythology,
          desc: "Explore the myths and legends that have influenced cultures throughout history, delving into stories of gods, heroes, and mythical creatures.",
        };
      case "18":
        return {
          name: "computer science",
          image: computer,
          desc: "Explore the fundamentals of computing, including algorithms, data structures, and the latest advancements in technology and software development.",
        };
      case "19":
        return {
          name: "mathematics",
          image: math,
          desc: "Dive into mathematical concepts ranging from basic arithmetic to advanced theories, including problem-solving techniques and real-world applications.",
        };
      case "11":
        return {
          name: "film",
          image: film,
          desc: "Discover the world of cinema, including iconic movies, influential directors, and the evolution of film techniques and storytelling.",
        };
      case "10":
        return {
          name: "books",
          image: books,
          desc: "Explore a wide range of literary works, including classic novels, influential authors, and various genres and literary movements.",
        };
      case "12":
        return {
          name: "music",
          image: music,
          desc: "Learn about different musical genres, influential artists, and key milestones in the history of music, from classical to contemporary.",
        };
      case "15":
        return {
          name: "video game",
          image: videoGame,
          desc: "Explore the world of video games, including popular titles, influential developers, and significant trends and innovations in the gaming industry.",
        };
      case "31":
        return {
          name: "anime & manga",
          image: animeManga,
          desc: "Discover the rich world of anime and manga, including popular series, characters, and the cultural impact of these forms of entertainment.",
        };
      case "30":
        return {
          name: "gadgets",
          image: gadget,
          desc: "Learn about cutting-edge gadgets and consumer electronics, including the latest innovations, tech trends, and how these devices shape our lives.",
        };
      default:
        return {
          name: "general knowledge",
          image: generalKnowledge,
          desc: "Explore a broad spectrum of topics, testing your understanding of the world with questions that cover various subjects.",
        };
    }
  };

  const quizInfo = getCategoryInfo();

  const [numQuestion, setNumQuestion] = useState(10);

  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [timer, setTimer] = useState(10);
  const timerRef = useRef(null);

  const [fetchedQuestions, setFetchedQuestions] = useState({});
  const [pageQuestion, setPageQuestion] = useState(0);

  const [playerAnswer, setPlayerAnswer] = useState(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);

  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [inccorrectAnswers, setIncorrectAnswers] = useState(0);
  const [timeConsumed, setTimeConsumed] = useState(0);

  const [isResultModalOpen, setIsResultModalOpen] = useState(false);

  const handleChangeNumQuestion = (e) => {
    setNumQuestion(Number(e.target.value));
  };

  const handleGenerateQuestion = async () => {
    // start the game
    setIsQuizStarted(true);

    try {
      const response = await axios.post(
        `https://opentdb.com/api.php?amount=${numQuestion}&category=${categoryCode}`
      );

      // create a copy to modity
      let dataArray = [...response.data.results];

      for (let i = 0; i < dataArray.length; i++) {
        // generate random number that ranges base to incorrect_answer(3), so we need to + 1 to make it 4
        const ranNum = Math.floor(
          Math.random() * (dataArray[i].incorrect_answers.length + 1)
        );

        // put the correct_answer to incorrect_answers array using splice()
        const correctAnswer = dataArray[i].correct_answer;
        dataArray[i].incorrect_answers.splice(ranNum, 0, correctAnswer);
      }

      setFetchedQuestions(dataArray);
    } catch (error) {
      toast.error(error.message || "Network Error");
      setIsQuizStarted(false);
      console.log(error);
    }
  };

  const handleOpenResultModal = async () => {
    // if last question
    if (pageQuestion === fetchedQuestions.length - 1) {
      setTimeout(() => {
        setIsResultModalOpen(true);
      }, 1000);

      try {
        await updateStats({
          total_questionTaken: numQuestion,
          total_correctAnswers: correctAnswers,
          total_incorrectAnswers: inccorrectAnswers,
          exp: handleTotalExp(),
          total_consumedTime: timeConsumed,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  // validating answer
  const handleSelectAnswer = (answer) => {
    if (isAnswerCorrect !== null) return;

    setQuestionsAnswered((prev) => prev + 1);
    setPlayerAnswer(answer);

    // Automatically validate and show if the answer is correct or not
    if (fetchedQuestions[pageQuestion].correct_answer === answer) {
      setIsAnswerCorrect(true);
      setCorrectAnswers((prev) => prev + 1);
    } else {
      setIsAnswerCorrect(false);
      setIncorrectAnswers((prev) => prev + 1);
    }
    // get the consumed time of answering
    const consumedTime = 10 - timer;
    setTimeConsumed((prev) => prev + consumedTime);

    // Stop the timer when an answer is selected
    clearInterval(timerRef.current);

    // calle the function for opening the result modal
    handleOpenResultModal();
  };

  // next page
  const handleNextPage = async () => {
    if (pageQuestion === fetchedQuestions.length - 1) {
      handleOpenResultModal();
      clearInterval(timerRef.current);

      return;
    }

    setPageQuestion((prev) => prev + 1);
    setTimer(10);

    // reset answer
    setPlayerAnswer(null);
    setIsAnswerCorrect(null);
  };

  // restart game / reset all
  const handleRestartGame = () => {
    setIsQuizStarted(false);

    setTimer(10);
    setFetchedQuestions([]);
    setPageQuestion(0);
    setPlayerAnswer(null);
    setIsAnswerCorrect(null);

    setQuestionsAnswered(0);
    setCorrectAnswers(0);
    setIncorrectAnswers(0);
    setTimeConsumed(0);

    setIsResultModalOpen(false);
  };

  const handleTotalExp = () => {
    const accuracyDecimal = (accuracy) => {
      if (accuracy >= 80) return 0.2; // 20% bonus
      if (accuracy >= 60) return 0.1; // 10% bonus
      return 0; // No bonus
    };

    const avtTimeDecimal = (time) => {
      if (time <= 3) return 0.15; // 15% bonus
      if (time <= 5) return 0.1; // 10% bonus
      return 0; // No bonus
    };

    const accuracy = (correctAnswers / fetchedQuestions.length) * 100;
    const avgTime = timeConsumed / fetchedQuestions.length;

    const baseExp = 50 * correctAnswers;
    const accuracyBonus = baseExp * accuracyDecimal(accuracy);
    const avgTimeBonus = baseExp * avtTimeDecimal(avgTime);

    const totalExp = baseExp + accuracyBonus + avgTimeBonus;

    return totalExp;
  };

  // timer
  useEffect(() => {
    if (isQuizStarted && fetchedQuestions.length > 0) {
      timerRef.current = setInterval(() => {
        setTimer((prev) => {
          if (prev === 0) {
            clearInterval(timerRef.current);

            console.log("10 secs consumed added");
            setTimeConsumed((prev) => prev + 10);

            handleNextPage();
            return prev;
          }
          return prev - 0.25; // or 1
        });
      }, 250); // or 1000

      return () => clearInterval(timerRef.current);
    }
  }, [isQuizStarted, pageQuestion, fetchedQuestions]);

  return (
    <>
      <Header />
      {isQuizStarted ? (
        <>
          {fetchedQuestions.length > 0 ? (
            <>
              <header className="flex items-center gap-4 p-4 py-2 mt-6 text-white bg-orange-400 rounded-lg">
                <div
                  onClick={() => navigate("/")}
                  className="p-2 transition-all rounded-full cursor-pointer hover:bg-black/5 active:scale-95">
                  <IoMdArrowRoundBack className="text-lg" />
                </div>
                <h1 className="text-xl font-semibold capitalize">
                  {quizInfo.name}
                </h1>
              </header>

              <div className="flex items-center justify-between mt-6 font-semibold text-green-800">
                <div className="flex items-center gap-2 ">
                  <BsQuestionCircleFill />
                  <p>Question: {pageQuestion + 1}</p>
                  <p className="font-normal capitalize">
                    ({fetchedQuestions[pageQuestion].difficulty})
                  </p>
                </div>
              </div>

              <h1 className="mt-2 font-semibold">
                {decodeHtmlEntities(fetchedQuestions[pageQuestion].question)}
              </h1>

              {/* countdown word timer */}
              {/* <div className="mt-4">
                <div className="mt-2 text-center">
                  <p className="text-lg font-semibold">
                    Time Remaining: {timer} seconds
                  </p>
                </div>
              </div> */}

              {/* countdown bar timer */}
              <div className="relative h-2 mt-4 rounded-full bg-green-800/10">
                <div
                  className="h-full transition-all duration-300 bg-green-800 rounded-full"
                  style={{ width: `${timer * 10}%` }}></div>
              </div>

              <div className="grid gap-4 mt-6 sm:grid-cols-2">
                {fetchedQuestions[pageQuestion].incorrect_answers.map(
                  (answer, index) => (
                    <div
                      key={index}
                      onClick={() => handleSelectAnswer(answer)}
                      className={classNames(
                        "px-4 py-4 transition-all rounded-lg text-start active:scale-95 cursor-pointer ring-offset-2",
                        {
                          // Default orange background
                          "bg-orange-500/30":
                            isAnswerCorrect === null ||
                            (isAnswerCorrect !== null &&
                              answer !==
                                fetchedQuestions[pageQuestion].correct_answer &&
                              playerAnswer !== answer),

                          // Highlight selected answer with orange ring
                          "ring-2 ring-orange-500":
                            answer === playerAnswer && isAnswerCorrect === null,

                          // Change to green if the answer is correct
                          "bg-green-500/30 ring-2 ring-green-500 text-green-800":
                            isAnswerCorrect && playerAnswer === answer,

                          // Change to red if the answer is incorrect
                          "bg-red-500/30 ring-2 ring-red-500 text-red-800":
                            isAnswerCorrect === false &&
                            playerAnswer === answer,

                          // Highlight the correct answer after an incorrect selection
                          "bg-green-500/30 text-green-800":
                            isAnswerCorrect === false &&
                            answer ===
                              fetchedQuestions[pageQuestion].correct_answer,
                        }
                      )}>
                      {decodeHtmlEntities(answer)}
                    </div>
                  )
                )}
              </div>

              {pageQuestion < fetchedQuestions.length - 1 && (
                <div
                  className={classNames(
                    "flex justify-center transition-all overflow-hidden items-start   mt-6 ",
                    {
                      "h-20": playerAnswer,
                      "h-0": !playerAnswer,
                    }
                  )}>
                  <button
                    onClick={handleNextPage}
                    className="flex items-center justify-center gap-2 p-3 px-8 font-semibold text-white transition-all bg-green-500 rounded-lg shadow active:scale-95">
                    <FaForward className="text-lg" />
                    Next Question
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="flex items-center justify-center h-1/2">
              <div className="flex items-center gap-2 text-lg text-orange-800/60">
                <span className="loading loading-spinner loading-md"></span>
                <p>Fetching Questions.</p>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="mt-10">
            <SubHeaderButton>{quizInfo.name}</SubHeaderButton>
          </div>

          <div className="flex items-start gap-4 mt-6">
            <img
              src={quizInfo.image}
              alt="Placeholder"
              className="p-2 w-28 sm:w-40 bg-green-500/10 rounded-3xl"
            />
            <p>{quizInfo.desc}</p>
          </div>

          <div className="items-center pt-6 mt-10 border-t sm:flex border-orange-800/30">
            <h5 className="text-sm font-semibold">Number of Questions: </h5>
            <div className="flex flex-wrap items-center gap-6">
              <label htmlFor="10" className="flex items-center gap-3 ml-6">
                <input
                  type="checkbox"
                  id="10"
                  value={10}
                  checked={numQuestion === 10}
                  onChange={handleChangeNumQuestion}
                  className="w-3 bg-white rounded-full appearance-none aspect-square checked:bg-orange-500 checked:outline outline-1 outline-orange-800 ring-orange-800 ring-1 checked:ring-0 outline-offset-2"
                />
                10
              </label>
              <label htmlFor="15" className="flex items-center gap-3 ml-6">
                <input
                  type="checkbox"
                  id="15"
                  value={15}
                  checked={numQuestion === 15}
                  onChange={handleChangeNumQuestion}
                  className="w-3 bg-white rounded-full appearance-none aspect-square checked:bg-orange-500 checked:outline outline-1 outline-orange-800 ring-orange-800 ring-1 checked:ring-0 outline-offset-2"
                />
                15
              </label>

              <label htmlFor="20" className="flex items-center gap-3 ml-6">
                <input
                  type="checkbox"
                  id="20"
                  value={20}
                  checked={numQuestion === 20}
                  onChange={handleChangeNumQuestion}
                  className="w-3 bg-white rounded-full appearance-none aspect-square checked:bg-orange-500 checked:outline outline-1 outline-orange-800 ring-orange-800 ring-1 checked:ring-0 outline-offset-2"
                />
                20
              </label>
              <label htmlFor="25" className="flex items-center gap-3 ml-6">
                <input
                  type="checkbox"
                  id="25"
                  value={25}
                  checked={numQuestion === 25}
                  onChange={handleChangeNumQuestion}
                  className="w-3 bg-white rounded-full appearance-none aspect-square checked:bg-orange-500 checked:outline outline-1 outline-orange-800 ring-orange-800 ring-1 checked:ring-0 outline-offset-2"
                />
                25
              </label>
              <label htmlFor="30" className="flex items-center gap-3 ml-6">
                <input
                  type="checkbox"
                  id="30"
                  value={30}
                  checked={numQuestion === 30}
                  onChange={handleChangeNumQuestion}
                  className="w-3 bg-white rounded-full appearance-none aspect-square checked:bg-orange-500 checked:outline outline-1 outline-orange-800 ring-orange-800 ring-1 checked:ring-0 outline-offset-2"
                />
                30
              </label>
            </div>
          </div>

          <div className="mt-6 text-sm ">
            <h5 className="font-semibold ">Mechanics and Guidelines: </h5>
            Each question is randomly generated with varying difficulty levels
            and can be either multiple choice or true/false, making the quiz
            both challenging and diverse.
          </div>

          <div className="flex justify-center mt-6">
            <button
              onClick={handleGenerateQuestion}
              className="flex items-center justify-center gap-2 p-3 px-8 font-semibold text-white transition-all bg-green-500 rounded-lg shadow active:scale-95">
              <IoPlay className="text-lg" />
              Start Quiz
            </button>
          </div>
        </>
      )}

      {/* modal */}
      {isResultModalOpen && (
        <>
          {/* backdrop */}
          <div className="absolute inset-0 z-10 flex items-center justify-center animate-opacityShow bg-black/20 backdrop-blur-sm"></div>

          {/* modal div */}
          <div className="absolute inset-0 z-20 flex items-center justify-center overflow-hidden">
            <div className="z-50 ">
              <Confetti
                mode="boom"
                particleCount={150}
                shapeSize={12}
                deg={90}
                effectCount={1}
                spreadDeg={100}
                x={0.5}
                y={0.06}
                launchSpeed={1.6}
                colors={["#ff577f", "#ff884b"]}
              />
            </div>

            <div className="p-4 rounded-xl shadow animate-modalShow bg-orange-50 max-w-[30rem] w-full mx-4">
              <header className="mt-2 ">
                <h1 className="text-xl font-bold text-center text-green-800 ">
                  Result Statistics
                </h1>
              </header>

              <p className="text-center capitalize text-green-800/60 underline-offset-2">
                {quizInfo.name}
              </p>

              <div className="py-4 mt-4 text-green-800 border rounded-lg bg-green-500/5 border-orange-800/30">
                <section className="relative flex justify-between px-4 hover:bg-white/60 group">
                  <p>Total Questions</p>
                  <p className="absolute p-2 hidden group-hover:block text-xs shadow-md backdrop-blur-sm outline outline-1 outline-green-800/30 bg-white/50 rounded-lg bottom-6 w-[12rem]">
                    The total number of questions available in the quiz.
                  </p>
                  <p>{fetchedQuestions.length}</p>
                </section>

                <section className="relative flex justify-between px-4 hover:bg-white/60 group">
                  <p>Correct Answers</p>

                  <p className="absolute hidden p-2 text-xs w-[12rem] rounded-lg shadow-md group-hover:block backdrop-blur-sm outline outline-1 outline-green-800/30 bg-white/50 bottom-6">
                    The number of questions you answered correctly.
                  </p>
                  <p>{correctAnswers}</p>
                </section>

                <section className="relative flex justify-between px-4 hover:bg-white/60 group">
                  <p>Incorrect Answers</p>

                  <p className="absolute p-2 hidden group-hover:block text-xs shadow-md backdrop-blur-sm outline outline-1 outline-green-800/30 bg-white/50 rounded-lg bottom-6 w-[12rem]">
                    The number of questions you answered incorrectly.
                  </p>
                  <p>{inccorrectAnswers}</p>
                </section>

                <section className="relative flex justify-between px-4 hover:bg-white/60 group">
                  <p>Overall Accuracy</p>

                  <p className="absolute p-2 hidden group-hover:block text-xs shadow-md backdrop-blur-sm outline outline-1 outline-green-800/30 bg-white/50 rounded-lg bottom-6 w-[12rem]">
                    The percentage of correct answers from all the questions.
                  </p>
                  <p>
                    {((correctAnswers / fetchedQuestions.length) * 100).toFixed(
                      2
                    )}
                    %
                  </p>
                </section>

                <section className="relative flex justify-between px-4 hover:bg-white/60 group">
                  <p>Average Time</p>

                  <p className="absolute p-2 hidden group-hover:block text-xs shadow-md backdrop-blur-sm outline outline-1 outline-green-800/30 bg-white/50 rounded-lg bottom-6 w-[12rem]">
                    The average time you consumed per question.
                  </p>
                  <p>{(timeConsumed / fetchedQuestions.length).toFixed(2)}s </p>
                </section>

                <div className="mx-4 my-2 border-t border-green-800/30"></div>

                <section className="relative flex justify-between px-4 hover:bg-white/60 group">
                  <p>Total Exp Points</p>

                  <p className="absolute p-2 hidden group-hover:block text-xs shadow-md backdrop-blur-sm outline outline-1 outline-green-800/30 bg-white/50 rounded-lg bottom-6 w-[12rem]">
                    You earn 50 points per correct answer, plus bonuses based on
                    your accuracy and speed. Higher accuracy and faster answers
                    means more points!
                  </p>
                  <p className="px-2 text-lg font-bold text-orange-500 rounded-lg">
                    {handleTotalExp()}
                  </p>
                </section>
              </div>

              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => navigate("/")}
                  className="flex items-center justify-center flex-1 gap-2 p-3 px-8 font-semibold text-white transition-all bg-green-500 rounded-lg shadow active:scale-95">
                  <ImHome className="text-lg" />
                  Home
                </button>
                <button
                  onClick={handleRestartGame}
                  className="flex items-center justify-center flex-1 gap-2 p-3 px-8 font-semibold text-white transition-all bg-orange-500 rounded-lg shadow active:scale-95">
                  <FaArrowRotateLeft className="text-lg" />
                  Restart
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Ingame;
