import { Building } from 'lucide-react';

import Card from '../../components/common/Card';

const Employers = () => (
  <main className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-8 bg-gray-50">
    <Card className="w-full max-w-2xl mx-auto" title="Employers" aria-label="Employers section">
      <div className="flex flex-col items-center gap-4">
        <Building className="text-lightblue" size={48} aria-hidden="true" />
        <p className="text-gray-600 text-lg text-center">
          This page will allow admins to view and manage all registered employers.<br />
          (Feature coming soon)
        </p>
      </div>
    </Card>
  </main>
);

export default Employers;
