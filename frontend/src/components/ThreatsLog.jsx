import React from 'react';

const SEVERITY_COLORS = {
  'Low': '#34D399',
  'Medium': '#FBBF24',
  'High': '#F87171',
  'Critical': '#DC2626',
};

export default function ThreatsLog({ threats }) {
  if (!threats || threats.length === 0) {
    return <p className="text-gray-500">No threat data to display.</p>;
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Threats Log</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3">Title</th>
              <th className="p-3">Severity</th>
              <th className="p-3">Category</th>
              <th className="p-3">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {threats.map(threat => (
              <tr key={threat.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{threat.title}</td>
                <td className="p-3">
                  <span style={{ color: SEVERITY_COLORS[threat.severity] }} className="font-bold">
                    {threat.severity}
                  </span>
                </td>
                <td className="p-3">{threat.category}</td>
                <td className="p-3">{new Date(threat.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
