import ObjectList from "@/components/ObjectList";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <header className="border-b bg-white dark:bg-zinc-900 px-6 py-4">
        <h1 className="text-2xl font-bold tracking-tight"> ObjetApp</h1>
      </header>
      <main className="max-w-6xl mx-auto px-6 py-10">
        <ObjectList />
      </main>
    </div>
  );
}