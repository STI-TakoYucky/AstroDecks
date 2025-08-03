import { CircleCheck, MailWarning } from "lucide-react";

export function AlertComponent({
  message,
  type,
}: {
  message: string | null;
  type: string | null;
}) {
  return (
    <div className="fixed text-left z-50 bottom-[2rem] right-5 md:right-[3rem] bg-white shadow-md md:w-[15rem] h-[5rem] dark:text-black-200 flex-col rounded-md flex overflow-hidden">
      <div
        className={`w-full h-5 ${
          type === "success" ? "bg-green-300" : "bg-red-300"
        }`}
      ></div>
      <p className="text-dark font-semibold font-body-font p-4 flex gap-2 items-center">
        {type === "success" ? <CircleCheck size={25} /> : <MailWarning />}{" "}
        {message}
      </p>
    </div>
  );
}