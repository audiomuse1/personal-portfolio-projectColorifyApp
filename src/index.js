//===================================================LIGHTBULB SECTION================================================//
//====================================================================================================================//




//Creating lightbulbs
  var lightBulb;
  function createLightbulbs() {
    lightBulb = document.createElement('div');
    lightBulb.className = "container__lightbulb";
  }


  //Appends the lightbulbs dynamically
  function appendLightbulbs() {
    var lightsContainerTop = document.getElementsByClassName("container--lightbulbs")[0];
    var lightsContainerBottom = document.getElementsByClassName("container--lightbulbs")[1];
    var lightSidebarLeft = document.getElementsByClassName("container__sidebar")[0];
    var lightSidebarRight = document.getElementsByClassName("container__sidebar")[1];

    for (var i=0; i<6; i++) {
      createLightbulbs();
      lightsContainerTop.append(lightBulb);
    }

    for (var i=0; i<6; i++) {
      createLightbulbs();
      lightsContainerBottom.append(lightBulb);
    }

    for (var i=0; i<3; i++) {
      createLightbulbs();
      lightSidebarLeft.append(lightBulb);
    }

    for (var i=0; i<3; i++) {
      createLightbulbs();
      lightSidebarRight.append(lightBulb);
    }
  }
  appendLightbulbs();


  function alignSidebar() {
    var topRow = document.querySelectorAll('.container--lightbulbs')[0];
    var topRowLeftBulb = topRow.querySelectorAll('.container__lightbulb')[0];
    var topRowRightBulb = topRow.querySelectorAll('.container__lightbulb')[5];
  
    var leftSidebar = document.querySelector('.container__sidebar--left');
    var leftSidebarLightbulbs = leftSidebar.querySelectorAll('.container__lightbulb');
  
    if (topRowLeftBulb && leftSidebarLightbulbs.length > 0) {
      var firstLightbulbRect = topRowLeftBulb.getBoundingClientRect();
      var sidebarRect = leftSidebar.getBoundingClientRect();
  
      var offsetX = firstLightbulbRect.left - sidebarRect.left;
  
      leftSidebarLightbulbs.forEach(function(lightbulb) {
        lightbulb.style.marginLeft = offsetX + 'px';
      });
    }
  
    var rightSidebar = document.querySelector('.container__sidebar--right');
    var rightSidebarLightbulbs = rightSidebar.querySelectorAll('.container__lightbulb');
  
    if (topRowRightBulb && rightSidebarLightbulbs.length > 0) {
      var lastLightbulbRect = topRowRightBulb.getBoundingClientRect();
      var sidebarRect = rightSidebar.getBoundingClientRect();
  
      var offsetXLast = lastLightbulbRect.left - sidebarRect.left;
  
      rightSidebarLightbulbs.forEach(function(lightbulb) {
        lightbulb.style.marginLeft = offsetXLast + 'px';
      });
    }
  }
  
  function addResizeListener(callback) {
    let timeoutId;
  
    window.addEventListener("resize", () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(callback, 200); // Delay the callback execution to handle resize end
    });
  }
  
  addResizeListener(alignSidebar);
  alignSidebar(); // Initial alignment
  


//==============================================CONTROL PANEL BTNS SECTION=============================================//
//=====================================================================================================================//



function changeBackgroundColor(className, element, color) {
  var buttons = document.getElementsByClassName(className);
  for (var i = 0; i < buttons.length; i++) {
    var button = buttons[i];
    if (button === element) {
      button.style.backgroundColor = color;
    } else {
      button.style.backgroundColor = "#84A7A1"; // Reset to default
    }
  }
}

//====================================================COLOR SCHEME CHANGES=============================================//

  //Adding event listeners for color buttons
  function changeLightColors(colors) {
    // Normalize the colors input
    let colorArray = colors;
    if (typeof colors === 'string') {
      const holiday = holidayColors.find(h => 
        h.name.toLowerCase().replace(/[^a-z]/g, '') === colors.toLowerCase()
      );
      if (holiday) {
        colorArray = holiday.colors;
      } else {
        return;
      }
    }

    // Apply colors to all visible lightbulbs
    const lightBulbs = document.querySelectorAll('.container__lightbulb');
    lightBulbs.forEach((bulb, index) => {
      if (window.getComputedStyle(bulb).display !== 'none') {
        bulb.style.borderTopColor = colorArray[index % colorArray.length];
      }
    });
  }
  
  function resetLightBulbColors() {
    var lightBulbs = document.getElementsByClassName("container__lightbulb");
    for (var i = 0; i < lightBulbs.length; i++) {
      lightBulbs[i].style.borderTopColor = "#1F6E8C"; // Reset to default
    }
  }
  

  //Creating buttons for control panel
  function createColorBtns(array, onClick) {
    const button = document.createElement('button');  
    button.innerText = array[0];
    button.className = "button button-color";
    button.value = array;
    button.addEventListener('click', onClick);
    return button;
  }



  const colorChangeEvent = () => {
    var array = event.target.value;
    var newArray = array.split(",")
    //Use the spread operator to copy the array
    var itemInstance = [...newArray];
    itemInstance.shift();
    changeLightColors(itemInstance);
  };




  //====================================================MOTION CHANGES=============================================//


  var alternateSteps = anime({
    targets:'.demo-wrapper',
    translateX: 250,
    direction: 'alternate',
    loop: true,
    easing: 'steps(5)',
    // autoplay: false,
  })
  // document.querySelector('.circle').onclick = alternateSteps.play;
  // document.querySelector('.circle').onclick = alternateSteps.pause;




  //Circular Motion

 var circularMotion = anime({

    targets: '.container__lightbulb',
    autoplay: false,
    duration: 20000,
    easing: 'easeOutElastic(1, .8)',
    loop: true,
    update: function(animation) {
      var progress = animation.progress * 0.2; // Adjust the factor as needed for desired speed
      var angle = progress * 2 * Math.PI; // Convert progress to radians
      var radius = 20; // Adjust the radius as needed
  
      var translateX = Math.cos(angle) * radius;
      var translateY = Math.sin(angle) * radius;
  
      animation.animatables.forEach(function(animatable) {
        animatable.target.style.transform = 'translate(' + translateX + 'px, ' + translateY + 'px)';
      });
    }
  });

  //Square Motion
  var squareMotion = anime({
    targets: '.container__lightbulb',
    autoplay: false,
    keyframes: [
      {translateY: 0},
      {translateX: 10},
      {translateY: 10},
      {translateX: 0},
      {translateY: 0}
    ],
    duration: 4000,
    easing: 'easeOutElastic(1, .8)',
    loop: true
  })

  var spiralMotion = anime({
    targets: '.container__lightbulb',
    autoplay: false,
    rotate: '1turn',
    duration: 3000,
    easing: 'linear',
    loop: true
  });

  var bounceMotion = anime({
    targets: '.container__lightbulb',
    autoplay: false,
    translateY: [
      { value: -30, duration: 500, easing: 'easeOutCubic' },
      { value: 0, duration: 800, easing: 'easeInCubic' }
    ],
    loop: true
  });
  

  var rotateMotion = anime({
    targets: '.container__lightbulb',
    autoplay: false,
    rotate: '1turn',
    duration: 2000,
    easing: 'easeInOutSine',
    loop: true
  });

  var blinkMotion = anime({
    targets: '.container__lightbulb',
    autoplay: false,
    opacity: [1, 0],
    duration: 500,
    easing: 'linear',
    direction: 'alternate',
    loop: true
  });

  var shakeMotion = anime({
    targets: '.container__lightbulb',
    autoplay: false,
    translateX: ['-15px', '15px'], // Increased from 5px
    duration: 100,  // Faster duration
    direction: 'alternate',
    loop: true,
    easing: 'easeInOutSine',
    delay: anime.stagger(50) // Add stagger for more dynamic effect
  });

  var currentMotion = null;

 //Adding event listeners for motion buttons
 function changeLightMotions(motion) {
  var clickedButton = event.target;
  var isRed = clickedButton.style.backgroundColor === "blue";

  // Check if the clicked button is already red
  if (isRed) {
    changeBackgroundColor("button-motion", clickedButton, "blue");
    stopMotion(currentMotion);
    currentMotion = null;
    return; // Exit the function
  }

  changeBackgroundColor("button-motion", clickedButton, "blue");

  if (currentMotion) {
    stopMotion(currentMotion);
  }

  motion.play();
  currentMotion = motion;
}


function stopMotion(motion) {
  motion.pause();
  motion.seek(0);
}


  function createMotionBtns(scheme, onClick) {
    const button = document.createElement('button');
    button.innerText = scheme[0];
    button.className = "button button-motion";
    button.value = scheme;
    button.addEventListener('click', () => onClick(scheme[1]));
    return button;
  }




  
  const holidayColors = [
    {
      name: "Christmas",
      colors: ['#FF6B6B', '#4CAF50', '#FF0000', '#228B22']
    },
    {
      name: "Halloween",
      colors: ['#FF6B6B', '#000000', '#FF4500']
    },
    {
      name: "Valentine's",
      colors: ['#FF69B4', '#FF1493', '#FFB6C1']
    },
    {
      name: "St. Patrick's",
      colors: ['#228B22', '#32CD32', '#90EE90']
    },
    {
      name: "Autumn",
      colors: ['#FF4500', '#FFD700', '#FF8C00']
    },
    {
      name: "Winter",
      colors: ['#87CEEB', '#E0FFFF', '#B0E0E6']
    },
    {
      name: "Mardi Gras",
      colors: ['#FF1493', '#00CED1', '#FFD700']
    },
    {
      name: "4th of July",
      colors: ['#FF0000', '#FFFFFF', '#0000FF']
    }
  ];

  const motions = [
    {
      name: "Wave",
      effect: () => ({
        targets: '.container__lightbulb',
        translateY: [-20, 0],
        delay: anime.stagger(100),
        duration: 800,
        easing: 'easeInOutSine',
        loop: true,
        direction: 'alternate'
      })
    },
    {
      name: "Pulse",
      effect: () => ({
        targets: '.container__lightbulb',
        scale: [1, 1.2],
        opacity: [1, 0.5],
        duration: 1000,
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine'
      })
    },
    {
      name: "Spiral",
      effect: () => ({
        targets: '.container__lightbulb',
        rotate: '1turn',
        duration: 1500,
        loop: true,
        easing: 'linear'
      })
    },
    {
      name: "Bounce",
      effect: () => ({
        targets: '.container__lightbulb',
        translateY: [-30, 0],
        duration: 800,
        loop: true,
        direction: 'alternate',
        delay: anime.stagger(100),
        easing: 'easeInOutQuad'
      })
    },
    {
      name: "Shake",
      effect: () => ({
        targets: '.container__lightbulb',
        translateX: ['-20px', '20px'],
        duration: 100,
        direction: 'alternate',
        loop: true,
        easing: 'linear',
        delay: anime.stagger(50)
      })
    },
    {
      name: "Sparkle",
      effect: () => ({
        targets: '.container__lightbulb',
        opacity: [0.4, 1],
        scale: [0.8, 1.2],
        duration: 800,
        delay: anime.stagger(200, {from: 'center'}),
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutQuad'
      })
    }
  ];

  let currentAnimation = null;
  let activeButton = null;

  async function handleMotionClick(button, motionConfig) {
    // If clicking active button, deactivate it
    if (button === activeButton) {
      button.classList.remove('active');
      activeButton = null;
      if (currentAnimation) {
        currentAnimation.pause();
        currentAnimation = null;
      }
      await resetLightbulbs();
      return;
    }

    // Reset previous button immediately
    if (activeButton) {
      activeButton.classList.remove('active');
    }

    // Set new button immediately
    button.classList.add('active');
    activeButton = button;

    // Handle animation
    if (currentAnimation) {
      currentAnimation.pause();
      await resetLightbulbs();
    }

    currentAnimation = anime(motionConfig.effect());
  }

  // Initialize buttons
  function initializeButtons() {
    const colorContainer = document.querySelector('.container--colors');
    const motionContainer = document.querySelector('.container--motions');

    // Clear existing buttons
    colorContainer.innerHTML = '';
    motionContainer.innerHTML = '';

    // Create color buttons
    holidayColors.forEach(holiday => {
      const button = document.createElement('button');
      button.className = 'button button-color';
      button.textContent = holiday.name;
      button.addEventListener('click', () => changeLightColors(holiday.colors));
      colorContainer.appendChild(button);
    });

    // Create motion buttons
    motions.forEach(motion => {
      const button = document.createElement('button');
      button.className = 'button button-motion';
      button.textContent = motion.name;
      button.addEventListener('click', () => handleMotionClick(button, motion));
      motionContainer.appendChild(button);
    });
  }

  // Remove old event listeners and animations
  document.querySelectorAll('.button-motion').forEach(btn => {
    btn.replaceWith(btn.cloneNode(true));
  });

  // Initialize the app
  initializeButtons();

  // Remove any old animation definitions
  [alternateSteps, circularMotion, squareMotion, spiralMotion, bounceMotion, 
   rotateMotion, blinkMotion, shakeMotion].forEach(animation => {
    if (animation && typeof animation.pause === 'function') {
      animation.pause();
    }
  });


// Update dropdown event handlers
document.getElementById('motionSelect').addEventListener('change', async function(e) {
  const selectedValue = e.target.value.toLowerCase();
  
  // First stop current animation and reset position
  if (currentAnimation) {
    currentAnimation.pause();
    currentAnimation = null;
    // Wait for reset to complete before starting new animation
    await resetLightbulbs();
  }

  if (!selectedValue) return;

  // Find and apply new animation after reset is complete
  const motionConfig = motions.find(m => m.name.toLowerCase() === selectedValue);
  if (motionConfig) {
    // Small delay to ensure reset is visually complete
    setTimeout(() => {
      currentAnimation = anime(motionConfig.effect());
    }, 50);
  }
});

document.getElementById('colorSelect').addEventListener('change', function(e) {
  const selectedValue = e.target.value;
  if (!selectedValue) {
    resetLightBulbColors();
    return;
  }

  // Create a mapping for special cases
  const colorMapping = {
    'stpatricks': "St. Patrick's",
    'valentines': "Valentine's",
    '4thofjuly': "4th of July"
  };

  const holidayName = colorMapping[selectedValue] || selectedValue;
  const holiday = holidayColors.find(h => h.name.toLowerCase() === holidayName.toLowerCase());

  if (holiday) {
    const lightBulbs = document.querySelectorAll('.container__lightbulb');
    const visibleBulbs = Array.from(lightBulbs).filter(bulb => 
      window.getComputedStyle(bulb).display !== 'none'
    );

    visibleBulbs.forEach((bulb, index) => {
      bulb.style.borderTopColor = holiday.colors[index % holiday.colors.length];
    });
  }
});

// Improve reset function to ensure complete reset
function resetLightbulbs() {
  return new Promise(resolve => {
    anime({
      targets: '.container__lightbulb',
      rotate: 0,
      scale: 1,
      translateX: 0,
      translateY: 0,
      opacity: 1,
      duration: 200, // Faster reset
      easing: 'easeOutQuad',
      complete: () => {
        // Force reset of transform property
        document.querySelectorAll('.container__lightbulb').forEach(bulb => {
          bulb.style.transform = 'none';
        });
        resolve();
      }
    });
  });
}


