import { useAppSelector } from "@/hooks/reduxHooks";
import type { DeckInterface } from "@/types";
import axios from "axios";
import { Rocket } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Deck({ deck }: { deck: DeckInterface }) {
  const user = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const [userImage, setUserImage] = useState<string>("");
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    if (deck.authorID === user._id) {
      setUserImage(user.imageUrl);
      setUsername(user.username);
    } else {
      const fetchAuthor = async () => {
        try {
          const { data } = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/users/${deck.authorID}`
          );
          setUserImage(data.imageUrl);
          setUsername(data.username);
        } catch (error: any) {
          console.error(error.response.data.message);
        }
      };

      fetchAuthor();
    }
  }, []);

  const deckOnClickHandler = () => {
      navigate(`/deck/${deck._id}`)
  }

  return (
    <div
      onClick={deckOnClickHandler}
      className="hover:translate-y-2 cursor-pointer hover:bg-slate-50 transition-all duration-200 bg-white dark:bg-foreground rounded-md overflow-hidden min-h-[10rem] shadow-lg dark:shadow-sm relative"
    >
      <div className="px-5 py-4">
        <div className="flex items-center gap-2 mb-3 justify-between">
          <div className="flex gap-2 items-center">
             <div className="max-w-4 max-h-4">
              { userImage? (
                <img className="rounded-full" src={userImage.toString()}></img>
              ): (
                <div className="w-full h-full bg-primary"></div>
              )}
            </div>
            <h2 className="text-sm truncate text-black-200">{username}</h2>
          </div>
          <div className="dark:text-background text-foreground flex items-center">
            <Rocket size={15} />
            <p className="font-semibold px-1">{deck.cards.length}</p>
          </div>
        </div>
        <h1 className="line-clamp-2 w-full font-semibold text-base md:text-lg mb-5 text-black-200">
          {deck.title}
        </h1>
      </div>
      <div className="bg-primary w-full h-4 bottom-0 absolute flex items-center"></div>
    </div>
  );
}
