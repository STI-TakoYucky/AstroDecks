import type { DeckInterface } from "@/types";

export default function CardDeckComponent({data, index}: {data:DeckInterface, index: number}) {

  return (
    <div key={index} className="hover:translate-y-2 cursor-pointer hover:bg-slate-50 transition-all duration-200 bg-white rounded-md overflow-hidden min-h-[10rem] shadow-sm relative">
      <div className="px-5 py-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-4 h-4 bg-blue-200 rounded-full"></div>
          <h2 className="text-sm">{data.author}</h2>
        </div>
        <h1 className="line-clamp-2 w-full font-semibold text-lg mb-5">
          {data.title}
        </h1>
      </div>
      <div className="bg-blue-200 w-full h-7 bottom-0 absolute"></div>
    </div>
  );
}
