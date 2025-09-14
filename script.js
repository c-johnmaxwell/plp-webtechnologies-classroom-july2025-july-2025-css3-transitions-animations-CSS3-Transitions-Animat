// GLOBAL SCOPE VARIABLES
let magicScore = 0; // Global score variable
let currentTheme = "dark"; // Global theme state
let cardIdCounter = 0; // Global counter for unique card IDs

// Array of card data (global scope)
const cardTemplates = [
  {
    icon: "🔮",
    title: "Crystal Ball",
    description: "Reveals the mysteries of the future",
  },
  {
    icon: "⚡",
    title: "Lightning Strike",
    description: "Harnesses the power of storms",
  },
  {
    icon: "🌟",
    title: "Shooting Star",
    description: "Grants wishes upon the night sky",
  },
  {
    icon: "🦋",
    title: "Metamorphosis",
    description: "Transforms and evolves endlessly",
  },
  {
    icon: "🌙",
    title: "Lunar Magic",
    description: "Channels the power of moon phases",
  },
  {
    icon: "🔥",
    title: "Phoenix Fire",
    description: "Burns bright and rises from ashes",
  },
  {
    icon: "💎",
    title: "Diamond Shield",
    description: "Provides unbreakable protection",
  },
  {
    icon: "🌪️",
    title: "Tornado Spin",
    description: "Creates whirlwinds of chaos",
  },
];

/* ========================================
   FUNCTIONS WITH PARAMETERS AND RETURN VALUES
   ======================================== */

// Function 1: Generate random card data (demonstrates return values)
function generateRandomCard() {
  // LOCAL SCOPE: These variables only exist within this function
  const randomIndex = Math.floor(Math.random() * cardTemplates.length);
  const selectedCard = cardTemplates[randomIndex];
  const cardId = ++cardIdCounter; // Increment global counter

  // Return an object with card data
  return {
    id: cardId,
    icon: selectedCard.icon,
    title: `${selectedCard.title} #${cardId}`,
    description: selectedCard.description,
    power: Math.floor(Math.random() * 100) + 1, // Random power level
  };
}

// Function 2: Calculate magic score based on card power (parameters and return)
function calculateMagicScore(cardPower, multiplier = 1) {
  // LOCAL SCOPE: cardPower and multiplier are local parameters
  const baseScore = cardPower * multiplier;
  const bonusScore = cardPower > 50 ? 25 : 0; // Bonus for high power

  return baseScore + bonusScore;
}

// Function 3: Create card HTML element (demonstrates DOM manipulation with parameters)
function createCardElement(cardData) {
  // LOCAL SCOPE: All variables here are local to this function
  const cardDiv = document.createElement("div");
  cardDiv.className = "magic-card";
  cardDiv.dataset.cardId = cardData.id;
  cardDiv.dataset.power = cardData.power;

  // Set inner HTML with card data
  cardDiv.innerHTML = `
        <div class="card-icon">${cardData.icon}</div>
        <h3 class="card-title">${cardData.title}</h3>
        <p class="card-description">${cardData.description}</p>
        <p class="card-power">Power: ${cardData.power}</p>
    `;

  // Add click event listener (demonstrates scope - accessing global functions)
  cardDiv.addEventListener("click", function () {
    handleCardClick(cardData); // Local cardData parameter used in callback
  });

  return cardDiv; // Return the created element
}

// Function 4: Handle card click events (demonstrates scope and DOM manipulation)
function handleCardClick(cardData) {
  // LOCAL SCOPE: cardData is a parameter, other variables are local
  const scoreIncrease = calculateMagicScore(cardData.power, 2); // Using another function

  // Modify GLOBAL scope variable
  magicScore += scoreIncrease;

  // Update DOM to show new score
  updateScoreDisplay();

  // Add visual feedback
  const cardElement = document.querySelector(`[data-card-id="${cardData.id}"]`);
  if (cardElement) {
    addTemporaryAnimation(cardElement, "animate-pulse");
  }

  // Return the score increase for potential use
  return scoreIncrease;
}

// Function 5: Add temporary CSS animation class (demonstrates parameters and timing)
function addTemporaryAnimation(element, animationClass, duration = 2000) {
  // LOCAL SCOPE: All parameters and variables are local
  element.classList.add(animationClass);

  // Remove class after specified duration
  setTimeout(() => {
    element.classList.remove(animationClass);
  }, duration);
}

// Function 6: Update score display (demonstrates DOM manipulation)
function updateScoreDisplay() {
  // Access global variable and update DOM
  const scoreElement = document.getElementById("score-value");
  if (scoreElement) {
    scoreElement.textContent = magicScore;

    // Add temporary highlight effect
    scoreElement.style.transform = "scale(1.2)";
    setTimeout(() => {
      scoreElement.style.transform = "scale(1)";
    }, 300);
  }
}

/* ========================================
   PART 3: COMBINING CSS ANIMATIONS WITH JAVASCRIPT
   ======================================== */

// Function 7: Create random card with loading animation
function createRandomCard() {
  // Show loading modal (CSS animation triggered by JS)
  showLoadingModal();

  // Simulate loading time
  setTimeout(() => {
    // Generate new card data
    const newCardData = generateRandomCard();
    const newCardElement = createCardElement(newCardData);

    // Add to container with animation
    const container = document.getElementById("cards-container");
    newCardElement.style.opacity = "0";
    newCardElement.style.transform = "translateY(50px)";

    container.appendChild(newCardElement);

    // Trigger CSS transition
    setTimeout(() => {
      newCardElement.style.transition = "all 0.5s ease";
      newCardElement.style.opacity = "1";
      newCardElement.style.transform = "translateY(0)";
    }, 100);

    hideLoadingModal();
  }, 1500);
}

// Function 8: Animate all cards (demonstrates class manipulation)
function animateAllCards() {
  const cards = document.querySelectorAll(".magic-card");

  cards.forEach((card, index) => {
    // Stagger animations using setTimeout
    setTimeout(() => {
      addTemporaryAnimation(card, "animate-bounce", 1000);
    }, index * 200); // 200ms delay between each card
  });
}

// Function 9: Toggle theme (demonstrates CSS custom property manipulation)
function toggleTheme() {
  // Access global variable
  const body = document.body;

  if (currentTheme === "dark") {
    body.classList.add("light-theme");
    currentTheme = "light";
  } else {
    body.classList.remove("light-theme");
    currentTheme = "dark";
  }

  // Add temporary animation to show theme change
  body.style.transition = "all 0.5s ease";
}

// Function 10: Reset cards with animation
function resetCards() {
  const container = document.getElementById("cards-container");
  const cards = document.querySelectorAll(".magic-card");

  // Animate cards out
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.style.transition = "all 0.3s ease";
      card.style.opacity = "0";
      card.style.transform = "translateX(-100px)";
    }, index * 100);
  });

  // Clear container and reset score after animation
  setTimeout(() => {
    container.innerHTML = "";
    magicScore = 0; // Reset global variable
    cardIdCounter = 0; // Reset global counter
    updateScoreDisplay();
    initializeCards(); // Reinitialize with default cards
  }, cards.length * 100 + 500);
}

// Function 11: Show loading modal (JS controls CSS animation)
function showLoadingModal() {
  const modal = document.getElementById("loading-modal");
  modal.style.display = "flex";

  // Trigger CSS animation by adding class
  setTimeout(() => {
    modal.classList.add("show");
  }, 10);
}

// Function 12: Hide loading modal
function hideLoadingModal() {
  const modal = document.getElementById("loading-modal");

  // Fade out animation
  modal.style.opacity = "0";

  setTimeout(() => {
    modal.classList.remove("show");
    modal.style.display = "none";
    modal.style.opacity = "1";
  }, 500);
}

// Function 13: Initialize default cards (demonstrates application startup)
function initializeCards() {
  const container = document.getElementById("cards-container");

  // Create initial set of cards
  for (let i = 0; i < 4; i++) {
    const cardData = generateRandomCard();
    const cardElement = createCardElement(cardData);

    // Add staggered entrance animation
    cardElement.style.opacity = "0";
    cardElement.style.transform = "translateY(50px)";
    container.appendChild(cardElement);

    setTimeout(() => {
      cardElement.style.transition = "all 0.5s ease";
      cardElement.style.opacity = "1";
      cardElement.style.transform = "translateY(0)";
    }, i * 200);
  }
}

/* ========================================
   EVENT LISTENERS AND INITIALIZATION
   ======================================== */

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize the application
  initializeCards();
  updateScoreDisplay();

  // Add keyboard shortcuts (demonstrates event handling)
  document.addEventListener("keydown", function (event) {
    switch (event.key) {
      case "c":
        createRandomCard();
        break;
      case "a":
        animateAllCards();
        break;
      case "t":
        toggleTheme();
        break;
      case "r":
        resetCards();
        break;
    }
  });
});

/* ========================================
   ADDITIONAL INTERACTIVE FEATURES
   ======================================== */

// Add hover sound effect simulation (demonstrates advanced interaction)
document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".magic-card");

  // Use event delegation since cards are added dynamically
  document.addEventListener(
    "mouseenter",
    function (event) {
      if (event.target.classList.contains("magic-card")) {
        // Could integrate Web Audio API here for actual sounds
        console.log("Card hover sound effect would play here");
      }
    },
    true
  );
});
