// === GreenHash Maroc — Wallet Connection ===

// Vérifie si MetaMask est dispo
async function connectMetaMask() {
  if (typeof window.ethereum === 'undefined') {
    alert('MetaMask non détecté. Installe MetaMask ou un wallet compatible.');
    return;
  }

  try {
    // Demande d’accès au compte
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const walletAddress = accounts[0];
    console.log('Wallet connecté :', walletAddress);

    // Appel du backend Flask
    const response = await fetch('/api/wallet/connect', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ wallet_address: walletAddress })
    });

    if (!response.ok) throw new Error(`Erreur backend (${response.status})`);
    const data = await response.json();
    console.log('Réponse API:', data);

    alert('Wallet connecté avec succès !');
  } catch (err) {
    console.error('Erreur de connexion MetaMask:', err);
    alert('Erreur : ' + err.message);
  }
}

// Bouton de connexion (si présent dans le DOM)
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('connectWalletBtn');
  if (btn) {
    btn.addEventListener('click', connectMetaMask);
  }
});
