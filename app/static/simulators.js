// Green Hash Maroc - Simulators JavaScript
// Handles mining and investment calculations with real-time updates

let miningChart = null;
let currentMiningData = {
    hashrate: 10,
    electricityCost: 1.2,
    duration: 12,
    crypto: 'btc'
};

let currentInvestmentData = {
    amount: 50000,
    type: 'mining',
    duration: 12,
    risk: 'medium'
};

// Mining parameters (realistic estimates)
const miningParams = {
    btc: {
        networkHashrate: 150000000, // TH/s
        blockReward: 6.25,
        blocksPerDay: 144,
        price: 435000, // MAD
        difficulty: 25000000000000
    },
    eth: {
        networkHashrate: 1000000, // TH/s
        blockReward: 2.0,
        blocksPerDay: 7200,
        price: 23000, // MAD
        difficulty: 58000000000000000
    },
    kas: {
        networkHashrate: 100000, // TH/s
        blockReward: 500,
        blocksPerDay: 86400,
        price: 0.5, // MAD
        difficulty: 1000000000
    },
    doge: {
        networkHashrate: 10000, // TH/s
        blockReward: 10000,
        blocksPerDay: 144,
        price: 1.2, // MAD
        difficulty: 5000000
    }
};

// Investment parameters
const investmentParams = {
    mining: {
        minROI: 15,
        maxROI: 20,
        risk: 'low',
        liquidity: 'medium'
    },
    exchange: {
        minROI: 20,
        maxROI: 25,
        risk: 'medium',
        liquidity: 'high'
    },
    technology: {
        minROI: 25,
        maxROI: 35,
        risk: 'high',
        liquidity: 'low'
    },
    token: {
        minROI: 18,
        maxROI: 28,
        risk: 'medium',
        liquidity: 'variable'
    }
};

// Initialize simulators
function initializeSimulators() {
    // Initialize mining sliders
    const hashrateSlider = document.getElementById('hashrate-slider');
    const electricitySlider = document.getElementById('electricity-slider');
    const durationSelect = document.getElementById('duration-select');
    const cryptoSelect = document.getElementById('crypto-select');
    
    if (hashrateSlider) {
        hashrateSlider.addEventListener('input', function() {
            currentMiningData.hashrate = parseFloat(this.value);
            document.getElementById('hashrate-value').textContent = this.value + ' TH/s';
            updateMiningCalculation();
        });
    }
    
    if (electricitySlider) {
        electricitySlider.addEventListener('input', function() {
            currentMiningData.electricityCost = parseFloat(this.value);
            document.getElementById('electricity-value').textContent = this.value + ' MAD/kWh';
            updateMiningCalculation();
        });
    }
    
    if (durationSelect) {
        durationSelect.addEventListener('change', function() {
            currentMiningData.duration = parseInt(this.value);
            updateMiningCalculation();
        });
    }
    
    if (cryptoSelect) {
        cryptoSelect.addEventListener('change', function() {
            currentMiningData.crypto = this.value;
            updateMiningCalculation();
        });
    }
    
    // Initialize investment sliders
    const investmentSlider = document.getElementById('investment-slider');
    const investmentType = document.getElementById('investment-type');
    const investmentDuration = document.getElementById('investment-duration');
    const riskLevel = document.getElementById('risk-level');
    
    if (investmentSlider) {
        investmentSlider.addEventListener('input', function() {
            currentInvestmentData.amount = parseInt(this.value);
            document.getElementById('investment-value').textContent = 
                parseInt(this.value).toLocaleString() + ' MAD';
            updateInvestmentCalculation();
        });
    }
    
    if (investmentType) {
        investmentType.addEventListener('change', function() {
            currentInvestmentData.type = this.value;
            updateInvestmentCalculation();
        });
    }
    
    if (investmentDuration) {
        investmentDuration.addEventListener('change', function() {
            currentInvestmentData.duration = parseInt(this.value);
            updateInvestmentCalculation();
        });
    }
    
    if (riskLevel) {
        riskLevel.addEventListener('change', function() {
            currentInvestmentData.risk = this.value;
            updateInvestmentCalculation();
        });
    }
    
    // Initial calculations
    updateMiningCalculation();
    updateInvestmentCalculation();
}

// Calculate mining profitability
function calculateMining() {
    updateMiningCalculation();
    
    // Add visual feedback
    const button = event?.target;
    if (button) {
        button.classList.add('pulse-green');
        setTimeout(() => {
            button.classList.remove('pulse-green');
        }, 1000);
    }
}

function updateMiningCalculation() {
    const params = miningParams[currentMiningData.crypto];
    const hashrate = currentMiningData.hashrate;
    const electricityCost = currentMiningData.electricityCost;
    const duration = currentMiningData.duration;
    
    // Calculate daily mining rewards
    const userShare = hashrate / params.networkHashrate;
    const dailyReward = userShare * params.blockReward * params.blocksPerDay;
    const dailyRevenue = dailyReward * params.price;
    
    // Calculate electricity costs (assuming 3.5kW per TH/s)
    const dailyElectricityCost = hashrate * 3.5 * 24 * electricityCost / 1000;
    const dailyProfit = dailyRevenue - dailyElectricityCost;
    
    // Calculate totals
    const monthlyProfit = dailyProfit * 30;
    const totalProfit = dailyProfit * 30 * duration;
    const totalRevenue = dailyRevenue * 30 * duration;
    
    // Calculate profitability percentage
    const totalElectricityCost = dailyElectricityCost * 30 * duration;
    const profitability = totalElectricityCost > 0 ? 
        ((totalRevenue - totalElectricityCost) / totalElectricityCost) * 100 : 0;
    
    // Update UI
    updateMiningUI({
        dailyProfit,
        monthlyProfit,
        totalProfit,
        totalRevenue,
        profitability,
        crypto: currentMiningData.crypto.toUpperCase()
    });
    
    // Update chart
    updateMiningChart();
}

function updateMiningUI(data) {
    const crypto = data.crypto;
    
    // Daily earnings
    const dailyEarnings = document.getElementById('daily-earnings');
    const dailyEarningsMAD = document.getElementById('daily-earnings-mad');
    if (dailyEarnings) {
        dailyEarnings.textContent = (data.dailyProfit / miningParams[currentMiningData.crypto].price).toFixed(6) + ' ' + crypto;
        dailyEarningsMAD.textContent = Math.round(data.dailyProfit).toLocaleString() + ' MAD';
    }
    
    // Monthly earnings
    const monthlyEarnings = document.getElementById('monthly-earnings');
    const monthlyEarningsMAD = document.getElementById('monthly-earnings-mad');
    if (monthlyEarnings) {
        monthlyEarnings.textContent = (data.monthlyProfit / miningParams[currentMiningData.crypto].price).toFixed(6) + ' ' + crypto;
        monthlyEarningsMAD.textContent = Math.round(data.monthlyProfit).toLocaleString() + ' MAD';
    }
    
    // Total earnings
    const totalEarnings = document.getElementById('total-earnings');
    const totalEarningsMAD = document.getElementById('total-earnings-mad');
    if (totalEarnings) {
        totalEarnings.textContent = (data.totalProfit / miningParams[currentMiningData.crypto].price).toFixed(6) + ' ' + crypto;
        totalEarningsMAD.textContent = Math.round(data.totalProfit).toLocaleString() + ' MAD';
    }
    
    // Profitability
    const profitabilityElement = document.getElementById('profitability');
    const profitStatus = document.getElementById('profit-status');
    if (profitabilityElement) {
        profitabilityElement.textContent = data.profitability.toFixed(1) + '%';
        
        if (data.profitability > 50) {
            profitStatus.textContent = 'Très rentable';
        } else if (data.profitability > 20) {
            profitStatus.textContent = 'Rentable';
        } else if (data.profitability > 0) {
            profitStatus.textContent = 'Légèrement rentable';
        } else {
            profitStatus.textContent = 'Non rentable';
        }
    }
}

function updateMiningChart() {
    const ctx = document.getElementById('miningChart');
    if (!ctx) return;
    
    if (miningChart) {
        miningChart.destroy();
    }
    
    const months = [];
    const earnings = [];
    const params = miningParams[currentMiningData.crypto];
    const dailyProfit = (currentMiningData.hashrate / params.networkHashrate) * 
                       params.blockReward * params.blocksPerDay * params.price - 
                       (currentMiningData.hashrate * 3.5 * 24 * currentMiningData.electricityCost / 1000);
    
    for (let i = 1; i <= Math.min(currentMiningData.duration, 24); i++) {
        months.push(`Mois ${i}`);
        earnings.push(Math.round(dailyProfit * 30 * i));
    }
    
    miningChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [{
                label: 'Revenus cumulés (MAD)',
                data: earnings,
                borderColor: '#10B981',
                backgroundColor: 'rgba(16, 185, 129, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                }
            }
        }
    });
}

// Calculate investment ROI
function calculateInvestment() {
    updateInvestmentCalculation();
    
    // Add visual feedback
    const button = event?.target;
    if (button) {
        button.classList.add('pulse-green');
        setTimeout(() => {
            button.classList.remove('pulse-green');
        }, 1000);
    }
}

function updateInvestmentCalculation() {
    const params = investmentParams[currentInvestmentData.type];
    const amount = currentInvestmentData.amount;
    const duration = currentInvestmentData.duration;
    
    // Calculate ROI based on risk level
    let baseROI;
    switch(currentInvestmentData.risk) {
        case 'low':
            baseROI = (params.minROI + params.maxROI) / 2 - 2;
            break;
        case 'high':
            baseROI = (params.minROI + params.maxROI) / 2 + 2;
            break;
        default:
            baseROI = (params.minROI + params.maxROI) / 2;
    }
    
    // Add some randomness for realism
    const roiVariation = (Math.random() - 0.5) * 4;
    const actualROI = Math.max(5, Math.min(40, baseROI + roiVariation));
    
    // Calculate returns
    const monthlyROI = actualROI / 12 / 100;
    const totalReturn = amount * Math.pow(1 + monthlyROI, duration);
    const netProfit = totalReturn - amount;
    const monthlyIncome = netProfit / duration;
    
    // Update UI
    updateInvestmentUI({
        roi: actualROI,
        totalReturn,
        netProfit,
        monthlyIncome
    });
}

function updateInvestmentUI(data) {
    // Expected ROI
    const expectedROI = document.getElementById('expected-roi');
    if (expectedROI) {
        expectedROI.textContent = data.roi.toFixed(1) + '%';
    }
    
    // Total return
    const totalReturn = document.getElementById('total-return');
    if (totalReturn) {
        totalReturn.textContent = Math.round(data.totalReturn).toLocaleString() + ' MAD';
    }
    
    // Net profit
    const netProfit = document.getElementById('net-profit');
    if (netProfit) {
        netProfit.textContent = Math.round(data.netProfit).toLocaleString() + ' MAD';
    }
    
    // Monthly income
    const monthlyIncome = document.getElementById('monthly-income');
    if (monthlyIncome) {
        monthlyIncome.textContent = Math.round(data.monthlyIncome).toLocaleString() + ' MAD';
    }
}

// Select investment type from comparison table
function selectInvestmentType(type) {
    const investmentTypeSelect = document.getElementById('investment-type');
    if (investmentTypeSelect) {
        investmentTypeSelect.value = type;
        currentInvestmentData.type = type;
        updateInvestmentCalculation();
        
        // Scroll to investment simulator
        document.getElementById('investment-type').scrollIntoView({ 
            behavior: 'smooth',
            block: 'center'
        });
    }
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm ${
        type === 'success' ? 'bg-green-600 text-white' :
        type === 'error' ? 'bg-red-600 text-white' :
        type === 'warning' ? 'bg-yellow-600 text-white' :
        'bg-blue-600 text-white'
    }`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
        notification.style.opacity = '1';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeSimulators();
    
    // Add event listeners for language selector
    document.getElementById('language-select')?.addEventListener('change', function(e) {
        console.log('Language changed to:', e.target.value);
    });
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Export functions for global use
window.calculateMining = calculateMining;
window.calculateInvestment = calculateInvestment;
window.selectInvestmentType = selectInvestmentType;
