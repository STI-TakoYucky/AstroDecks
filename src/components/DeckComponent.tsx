import { useAppSelector } from "@/hooks/reduxHooks";
import type { DeckInterface } from "@/types";
import { useNavigate } from "react-router-dom";

export default function DeckComponent({data}: {data:DeckInterface}) {
 const user = useAppSelector(state => state.user)
 const navigate = useNavigate()
  return (
    <div onClick={() => navigate(`/${data._id}`)} className="hover:translate-y-2 cursor-pointer hover:bg-slate-50 transition-all duration-200 bg-white rounded-md overflow-hidden min-h-[10rem] shadow-sm relative">
      <div className="px-5 py-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="max-w-4 max-h-4">
            <img  className="rounded-full" src={user.imageUrl.toString()}></img>
          </div>
          <h2 className="text-sm truncate">{user.username}</h2>
        </div>
        <h1 className="line-clamp-2 w-full font-semibold text-lg mb-5">
          {data.title}
        </h1>
      </div>
      <div className="bg-blue-200 w-full h-7 bottom-0 absolute"></div>
    </div>
  );
}
