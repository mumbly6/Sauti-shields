import './index.css'; // This must be the first line
import { useState } from 'react';
import ReportForm from './components/ReportForm';
import ThreatsDashboard from './components/ThreatsDashboard';
import SMSReportInfo from './components/SMSReportInfo';
import NetworkGraph from './components/NetworkGraph';
import ThreatsLog from './components/ThreatsLog';

const mockThreats = [
  { id: 1, title: 'Incitement post on social media', severity: 'High', category: 'Incitement', timestamp: '2024-01-01T10:00:00Z' },
  { id: 2, title: 'Phishing attempt via email', severity: 'Medium', category: 'Scam', timestamp: '2024-01-01T11:30:00Z' },
  { id: 3, title: 'Hate speech detected in forum', severity: 'Critical', category: 'Hate Speech', timestamp: '2024-01-01T14:15:00Z' },
  { id: 4, title: 'Fake news propagation', severity: 'High', category: 'Incitement', timestamp: '2024-01-02T09:00:00Z' },
  { id: 5, title: 'Online fraud advertisement', severity: 'Medium', category: 'Scam', timestamp: '2024-01-02T13:45:00Z' },
];

export default function App() {
  const [currentPage, setCurrentPage] = useState('report'); // Starting on report
  const [dashboardView, setDashboardView] = useState('stats');

  return (
    <div className="min-h-screen bg-gray-100">
      <header>
        <nav className="bg-blue-600 w-full shadow-lg text-white">
          <div className="flex justify-between items-center px-8 py-4">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <span>🛡️</span> SautiShield
            </h1>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setCurrentPage('report')}
                className={`px-4 py-2 rounded-lg font-medium transition ${currentPage === 'report' ? 'bg-white text-blue-600 shadow' : 'text-white hover:bg-blue-500'}`}
              >
                Report Threat
              </button>
              <button
                onClick={() => setCurrentPage('dashboard')}
                className={`px-4 py-2 rounded-lg font-medium transition ${currentPage === 'dashboard' ? 'bg-white text-blue-600 shadow' : 'text-white hover:bg-blue-500'}`}
              >
                Analyst Dashboard
              </button>
            </div>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4">
        {currentPage === 'report' ? (
          <div className="bg-white p-6 rounded-xl shadow-md border">
            <SMSReportInfo />
            <ReportForm />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex gap-4 border-b pb-4">
               <button onClick={() => setDashboardView('stats')} className={`px-4 py-2 ${dashboardView === 'stats' ? 'border-b-2 border-blue-600 font-bold' : ''}`}>Threat Statistics</button>
               <button onClick={() => setDashboardView('network')} className={`px-4 py-2 ${dashboardView === 'network' ? 'border-b-2 border-blue-600 font-bold' : ''}`}>Network Graph</button>
            </div>
            {dashboardView === 'stats' ? (
              <ThreatsDashboard initialThreatsData={mockThreats} />
            ) : (
              <>
                <NetworkGraph data={mockThreats} />
                <div className="mt-10">
                  <h3 className="text-2xl font-bold mb-4">Connection Details</h3>
                  <ThreatsLog threats={mockThreats} />
                </div>
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
}