import React, { useState } from 'react';
import ThreatsDashboard from '../components/ThreatsDashboard';
import NetworkGraph from '../components/NetworkGraph';

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('analytics'); // 'analytics' or 'network'

  const TabButton = ({ tab, label }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`px-4 py-2 text-sm font-medium rounded-md ${
        activeTab === tab
          ? 'bg-blue-600 text-white'
          : 'text-gray-600 hover:bg-gray-200'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="p-4 sm:p-6">
      <div className="flex space-x-2 border-b-2 border-gray-200 mb-6">
        <TabButton tab="analytics" label="📊 Analytics Dashboard" />
        <TabButton tab="network" label="🕸️ Network Graph" />
      </div>

      <div>
        {activeTab === 'analytics' ? <ThreatsDashboard /> : <NetworkGraph />}
      </div>
    </div>
  );
};

export default DashboardPage;
