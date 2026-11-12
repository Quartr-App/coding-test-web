import Dashboard from "./components/Dashboard";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="py-4">
        <h1 className="title">Quartr</h1>
      </div>
      <Dashboard />
    </main>
  );
}
