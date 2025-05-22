import { useState } from 'react';
import Button from './components/common/Button';
import Card from './components/common/Card';

function App() {  
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-center text-blue-600">
          EUJIM Solution Portal
        </h1>
        <p className="text-center text-gray-600 mt-2">
          Testing components with Tailwind CSS v4
        </p>
      </header>

      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
        {/* Test Card 1 */}
        <Card title="Button Component Test">
          <div className="space-y-4">
            <div>
              <p className="mb-2">Counter: {count}</p>
              <Button onClick={() => setCount(count + 1)}>
                Increment
              </Button>
              <Button 
                variant="secondary" 
                onClick={() => setCount(0)}
                className="ml-2"
              >
                Reset
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="primary" size="sm">Small Primary</Button>
              <Button variant="secondary" size="md">Medium Secondary</Button>
              <Button variant="outline" size="lg">Large Outline</Button>
              <Button disabled>Disabled Button</Button>
            </div>
          </div>
        </Card>

        {/* Test Card 2 */}
        <Card title="Tailwind Styling Test">
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded">
              Gradient Background
            </div>
            <div className="flex space-x-2">
              <div className="h-10 w-10 bg-red-500 rounded-full"></div>
              <div className="h-10 w-10 bg-yellow-500 rounded-full"></div>
              <div className="h-10 w-10 bg-green-500 rounded-full"></div>
            </div>
            <p className="text-sm font-light italic text-gray-500">
              This text uses various Tailwind typography classes
            </p>
          </div>
        </Card>

        {/* Test Card 3 */}
        <Card title="Responsive Layout" className="md:col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="p-4 bg-white border rounded shadow-sm">
                <h3 className="font-bold">Item {item}</h3>
                <p className="text-gray-600">This layout changes based on screen size</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <footer className="mt-12 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} EUJIM Solution Portal</p>
      </footer>
    </div>
  );
}

export default App;
