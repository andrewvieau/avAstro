import { useState } from 'preact/hooks';

export default function Greeting({messages}) {

  const randomMessage = () => messages[(Math.floor(Math.random() * messages.length))];

  const [greeting, setGreeting] = useState(messages[0]);

  return (
    <div class="mb-6 mt-6">
      <h3 class="mt-6 text-2xl">{greeting}! Thank you for visiting!</h3>

      <button onClick={() => setGreeting(randomMessage())} class="bg-white mt-6 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
        New Greeting
      </button>
    </div>
  );
}