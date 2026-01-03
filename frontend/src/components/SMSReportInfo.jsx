export default function SMSReportInfo() {
    return (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mb-6">
            <h3 className="font-bold mb-2 text-blue-800 text-lg">📱 Report via SMS</h3>
            <p className="text-sm mb-3 text-blue-900">
                If you prefer, you can also send a threat report directly via SMS:
            </p>
            <div className="bg-white p-3 rounded font-mono text-sm border border-blue-200">
                Text to: <strong className="text-blue-700">9000</strong> (in Kenya)
                <br />
                Message: Describe the threat
            </div>
            <p className="text-xs text-gray-600 mt-3 italic">
                Your report will be received and analyzed by our team.
            </p>
        </div>
    );
}