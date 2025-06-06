import React, { useState, useEffect } from 'react';
import TourCursor from './TourCursor';


const TourTooltip = ({ isVisible, onClose, theme }) => {
  if (!isVisible) return null;

  return (
    <div 
      className="react-web-guide absolute w-36 bottom-full mb-2 left-1/2 transform -translate-x-1/2 animate-bounce-subtle z-[99999999999999999]"
    >
      <div 
        className={`relative ${theme === "Dark" ? "bg-black/90 text-white" : "bg-white/90 text-black"} px-3  py-2 rounded-lg shadow-lg backdrop-blur-sm tooltip-enter tooltip-enter-active`}
      >
        <button
          onClick={onClose}
          className={`absolute -top-2 -right-2 ${theme === "Dark" ? "bg-black/90 text-white" : "bg-white/90 text-black"} backdrop-blur-sm rounded-full p-1 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
          </svg>
        </button>
        <div className="text-sm font-medium text-center flex items-center gap-2">
          <span>Start your web tour here!</span>
        
        </div>
        <div className={`absolute bottom-0 right-2 transform  translate-y-1/2 rotate-45 w-2 h-2 ${theme === "Dark" ? "bg-black/90" : "bg-white/90"}`}></div>
      </div>
    </div>
  );
};

const TourGuide = ({ 
  steps = [], 
  Theme = "Light",
  onComplete,
  startButtonText = "Start Tour",
  skipButtonText = "Skip Tour",
  minimizedStartText = "Start",
  minimizedSkipText = "Skip",
  showProgress = true,
  Minimized = true,
  showTooltip = true,
  buttonPosition = {
    bottom: '1.5rem',
    right: '1.5rem',
    left: 'auto',
    top: 'auto'
  },
  expandedButtonClassName = ` ${Theme === "Dark" ? "text-white bg-black/90" : "bg-white/90 text-black"}  border   px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`,
  minimizedButtonClassName = ` ${Theme === "Dark" ? "text-white bg-black/90" : "bg-white/90 text-black"}  border  px-2 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`,
  buttonStyle = {},
  CloseButtonText= <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x" aria-hidden="true"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>,
  ExpandButtonText= <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-maximize2 lucide-maximize-2" aria-hidden="true"><path d="M15 3h6v6"></path><path d="m21 3-7 7"></path><path d="m3 21 7-7"></path><path d="M9 21H3v-6"></path></svg>,
  minimizedButtonStyle = {
    width: '3rem',
    height: '3rem',
    fontSize: '0.875rem'
  },
  closeButtonClassName = `${Theme === "Dark" ? "text-white bg-black/90" : "bg-white/90 text-black"} -translate-y-4 -translate-x-1  rounded-full  p-1 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110`,
  expandButtonClassName = `${Theme === "Dark" ? "text-white bg-black/90" : "bg-white/90 text-black"} -translate-y-4 -translate-x-1  rounded-full  p-1 shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110`,
  closeButtonStyle = {},
  expandButtonStyle = {},
  cursorImage = null,
  
  messageBoxStyle = {},
  cursorStyle = {},
  nextButtonText = "Next",
  nextButtonContinueText= "Continue",
  nextButtonClassName ,
  nextButtonStyle = {},
  messageClass,
 
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isMinimized, setIsMinimized] = useState(Minimized);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isOffScreen, setIsOffScreen] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [showStartTooltip, setShowStartTooltip] = useState(showTooltip);

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
      setShowStartTooltip(false);
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
    <div className='react-web-guide'>
      <div 
        className="fixed z-[999999999999999999999999999999999]"
        style={buttonPosition}
      >
        {isMinimized ? (
          <div className="relative">
            <TourTooltip 
              isVisible={showStartTooltip && !isActive} 
              onClose={() => setShowStartTooltip(false)}
              theme={Theme}
            />
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
              className={`${expandButtonClassName} transition-all p-1  duration-500`}
              style={expandButtonStyle}
            >
             {ExpandButtonText}
            </button>
          </div>
        ) : (
          <div className="relative z-[99999999999999999]">
            <TourTooltip 
              isVisible={showStartTooltip && !isActive} 
              onClose={() => setShowStartTooltip(false)}
              theme={Theme}
            />
            <button
              onClick={handleButtonClick}
              className={`${expandedButtonClassName} transition-all duration-500`}
              style={buttonStyle}
            >
              {isActive ? skipButtonText : startButtonText}
            </button>
            <button
              onClick={handleMinimize}
              className={`${closeButtonClassName} transition-all p-1  duration-500`}
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
            Theme={Theme}
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
            messageClass={messageClass}
             CursorMessageGap={steps[currentStep]?.CursorMessageGap || 0}
          />
          
          {showProgress && (
            <div className={`fixed top-4 right-4 z-[999999999] ${Theme =='Dark' ? 'bg-[#202020]' : 'bg-white/90' } backdrop-blur-sm border rounded-full px-4 py-2 shadow-lg`}>
              <div className={`text-sm font-medium ${Theme =='Dark' ? 'text-white' : 'text-gray-700' } `}>
                <span className="hidden sm:!block text-center">Step {currentStep + 1} of {steps.length}</span>
                <span className="sm:hidden">{currentStep + 1}/{steps.length}</span>
              </div>
              <div className="w-full h-1 bg-gray-200 rounded-full mt-1">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-500"
                  style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TourGuide; 