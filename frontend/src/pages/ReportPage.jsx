import React from 'react';
import ReportForm from '../components/ReportForm';
import SMSReportInfo from '../components/SMSReportInfo';

const ReportPage = () => {
  return (
    <div className="container mx-auto p-4 grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2">
        <ReportForm />
      </div>
      <div>
        <SMSReportInfo />
      </div>
    </div>
  );
};

export default ReportPage;
