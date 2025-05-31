import React, { useState, useEffect } from 'react';
import TourCursor from './TourCursor';
import { X, Maximize2 } from 'lucide-react';

const TourGuide = ({ 
  steps = [], 
  onComplete,
  startButtonText = "Start Tour",
  skipButtonText = "Skip Tour",
  minimizedStartText = "Start",
  minimizedSkipText = "Skip",
  showProgress = true,
  ProgressTheme="Light",
  buttonPosition = {
    bottom: '1.5rem',
    right: '1.5rem',
    left: 'auto',
    top: 'auto'
  },
  expandedButtonClassName = "bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105",
  minimizedButtonClassName = "bg-white/90 backdrop-blur-sm text-gray-600 hover:text-gray-800 w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center",
  buttonStyle = {},
  CloseButtonText= <X size={16} />,
  ExpandButtonText= <Maximize2 size={16} />,
  minimizedButtonStyle = {
    width: '3rem',
    height: '3rem',
    fontSize: '0.875rem'
  },
  closeButtonClassName = "absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110",
  expandButtonClassName = "absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110",
  closeButtonStyle = {},
  expandButtonStyle = {},
  cursorImage = null,
  messageBoxStyle = {},
  cursorStyle = {},
  nextButtonText = "Next →",
  nextButtonContinueText= "Continue",
  nextButtonClassName = "pointer-events-auto bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95",
  nextButtonStyle = {}
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isOffScreen, setIsOffScreen] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  const updateCursorPosition = () => {
    if (!isActive || currentStep >= steps.length) return;
    
    const step = steps[currentStep];
    if (step.ref.current) {
      const rect = step.ref.current.getBoundingClientRect();
      const x = rect.left + (step.offsetX || rect.width / 2);
      const y = rect.top + (step.offsetY || rect.height / 2);
      
      setCursorPosition({ x, y });
      
      // Check if element is off screen
      const isVisible = rect.top >= -100 && rect.bottom <= window.innerHeight + 100;
      setIsOffScreen(!isVisible);
    }
  };

  const scrollToCurrentStep = async () => {
    if (currentStep < steps.length && steps[currentStep].ref.current) {
      setShowCursor(false);
      
      steps[currentStep].ref.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center'
      });
      
      setTimeout(() => {
        setShowCursor(true);
        updateCursorPosition();
      }, 800);
    }
  };

  useEffect(() => {
    if (!isActive) return;
    
    updateCursorPosition();
    
    const handleScroll = () => updateCursorPosition();
    const handleResize = () => updateCursorPosition();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [isActive, currentStep]);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsActive(false);
      onComplete?.();
    }
  };

  const startTour = () => {
    setIsActive(true);
    setCurrentStep(0);
    setShowCursor(true);
    setTimeout(updateCursorPosition, 500);
  };

  const handleButtonClick = () => {
    if (isActive) {
      setIsActive(false);
      onComplete?.();
    } else {
      startTour();
    }
  };

  const handleMinimize = (e) => {
    e.stopPropagation();
    setIsMinimized(true);
  };

  const handleExpand = (e) => {
    e.stopPropagation();
    setIsMinimized(false);
  };

  return (
    <>
      <div 
        className="fixed z-50"
        style={buttonPosition}
      >
        {isMinimized ? (
          <div className="relative">
            <button
              onClick={handleButtonClick}
              className={`${minimizedButtonClassName} transition-all duration-500`}
              style={{
                ...minimizedButtonStyle,
                ...buttonStyle
              }}
            >
              {isActive ? minimizedSkipText : minimizedStartText}
            </button>
            <button
              onClick={handleExpand}
              className={`${expandButtonClassName} transition-all duration-500`}
              style={expandButtonStyle}
            >
             {ExpandButtonText}
            </button>
          </div>
        ) : (
          <div className="relative">
            <button
              onClick={handleButtonClick}
              className={`${expandedButtonClassName} transition-all duration-500`}
              style={buttonStyle}
            >
              {isActive ? skipButtonText : startButtonText}
            </button>
            <button
              onClick={handleMinimize}
              className={`${closeButtonClassName} transition-all duration-500`}
              style={closeButtonStyle}
            >
              {CloseButtonText}
            </button>
          </div>
        )}
      </div>

      {isActive && (
        <>
          <TourCursor
            x={isOffScreen ? window.innerWidth / 2 : cursorPosition.x}
            y={isOffScreen ? window.innerHeight / 2 : cursorPosition.y}
            name={steps[currentStep]?.name || "Guide"}
            color={steps[currentStep]?.color || "#ff6b6b"}
            message={isOffScreen ? "Scroll to see this step!" : steps[currentStep]?.message}
            isVisible={showCursor}
            onClick={isOffScreen ? scrollToCurrentStep : nextStep}
            showNext={true}
            isOffScreen={isOffScreen}
            cursorImage={cursorImage}
            messageBoxStyle={messageBoxStyle}
            cursorStyle={cursorStyle}
            nextButtonText={nextButtonText}
            nextButtonContinueText={nextButtonContinueText}
            nextButtonClassName={nextButtonClassName}
            nextButtonStyle={nextButtonStyle}
          />
          
          {showProgress && (
            <div className={`fixed top-4 right-4 z-50 ${ProgressTheme =='Dark' ? 'bg-[#202020]' : 'bg-white/90' } backdrop-blur-sm rounded-full px-4 py-2 shadow-lg`}>
              <div className={`text-sm font-medium ${ProgressTheme =='Dark' ? 'text-white' : 'text-gray-700' } `}>
                <span className="hidden sm:inline">Step {currentStep + 1} of {steps.length}</span>
                <span className="sm:hidden">{currentStep + 1}/{steps.length}</span>
              </div>
              <div className="w-5 md:w-32 h-1 bg-gray-200 rounded-full mt-1">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-500"
                  style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                />
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default TourGuide; 