import React, { useEffect } from "react";
import trophy from "../assets/trophy.png";
import badge from "../assets/badge.png";
import bulb from "../assets/bulb.png";
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
import CategoryButton from "../components/CategoryButton";
import UserAvatar from "../components/UserAvatar";
import Header from "../components/Header";
import { useUserContext } from "../contexts/UserContextProvider";
import { useNavigate } from "react-router-dom";

function Home() {
  const { user } = useUserContext();
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col h-full pb-4 ">
        <Header>
          <div className="block sm:hidden">
            <UserAvatar imageWidth={"3rem"} />
          </div>
        </Header>
        <section className="flex items-center justify-between mt-6 ">
          <div>
            <h1 className="text-3xl font-bold">👋 Hi {user.firstname},</h1>
            <p className="text-lg">
              {user.total_questionTaken > 0
                ? "Great to see you again!"
                : "Welcome to the game!"}
            </p>
          </div>

          <div className="hidden sm:block">
            <UserAvatar imageWidth={"5rem"} />
          </div>
        </section>

        <section className="flex mt-6 overflow-x-auto bg-orange-400 rounded-xl ">
          <div
            onClick={() => navigate("/profile")}
            className="flex items-center min-w-[10rem] min-[525px]:flex-1 justify-center flex-shrink-0 gap-2 py-4 cursor-pointer hover:bg-orange-500/30 transition-all">
            <img src={bulb} alt="icon" className="w-12" />
            <div>
              <h2 className="text-2xl font-semibold text-white text-nowrap">
                {user.total_questionTaken}
              </h2>
              <p className="-mt-2 text-white/80 text-nowrap">Qs Taken</p>
            </div>
          </div>

          <div className="my-3 border-l-2 border-orange-800/30"></div>

          <div
            onClick={() => navigate("/profile")}
            className="flex py-4 items-center min-w-[10rem] min-[525px]:flex-1 justify-center flex-shrink-0 gap-2 max-sm:px-2 cursor-pointer hover:bg-orange-500/30 transition-all">
            <img src={badge} alt="icon" className="w-12" />
            <div>
              <h2 className="text-2xl font-semibold text-white text-nowrap">
                {/* {Math.floor(user.exp)} */}
                {user.exp}
              </h2>
              <p className="-mt-2 text-white/80 text-nowrap">Exp. Points</p>
            </div>
          </div>

          <div className="my-3 border-r-2 border-orange-800/30"></div>

          <div
            onClick={() => navigate("/leaderboard")}
            className="flex items-center py-4 min-w-[10rem] min-[525px]:flex-1 justify-center flex-shrink-0 gap-2 cursor-pointer hover:bg-orange-500/30 transition-all">
            <img src={trophy} alt="icon" className="w-12" />
            <div>
              <h2 className="text-2xl font-semibold text-white text-nowrap">
                {user.total_questionTaken > 0 ? user.placement : "N/A"}
              </h2>
              <p className="-mt-2 text-white/80 text-nowrap">Ranking</p>
            </div>
          </div>
        </section>

        <h3 className="mt-6">Quiz Category</h3>

        <div className="relative flex-1 mt-2 overflow-y-auto ">
          <div className="absolute grid gap-4 sm:grid-cols-2">
            <CategoryButton
              title={"General Knowledge"}
              desciption={"Broad facts and diverse information."}
              icon={generalKnowledge}
              path={9}
            />

            <CategoryButton
              title={"Science & Nature"}
              desciption={"Scientific discoveries and natural phenomena."}
              icon={scienceNature}
              path={17}
            />

            <CategoryButton
              title={"Art & Creativity"}
              desciption={
                "Artistic creations, styles, and historical movements."
              }
              icon={art}
              path={25}
            />

            <CategoryButton
              title={"History"}
              desciption={"Significant events, eras, and influential figures."}
              icon={history}
              path={23}
            />

            <CategoryButton
              title={"Animal World"}
              desciption={
                "Diverse species, their behaviors, and natural habitats."
              }
              icon={animal}
              path={27}
            />

            <CategoryButton
              title={"Geography"}
              desciption={"Earth's landscapes, features, and global locations."}
              icon={geography}
              path={22}
            />

            <CategoryButton
              title={"Sports"}
              desciption={"Various sports and competitive games."}
              icon={sports}
              path={21}
            />

            <CategoryButton
              title={"Mythology"}
              desciption={"Legends, deities, and ancient stories."}
              icon={mythology}
              path={20}
            />

            <CategoryButton
              title={"Computer Science"}
              desciption={"Core concepts, algorithms, and tech innovations."}
              icon={computer}
              path={18}
            />

            <CategoryButton
              title={"Mathematics"}
              desciption={"Theories, equations, and problem-solving."}
              icon={math}
              path={19}
            />

            <CategoryButton
              title={"Film"}
              desciption={"Iconic movies, directors, and film history."}
              icon={film}
              path={11}
            />

            <CategoryButton
              title={"Books"}
              desciption={"Literary works, authors, and genres."}
              icon={books}
              path={10}
            />

            <CategoryButton
              title={"Music"}
              desciption={"Genres, artists, and musical history."}
              icon={music}
              path={12}
            />

            <CategoryButton
              title={"Video Game"}
              desciption={"Famous games, developers, and gaming culture."}
              icon={videoGame}
              path={15}
            />

            <CategoryButton
              title={"Anime & Manga"}
              desciption={"Series, characters, and cultural impact."}
              icon={animeManga}
              path={31}
            />

            <CategoryButton
              title={"Gadgets"}
              desciption={"Innovative devices and tech trends."}
              icon={gadget}
              path={30}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
