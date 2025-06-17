/* 
 * Cost Calculator JavaScript for Positive Impact Website
 * Author: Manus AI
 * Version: 1.0
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize cost calculator
    initCostCalculator();
});

// Cost Calculator Functionality
function initCostCalculator() {
    const calculateBtn = document.getElementById('calculate-btn');
    
    if (calculateBtn) {
        // Set initial values
        calculateInitialValues();
        
        // Add event listener for calculate button
        calculateBtn.addEventListener('click', performCalculation);
        
        // Add event listeners for input changes to enable real-time calculation
        const inputs = document.querySelectorAll('#current-agents, #agent-cost, #call-volume, #service-level');
        inputs.forEach(input => {
            input.addEventListener('input', performCalculation);
        });
    }
}

// Calculate initial values when page loads
function calculateInitialValues() {
    const currentAgents = document.getElementById('current-agents');
    const agentCost = document.getElementById('agent-cost');
    
    if (currentAgents && agentCost) {
        const currentCostElement = document.getElementById('current-cost');
        const bpoCostElement = document.getElementById('bpo-cost');
        const monthlySavingsElement = document.getElementById('monthly-savings');
        const annualSavingsElement = document.getElementById('annual-savings');
        
        if (currentCostElement && bpoCostElement && monthlySavingsElement && annualSavingsElement) {
            const agents = parseInt(currentAgents.value) || 10;
            const cost = parseInt(agentCost.value) || 4000;
            
            // Calculate costs
            const currentCost = agents * cost;
            const bpoCost = Math.round(currentCost * 0.6); // Assuming 40% savings
            const monthlySavings = currentCost - bpoCost;
            const annualSavings = monthlySavings * 12;
            
            // Format currency based on language
            const language = document.documentElement.lang;
            const currencySymbol = language === 'fr' ? '€' : '$';
            const currencyFormat = new Intl.NumberFormat(language === 'fr' ? 'fr-FR' : 'en-US');
            
            // Update display
            currentCostElement.textContent = `${currencySymbol}${currencyFormat.format(currentCost)}`;
            bpoCostElement.textContent = `${currencySymbol}${currencyFormat.format(bpoCost)}`;
            monthlySavingsElement.textContent = `${currencySymbol}${currencyFormat.format(monthlySavings)}`;
            annualSavingsElement.textContent = `${currencySymbol}${currencyFormat.format(annualSavings)}`;
        }
    }
}

// Perform calculation when inputs change or button is clicked
function performCalculation() {
    const currentAgents = document.getElementById('current-agents');
    const agentCost = document.getElementById('agent-cost');
    const callVolume = document.getElementById('call-volume');
    const serviceLevel = document.getElementById('service-level');
    
    if (currentAgents && agentCost && callVolume && serviceLevel) {
        const currentCostElement = document.getElementById('current-cost');
        const bpoCostElement = document.getElementById('bpo-cost');
        const monthlySavingsElement = document.getElementById('monthly-savings');
        const annualSavingsElement = document.getElementById('annual-savings');
        
        if (currentCostElement && bpoCostElement && monthlySavingsElement && annualSavingsElement) {
            // Get input values
            const agents = parseInt(currentAgents.value) || 10;
            const cost = parseInt(agentCost.value) || 4000;
            const volume = parseInt(callVolume.value) || 5000;
            const service = parseInt(serviceLevel.value) || 90;
            
            // Calculate costs with adjustments based on call volume and service level
            const currentCost = agents * cost;
            
            // Adjust BPO cost based on call volume and service level
            let savingsRate = 0.4; // Base savings rate (40%)
            
            // Adjust for call volume (higher volume = more savings)
            if (volume > 10000) {
                savingsRate += 0.05;
            } else if (volume < 2000) {
                savingsRate -= 0.05;
            }
            
            // Adjust for service level (higher service level = less savings)
            if (service > 95) {
                savingsRate -= 0.05;
            } else if (service < 85) {
                savingsRate += 0.05;
            }
            
            // Calculate final costs
            const bpoCost = Math.round(currentCost * (1 - savingsRate));
            const monthlySavings = currentCost - bpoCost;
            const annualSavings = monthlySavings * 12;
            
            // Format currency based on language
            const language = document.documentElement.lang;
            const currencySymbol = language === 'fr' ? '€' : '$';
            const currencyFormat = new Intl.NumberFormat(language === 'fr' ? 'fr-FR' : 'en-US');
            
            // Add animation effect
            animateValue(currentCostElement, currentCost, currencySymbol, currencyFormat);
            animateValue(bpoCostElement, bpoCost, currencySymbol, currencyFormat);
            animateValue(monthlySavingsElement, monthlySavings, currencySymbol, currencyFormat);
            animateValue(annualSavingsElement, annualSavings, currencySymbol, currencyFormat);
        }
    }
}

// Animate value change
function animateValue(element, value, symbol, formatter) {
    // Get current value without currency symbol
    const currentValueText = element.textContent.replace(/[^0-9]/g, '');
    const currentValue = parseInt(currentValueText) || 0;
    
    // Calculate step for animation
    const diff = value - currentValue;
    const steps = 20; // Number of steps for animation
    const step = diff / steps;
    
    let currentStep = 0;
    
    // Clear any existing animation
    if (element.animation) {
        clearInterval(element.animation);
    }
    
    // Start animation
    element.animation = setInterval(() => {
        currentStep++;
        
        if (currentStep >= steps) {
            clearInterval(element.animation);
            element.textContent = `${symbol}${formatter.format(value)}`;
        } else {
            const intermediateValue = Math.round(currentValue + (step * currentStep));
            element.textContent = `${symbol}${formatter.format(intermediateValue)}`;
        }
    }, 20);
}

// Add highlight effect when values change significantly
function highlightSavings() {
    const monthlySavingsElement = document.getElementById('monthly-savings');
    const annualSavingsElement = document.getElementById('annual-savings');
    
    if (monthlySavingsElement && annualSavingsElement) {
        // Add highlight class
        monthlySavingsElement.classList.add('highlight-savings');
        annualSavingsElement.classList.add('highlight-savings');
        
        // Remove highlight class after animation completes
        setTimeout(() => {
            monthlySavingsElement.classList.remove('highlight-savings');
            annualSavingsElement.classList.remove('highlight-savings');
        }, 1000);
    }
}

// Add CSS for calculator animations
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        .highlight-savings {
            animation: highlight 1s ease-in-out;
        }
        
        @keyframes highlight {
            0% { background-color: transparent; }
            50% { background-color: rgba(255, 255, 255, 0.3); }
            100% { background-color: transparent; }
        }
        
        .calculator-form .form-group input:focus {
            border-color: var(--secondary-color);
            box-shadow: 0 0 0 3px rgba(255, 58, 58, 0.2);
        }
        
        #calculate-btn:active {
            transform: scale(0.98);
        }
    `;
    document.head.appendChild(style);
});
