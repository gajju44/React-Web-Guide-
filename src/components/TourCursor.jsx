import React, { useEffect, useState } from 'react';


const TourCursor = ({ 
  x, 
  y, 
  isOffScreen,
  name = "Guide", 
  color = "#ff6b6b", 
  message, 
  isVisible = true, 
  onClick, 
  showNext = false,
  cursorImage = null,
  messageBoxStyle = {},
  cursorStyle = {},
  nextButtonText ,
  nextButtonContinueText ,
  nextButtonClassName = "pointer-events-auto bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95",
  nextButtonStyle = {}
}) => {
  const [messagePosition, setMessagePosition] = useState({ left: false, top: false });
  const [isHidden, setIsHidden] = useState(false);
  
  useEffect(() => {
    // Message bubble dimensions
    const messageWidth = 192; // w-48 = 12rem = 192px
    const messageHeight = 100; // Approximate height including padding and content
    const cursorOffset = 24; // Distance from cursor to message
    
    // Calculate available space in each direction
    const spaceRight = window.innerWidth - x - cursorOffset;
    const spaceLeft = x - cursorOffset;
    const spaceBottom = window.innerHeight - y - cursorOffset;
    const spaceTop = y - cursorOffset;
    
    // Only change position if message would go off-screen
    const shouldBeOnLeft = spaceRight < messageWidth && spaceLeft > messageWidth;
    const shouldBeOnTop = spaceBottom < messageHeight && spaceTop > messageHeight;
    
    setMessagePosition({
      left: shouldBeOnLeft,
      top: shouldBeOnTop
    });
  }, [x, y]);

  if (!isVisible) return null;
  
  const messageClasses = [
    "absolute px-2 md:px-3 py-2 rounded-lg text-[10px] md:text-sm text-gray-800 bg-white shadow-lg border w-24 md:w-48",
    messagePosition.left ? "right-14" : "left-8",
    messagePosition.top && !messagePosition.left ? "bottom-2 left-6" : "top-6",
    "transition-all duration-500 ease-in-out"
  ].join(" ");

  const handleHide = (e) => {
    e.stopPropagation();
    setIsHidden(true);
  };

  const handleContinue = (e) => {
    e.stopPropagation();
    setIsHidden(false);
  };
  
  return (
    <div 
      className="fixed pointer-events-none z-[9999999999999999]"
      style={{ 
        left: isHidden ? `${window.innerWidth - 60}px` : `${x}px`,
        top: isHidden ? `50%` : `${y}px`,
        transition: 'all 0.5s ease-out',
        ...cursorStyle
      }}
    >
      {/* Main cursor */}
      <div className="relative">
        {cursorImage ? (
          <img 
            src={cursorImage} 
            alt="Custom cursor" 
            className="w-6 h-6 drop-shadow-lg"
            style={{
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
            }}
          />
        ) : (
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            className="drop-shadow-lg"
            style={{
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))'
            }}
          >
            <path
              d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
              fill={color}
              stroke="white"
              strokeWidth="2"
            />
          </svg>
        )}
        
        {/* Name tag */}
        <div 
          className="absolute top-6 -left-4 px-2 py-[1px] rounded-full text-[10px] text-white font-medium whitespace-nowrap shadow-md"
          style={{ backgroundColor: color }}
        >
          {name}
        </div>
        
        {/* Message bubble */}
        {message && (
          <>
            <div 
              className={messageClasses}
              style={{
                ...messageBoxStyle,
                opacity: isHidden ? 0 : 1,
                transform: isHidden ? 'translateX(100px)' : 'translateX(0)'
              }}
            >
              <button 
                onClick={handleHide}
                title='Pause the tour'
                className="pointer-events-auto absolute -top-4 -right-4 bg-[#ffffff6c] backdrop-blur-sm rounded-full p-[6px] shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="red" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart-crack" aria-hidden="true"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path><path d="m12 13-1-1 2-2-3-3 2-2"></path></svg>
              </button>
              <div className="mb-2">{message}</div>
              {showNext && !isHidden && (
                <button 
                title={ isOffScreen ? nextButtonContinueText : nextButtonText}
                  onClick={onClick}
                  className={nextButtonClassName}
                  style={nextButtonStyle}
                >
                  { isOffScreen ? nextButtonContinueText : nextButtonText}
                </button>
              )}
            </div>
            {/* Heart button - positioned independently */}
            {isHidden && (
              <div 
                className="absolute"
                style={{
                  left: messagePosition.left ? 'auto' : 'calc(100% - 0.4rem)',
                  right: messagePosition.left ? 'calc(100% - 3rem)' : 'auto',
                  top: '50%',
                  transform: 'translateY(-50%)'
                }}
              >
                <button 
                  onClick={handleContinue}
                  title='Continue the tour'
                  className="pointer-events-auto bg-[#ffffff6c] backdrop-blur-sm rounded-full p-[6px] shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110"
                >
                 <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="red" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart" aria-hidden="true"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TourCursor; 