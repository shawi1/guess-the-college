'use client';

export default function Home() {
  const addTestPlayer = async () => {
    await fetch('/api/test-db', { method: 'POST' });
    alert('Inserted test player!');
  };

  return (
    <main className="flex flex-col min-h-screen items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">What College He Went To?</h1>
      <button 
        onClick={addTestPlayer}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Insert Test Player
      </button>
    </main>
  );
}