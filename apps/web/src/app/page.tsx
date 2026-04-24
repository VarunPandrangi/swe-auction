export default function Home() {
  return (
    <main className="page-shell">
      <section className="hero-card">
        <p className="eyebrow">Modular monolith scaffold</p>
        <h1>Online Auction System for Students</h1>
        <p className="lede">
          Foundation only. The runtime, workspace, and deployment skeleton are in place, but product
          features are still coming in later sprints.
        </p>
        <div className="status-grid">
          <div>
            <span>Frontend</span>
            <strong>Next.js 14</strong>
          </div>
          <div>
            <span>API</span>
            <strong>Express 4</strong>
          </div>
          <div>
            <span>Queue</span>
            <strong>Bull 4</strong>
          </div>
          <div>
            <span>Realtime</span>
            <strong>Socket.IO</strong>
          </div>
        </div>
      </section>
    </main>
  );
}
