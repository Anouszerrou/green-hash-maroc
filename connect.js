// Green Hash Maroc - Web3 Wallet Connection
// Handles MetaMask, Trust Wallet, WalletConnect, and Ledger integration

let web3;
let currentAccount = null;
let currentWallet = null;

// Wallet configuration
const walletConfigs = {
    metamask: {
        name: 'MetaMask',
        icon: 'fab fa-ethereum',
        color: 'orange-500'
    },
    trustwallet: {
        name: 'Trust Wallet',
        icon: 'fas fa-shield-alt',
        color: 'blue-500'
    },
    walletconnect: {
        name: 'WalletConnect',
        icon: 'fas fa-link',
        color: 'purple-500'
    },
    ledger: {
        name: 'Ledger',
        icon: 'fas fa-microchip',
        color: 'gray-500'
    }
};

// Initialize Web3
function initializeWeb3() {
    if (typeof window.ethereum !== 'undefined') {
        web3 = new Web3(window.ethereum);
        console.log('Web3 initialized with MetaMask');
    } else if (typeof window.web3 !== 'undefined') {
        web3 = new Web3(window.web3.currentProvider);
        console.log('Web3 initialized with legacy provider');
    } else {
        // Fallback to HTTP provider (for testing)
        web3 = new Web3('https://mainnet.infura.io/v3/YOUR_INFURA_KEY');
        console.log('Web3 initialized with HTTP provider');
    }
}

// Check if wallet is installed
function isWalletInstalled(walletType) {
    switch(walletType) {
        case 'metamask':
            return typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask;
        case 'trustwallet':
            return typeof window.ethereum !== 'undefined' && window.ethereum.isTrust;
        case 'walletconnect':
            return true; // Always available
        case 'ledger':
            return typeof window.ledger !== 'undefined';
        default:
            return false;
    }
}

// Connect wallet function
async function connectWallet(walletType) {
    if (!isWalletInstalled(walletType)) {
        showNotification(`Veuillez installer ${walletConfigs[walletType].name} pour continuer`, 'warning');
        return;
    }
    
    try {
        showLoadingModal();
        
        let accounts = [];
        
        switch(walletType) {
            case 'metamask':
                accounts = await connectMetaMask();
                break;
            case 'trustwallet':
                accounts = await connectTrustWallet();
                break;
            case 'walletconnect':
                accounts = await connectWalletConnect();
                break;
            case 'ledger':
                accounts = await connectLedger();
                break;
        }
        
        if (accounts.length > 0) {
            currentAccount = accounts[0];
            currentWallet = walletType;
            
            // Update UI
            updateWalletStatus(walletType, currentAccount);
            
            // Save to backend
            await saveWalletConnection(currentAccount, walletType);
            
            // Show success and redirect to dashboard
            hideLoadingModal();
            showSuccessModal();
            
            setTimeout(() => {
                showDashboard();
            }, 2000);
            
        } else {
            throw new Error('No accounts found');
        }
        
    } catch (error) {
        console.error('Wallet connection error:', error);
        hideLoadingModal();
        showNotification('Erreur de connexion. Veuillez réessayer.', 'error');
    }
}

// MetaMask connection
async function connectMetaMask() {
    try {
        // Request account access
        const accounts = await window.ethereum.request({ 
            method: 'eth_requestAccounts' 
        });
        
        // Switch to appropriate network (example: Polygon)
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0x89' }] // Polygon Mainnet
            });
        } catch (switchError) {
            // If network doesn't exist, add it
            if (switchError.code === 4902) {
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [{
                        chainId: '0x89',
                        chainName: 'Polygon Mainnet',
                        rpcUrls: ['https://polygon-rpc.com'],
                        nativeCurrency: {
                            name: 'MATIC',
                            symbol: 'MATIC',
                            decimals: 18
                        },
                        blockExplorerUrls: ['https://polygonscan.com/']
                    }]
                });
            }
        }
        
        return accounts;
    } catch (error) {
        throw new Error('MetaMask connection failed: ' + error.message);
    }
}

// Trust Wallet connection
async function connectTrustWallet() {
    try {
        const accounts = await window.ethereum.request({ 
            method: 'eth_requestAccounts' 
        });
        return accounts;
    } catch (error) {
        throw new Error('Trust Wallet connection failed: ' + error.message);
    }
}

// WalletConnect connection
async function connectWalletConnect() {
    try {
        // Simulate WalletConnect connection
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Generate mock address for demo
        const mockAddress = '0x' + Array.from({length: 40}, () => 
            Math.floor(Math.random() * 16).toString(16)
        ).join('');
        
        return [mockAddress];
    } catch (error) {
        throw new Error('WalletConnect connection failed: ' + error.message);
    }
}

// Ledger connection
async function connectLedger() {
    try {
        // Simulate Ledger connection
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // Generate mock address for demo
        const mockAddress = '0x' + Array.from({length: 40}, () => 
            Math.floor(Math.random() * 16).toString(16)
        ).join('');
        
        return [mockAddress];
    } catch (error) {
        throw new Error('Ledger connection failed: ' + error.message);
    }
}

// Save wallet connection to backend
async function saveWalletConnection(walletAddress, walletType) {
    try {
        const response = await fetch('/api/wallet/connect', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                wallet_address: walletAddress,
                wallet_type: walletType
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            console.log('Wallet connection saved to backend');
        }
    } catch (error) {
        console.error('Failed to save wallet connection:', error);
    }
}

// Update wallet status in navigation
function updateWalletStatus(walletType, address) {
    const walletStatus = document.getElementById('wallet-status');
    const config = walletConfigs[walletType];
    
    if (walletStatus) {
        walletStatus.innerHTML = `
            <i class="fas fa-circle text-green-500 mr-1"></i>
            ${config.name} - ${address.substring(0, 6)}...${address.substring(38)}
        `;
        walletStatus.className = 'text-sm text-green-600';
    }
}

// Show/hide modals
function showLoadingModal() {
    const modal = document.getElementById('loadingModal');
    if (modal) {
        modal.classList.remove('hidden');
    }
}

function hideLoadingModal() {
    const modal = document.getElementById('loadingModal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

function showSuccessModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.remove('hidden');
    }
}

function hideSuccessModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.add('hidden');
    }
}

// Show dashboard
function showDashboard() {
    const dashboardSection = document.getElementById('dashboard-section');
    const walletSection = document.querySelector('section:nth-child(2)');
    
    if (dashboardSection && walletSection) {
        dashboardSection.classList.remove('hidden');
        walletSection.style.display = 'none';
        
        // Scroll to dashboard
        dashboardSection.scrollIntoView({ behavior: 'smooth' });
        
        // Load dashboard data
        loadDashboardData();
    }
}

// Load dashboard data
async function loadDashboardData() {
    try {
        // Load wallet balance
        const balanceResponse = await fetch('/api/wallet/balance', {
            headers: {
                'Authorization': `Bearer ${currentAccount}`
            }
        });
        
        if (balanceResponse.ok) {
            const balanceData = await balanceResponse.json();
            updateBalanceDisplay(balanceData);
        }
        
        // Load mining stats
        const miningResponse = await fetch('/api/stats/realtime');
        if (miningResponse.ok) {
            const miningData = await miningResponse.json();
            updateMiningDisplay(miningData);
        }
        
    } catch (error) {
        console.error('Failed to load dashboard data:', error);
    }
}

// Update balance display
function updateBalanceDisplay(data) {
    const elements = {
        'balance-btc': data.btc_balance || 0.0234,
        'balance-eth': data.eth_balance || 1.2456,
        'balance-ghm': data.ghm_balance || 1247,
        'balance-usdt': data.usdt_balance || 234.56
    };
    
    Object.entries(elements).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = typeof value === 'number' ? value.toFixed(4) : value;
        }
    });
}

// Update mining display
function updateMiningDisplay(data) {
    const elements = {
        'mining-hashrate': data.user_hash_rate || 2.5,
        'mining-earnings': data.daily_earnings || 0.0012,
        'mining-blocks': data.blocks_found || 3,
        'mining-efficiency': data.efficiency || 94.2
    };
    
    Object.entries(elements).forEach(([id, value]) => {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = typeof value === 'number' ? value.toFixed(value < 1 ? 4 : 1) : value;
        }
    });
}

// Disconnect wallet
function disconnectWallet() {
    currentAccount = null;
    currentWallet = null;
    
    // Reset UI
    const walletStatus = document.getElementById('wallet-status');
    if (walletStatus) {
        walletStatus.innerHTML = `
            <i class="fas fa-circle text-red-500 mr-1"></i>
            Non connecté
        `;
        walletStatus.className = 'text-sm text-gray-600';
    }
    
    // Show wallet selection
    const dashboardSection = document.getElementById('dashboard-section');
    const walletSection = document.querySelector('section:nth-child(2)');
    
    if (dashboardSection && walletSection) {
        dashboardSection.classList.add('hidden');
        walletSection.style.display = 'block';
    }
    
    // Clear session
    sessionStorage.removeItem('wallet_connected');
    sessionStorage.removeItem('wallet_address');
    sessionStorage.removeItem('wallet_type');
    
    showNotification('Wallet déconnecté', 'info');
}

// Check if already connected
function checkExistingConnection() {
    const walletConnected = sessionStorage.getItem('wallet_connected');
    const walletAddress = sessionStorage.getItem('wallet_address');
    const walletType = sessionStorage.getItem('wallet_type');
    
    if (walletConnected === 'true' && walletAddress && walletType) {
        currentAccount = walletAddress;
        currentWallet = walletType;
        
        updateWalletStatus(walletType, walletAddress);
        showDashboard();
    }
}

// Save connection to session
function saveConnectionToSession() {
    sessionStorage.setItem('wallet_connected', 'true');
    sessionStorage.setItem('wallet_address', currentAccount);
    sessionStorage.setItem('wallet_type', currentWallet);
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

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeWeb3();
    checkExistingConnection();
    
    // Add event listeners
    document.getElementById('language-select')?.addEventListener('change', function(e) {
        // Handle language change
        console.log('Language changed to:', e.target.value);
    });
    
    // Handle MetaMask account changes
    if (window.ethereum) {
        window.ethereum.on('accountsChanged', function(accounts) {
            if (accounts.length === 0) {
                disconnectWallet();
            } else if (accounts[0] !== currentAccount) {
                currentAccount = accounts[0];
                updateWalletStatus(currentWallet, currentAccount);
                saveConnectionToSession();
            }
        });
        
        window.ethereum.on('chainChanged', function(chainId) {
            // Reload page on network change
            window.location.reload();
        });
    }
});

// Export functions for global use
window.connectWallet = connectWallet;
window.disconnectWallet = disconnectWallet;
window.hideSuccessModal = hideSuccessModal;