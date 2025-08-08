import { useCounterStore } from './store';

function App() {
  const { count, increment, decrement, reset } = useCounterStore();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Board Game Alias
        </h1>
        <div className="text-center">
          <div className="text-6xl font-bold text-blue-600 mb-6">{count}</div>
          <div className="space-x-4">
            <button
              onClick={decrement}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              -
            </button>
            <button
              onClick={increment}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              +
            </button>
            <button
              onClick={reset}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
