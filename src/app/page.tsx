'use client';

export default function Home() {
  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Logging in...");
    const res = await fetch("/api/login", { method: "POST" });
    const data = await res.json();
    console.log(data.url);
    window.open(data.url, "_self")
  };

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold text-center sm:text-left">Log In</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-8 items-center sm:items-start">
          <div className="flex flex-col gap-4">
            <button type="submit" className="bg-blue-500 text-white rounded-md p-2 w-72 sm:w-96 hover:bg-blue-600 transition-colors">Log In</button>
          </div>
        </form>
      </main>
    </div>
  );
}
