import { useRef } from 'react'
import  TourGuide  from './components/TourGuide'
function App() {
 // Create refs for the elements you want to highlight
  const headerRef = useRef(null);
  const contentRef = useRef(null);
  const sidebarRef = useRef(null);
  const footerRef = useRef(null);

  // Define your tour steps
  const tourSteps = [
    {
      ref: headerRef,
      name: "Guide",
      color: "black",
      message: "This is the header section of your page",
      offsetX: 0,
      offsetY: 0
    },
    {
      ref: contentRef,
      name: "Guide",
      color: "#4ecdc4",
      message: "This is the main content area",
      offsetX: 0,
      offsetY: 0
    },
    {
      ref: sidebarRef,
      name: "Guide",
      color: "#45b7d1",
      message: "Here's the sidebar with additional options",
      offsetX: 0,
      offsetY: 0
    },
    {
      ref: footerRef,
      name: "Guide",
      color: "#f9ca24",
      message: "And finally, the footer section",
      offsetX: 0,
      offsetY: 0
    }
  ];

  return (
    <>
      <TourGuide 
        steps={tourSteps}
        onComplete={() => console.log('Tour completed!')}
        startButtonText="Need Guide?"
        skipButtonText="Skip Tour"
          minimizedStartText="Start"
          minimizedSkipText="Skip"
        showProgress={true}
        ProgressTheme="Dark"
        buttonPosition={{
          bottom: '2rem',
          left: 'auto',     
          right: '10px',
          top: 'auto',
        
        }}
       
        expandedButtonClassName="bg-blue-500 text-white px-4 py-2 rounded-full "
        minimizedButtonClassName="bg-blue-500 text-gray-800 w-12 h-12 rounded-full" 
        closeButtonClassName="bg-red-100 text-red-600 rounded-full p-1 -translate-y-4"
  expandButtonClassName="bg-green-100 text-green-600 rounded-full p-1 -translate-y-4"  
        // cursorImage="/path/to/your/cursor.png"
        messageBoxStyle={{
          backgroundColor: '#ffff',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}
        cursorStyle={{
          transform: 'scale(1.2)',
          transition: 'all 0.3s ease'
          
        }}
     />
    
    <div className="min-h-screen h-screen bg-gray-50">
    

     
      <header 
        ref={headerRef}
        className="bg-white shadow-sm p-4"
      >
        <h1 className="text-2xl font-bold text-gray-800">Your Page Title</h1>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Main content */}
          <main 
            ref={contentRef}
            className="flex-1 bg-white rounded-lg shadow-sm p-6"
          >
            <h2 className="text-xl font-semibold mb-4">Main Content</h2>
            <p className="text-gray-600">
              This is your main content area. You can put any content here.
            </p>
          </main>

          {/* Sidebar */}
          <aside 
            ref={sidebarRef}
            className="w-64 bg-white rounded-lg shadow-sm p-4"
          >
            <h3 className="font-semibold mb-4">Sidebar</h3>
            <nav className="space-y-2">
              <a href="#" className="block text-gray-600 hover:text-purple-600">Menu Item 1</a>
              <a href="#" className="block text-gray-600 hover:text-purple-600">Menu Item 2</a>
              <a href="#" className="block text-gray-600 hover:text-purple-600">Menu Item 3</a>
            </nav>
          </aside>
        </div>
      </div>

      {/* Footer */}
   
    
    
      <footer 
        ref={footerRef}
        className="bg-white border-t mt-8 p-4"
      >
        <p className="text-center text-gray-600">
          © 2024 Your Company. All rights reserved.
        </p>
      </footer>
     
    
     
    </div>
    </>
  );
}

export default App
