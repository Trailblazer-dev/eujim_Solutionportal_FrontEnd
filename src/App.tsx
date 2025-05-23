import { Link } from 'react-router-dom';
import Button from './components/common/Button';
import Card from './components/common/Card';

function App() {
  return (
    <div className="min-h-screen bg-softgray p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-center text-navyblue">
          EUJIM Solution Portal
        </h1>
        <p className="text-center text-gray-600 mt-2">
          Graduate Engagement Platform
        </p>
      </header>

      <div className="max-w-4xl mx-auto">
        <Card className="text-center p-8">
          <h2 className="text-2xl font-bold mb-6">Welcome to the Platform</h2>
          <p className="mb-8 text-gray-600">
            Please select your user type below to access the platform:
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/graduate">
              <Button size="lg">
                Graduate Dashboard
              </Button>
            </Link>
            <Link to="/graduate/register">
              <Button variant="outline" size="lg">
                Graduate Registration
              </Button>
            </Link>
            <Link to="/graduate/profile">
              <Button variant="secondary" size="lg">
                Graduate Profile
              </Button>
            </Link>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold mb-4">Quick Access</h3>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/graduate/education" className="text-lightblue hover:underline">
                Education
              </Link>
              <Link to="/graduate/certificates" className="text-lightblue hover:underline">
                Certificates
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default App;
