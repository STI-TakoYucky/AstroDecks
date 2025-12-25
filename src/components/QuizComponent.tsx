import _ from "lodash";

export default function QuizComponent({question, index, length, choices, answer}: {question: string, choices: string[], answer: string, index: number, length: number}) {
  return (
    <div key={index} className="w-full max-w-2xl">
      {/* Question Counter */}
      <div className="text-sm text-gray-500 mb-2">Question {index + 1} of {length}</div>

      {/* Question */}
      <h2 className="text-2xl font-semibold text-center mb-8">
        {question}
      </h2>

      {/* Answer Options */}
      <div className="space-y-3">
        {/* <button className="w-full p-4 text-left border-2 border-gray-300 rounded-lg transition-all duration-200 font-medium hover:border-blue-500 hover:bg-blue-50 cursor-pointer">
          London
        </button>
        <button className="w-full p-4 text-left border-2 border-gray-300 rounded-lg transition-all duration-200 font-medium hover:border-blue-500 hover:bg-blue-50 cursor-pointer">
          Paris
        </button>
        <button className="w-full p-4 text-left border-2 border-gray-300 rounded-lg transition-all duration-200 font-medium hover:border-blue-500 hover:bg-blue-50 cursor-pointer">
          Berlin
        </button>
        <button className="w-full p-4 text-left border-2 border-gray-300 rounded-lg transition-all duration-200 font-medium hover:border-blue-500 hover:bg-blue-50 cursor-pointer">
          Madrid
        </button> */}

        {_.shuffle([...choices, answer]).map((choice, i) => (
          <button
            key={i}
            className="w-full p-4 text-left border-2 border-gray-300 rounded-lg transition-all duration-200 font-medium hover:border-blue-500 hover:bg-blue-50 cursor-pointer"
          >
            {choice}
          </button>
        ))}

      </div>
    </div>
  );
}
