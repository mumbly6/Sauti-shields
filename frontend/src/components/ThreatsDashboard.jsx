import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

// Mock initial data
const initialThreats = [
  { id: 1, title: 'Suspicious Login', severity: 'High', category: 'Auth', timestamp: '2023-10-27T10:00:00Z' },
  { id: 2, title: 'SQL Injection Attempt', severity: 'Critical', category: 'Database', timestamp: '2023-10-27T10:05:00Z' },
  { id: 3, title: 'Brute Force Attack', severity: 'High', category: 'Auth', timestamp: '2023-10-27T10:10:00Z' },
  { id: 4, title: 'XSS Detected', severity: 'Medium', category: 'Frontend', timestamp: '2023-10-27T10:15:00Z' },
  { id: 5, title: 'Anomalous Data Access', severity: 'Medium', category: 'Database', timestamp: '2023-10-27T10:20:00Z' },
];

import ThreatsLog from './ThreatsLog';

const ThreatsDashboard = ({ initialThreatsData }) => {
  const [threats, setThreats] = useState(initialThreatsData || []);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Use a separate effect to set initial threats if prop changes
  useEffect(() => {
    if (initialThreatsData) {
      setThreats(initialThreatsData);
    }
  }, [initialThreatsData]);

  const fetchThreats = async () => {
    setLoading(true);
    const apiUrl = import.meta.env.VITE_API_URL;

    if (!apiUrl) {
      // If no API URL, rely on the initialThreatsData or internal mock
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${apiUrl}/api/threats`);
      setThreats(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch threats from API. Displaying initial/mock data.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on initial render and then every 10 seconds
  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    if (apiUrl) {
      fetchThreats(); // Initial API fetch
      const interval = setInterval(() => {
        fetchThreats();
      }, 10000);
      return () => clearInterval(interval);
    }
  }, []);

  const filteredThreats = useMemo(() => {
    return threats.filter(threat =>
      threat.title.toLowerCase().includes(filter.toLowerCase()) ||
      threat.severity.toLowerCase().includes(filter.toLowerCase()) ||
      threat.category.toLowerCase().includes(filter.toLowerCase())
    );
  }, [threats, filter]);

  const severityDistribution = useMemo(() => {
    const counts = filteredThreats.reduce((acc, threat) => {
      acc[threat.severity] = (acc[threat.severity] || 0) + 1;
      return acc;
    }, {});
    return Object.keys(counts).map(key => ({ name: key, value: counts[key] }));
  }, [filteredThreats]);

  const threatsOverTime = useMemo(() => {
    return filteredThreats.map(threat => ({
        time: new Date(threat.timestamp).toLocaleTimeString(),
        count: 1,
    })).sort((a, b) => new Date(a.time) - new Date(b.time));
  }, [filteredThreats]);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Threat Statistics</h1>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Filter by title, severity, or category..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full p-3 border rounded-lg shadow-sm"
        />
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Threats by Severity</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={severityDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                {/* Re-add severity colors here as they are needed for the chart */}
                <Cell fill="#34D399" />
                <Cell fill="#FBBF24" />
                <Cell fill="#F87171" />
                <Cell fill="#DC2626" />
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Threats Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={threatsOverTime}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" name="Threats" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <ThreatsLog threats={filteredThreats} />

    </div>
  );
};

export default ThreatsDashboard;
