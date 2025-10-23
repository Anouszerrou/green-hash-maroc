#!/usr/bin/env python3
"""
Green Hash Maroc - Backend API
Flask application with database integration for mining pool, exchange, and user management
"""

from flask import Flask, jsonify, request, render_template, session
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timedelta
import hashlib
import json
import random
import time
from decimal import Decimal

app = Flask(__name__)
app.config['SECRET_KEY'] = 'green-hash-maroc-secret-key-2025'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///greenhash.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
CORS(app)

# Database Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    wallet_address = db.Column(db.String(42), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    hash_rate = db.Column(db.Float, default=0.0)
    total_mined = db.Column(db.Float, default=0.0)
    balance = db.Column(db.Float, default=0.0)

class MiningStats(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    total_hash_rate = db.Column(db.Float, default=0.0)
    active_miners = db.Column(db.Integer, default=0)
    blocks_found = db.Column(db.Integer, default=0)
    energy_produced = db.Column(db.Float, default=0.0)
    btc_price = db.Column(db.Float, default=0.0)

class Transaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    type = db.Column(db.String(20), nullable=False)  # mining, exchange, investment
    amount = db.Column(db.Float, nullable=False)
    currency = db.Column(db.String(10), nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    status = db.Column(db.String(20), default='completed')

class Investment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    investment_type = db.Column(db.String(20), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    status = db.Column(db.String(20), default='active')

# Initialize database
with app.app_context():
    db.create_all()
    
    # Initialize default data if empty
    if MiningStats.query.count() == 0:
        # Add sample mining stats
        for i in range(7):
            stat = MiningStats(
                total_hash_rate=random.uniform(10.5, 13.5),
                active_miners=random.randint(1000, 1500),
                blocks_found=random.randint(15, 30),
                energy_produced=random.uniform(2.0, 3.0),
                btc_price=random.uniform(420000, 450000)
            )
            db.session.add(stat)
        
        db.session.commit()

# API Routes

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/stats/realtime')
def get_realtime_stats():
    """Get real-time mining statistics"""
    latest_stats = MiningStats.query.order_by(MiningStats.timestamp.desc()).first()
    
    if not latest_stats:
        # Generate sample data
        stats = {
            'total_hash_rate': round(random.uniform(12.0, 13.0), 1),
            'active_miners': random.randint(1200, 1300),
            'blocks_found_today': random.randint(120, 140),
            'energy_produced': round(random.uniform(2.3, 2.6), 2),
            'btc_price': round(random.uniform(430000, 440000), 2)
        }
    else:
        stats = {
            'total_hash_rate': round(latest_stats.total_hash_rate, 1),
            'active_miners': latest_stats.active_miners,
            'blocks_found_today': latest_stats.blocks_found,
            'energy_produced': round(latest_stats.energy_produced, 2),
            'btc_price': round(latest_stats.btc_price, 2)
        }
    
    return jsonify(stats)

@app.route('/api/mining/hashrate')
def get_hashrate_history():
    """Get hashrate history for charts"""
    stats = MiningStats.query.order_by(MiningStats.timestamp.desc()).limit(24).all()
    
    data = {
        'labels': [],
        'values': []
    }
    
    for stat in reversed(stats):
        data['labels'].append(stat.timestamp.strftime('%H:%M'))
        data['values'].append(round(stat.total_hash_rate, 1))
    
    return jsonify(data)

@app.route('/api/mining/blocks')
def get_blocks_history():
    """Get blocks found history"""
    stats = MiningStats.query.order_by(MiningStats.timestamp.desc()).limit(7).all()
    
    data = {
        'labels': ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
        'values': [stat.blocks_found for stat in reversed(stats)]
    }
    
    return jsonify(data)

@app.route('/api/exchange/rates')
def get_exchange_rates():
    """Get current exchange rates"""
    rates = {
        'BTC': {
            'price': round(random.uniform(430000, 440000), 2),
            'change': round(random.uniform(-2, 2), 2)
        },
        'ETH': {
            'price': round(random.uniform(22000, 24000), 2),
            'change': round(random.uniform(-3, 3), 2)
        },
        'USDT': {
            'price': 10.00,
            'change': 0.00
        },
        'DOGE': {
            'price': round(random.uniform(1.0, 1.5), 2),
            'change': round(random.uniform(-5, 5), 2)
        }
    }
    
    return jsonify(rates)

@app.route('/api/wallet/connect', methods=['POST'])
def connect_wallet():
    """Connect a Web3 wallet"""
    data = request.get_json()
    wallet_address = data.get('wallet_address')
    
    if not wallet_address:
        return jsonify({'error': 'Wallet address required'}), 400
    
    # Check if user exists
    user = User.query.filter_by(wallet_address=wallet_address).first()
    
    if not user:
        # Create new user
        user = User(wallet_address=wallet_address)
        db.session.add(user)
        db.session.commit()
    
    session['wallet_address'] = wallet_address
    session['user_id'] = user.id
    
    return jsonify({
        'success': True,
        'user': {
            'id': user.id,
            'wallet_address': user.wallet_address,
            'balance': user.balance,
            'hash_rate': user.hash_rate,
            'total_mined': user.total_mined
        }
    })

@app.route('/api/wallet/balance')
def get_wallet_balance():
    """Get wallet balance"""
    wallet_address = session.get('wallet_address')
    
    if not wallet_address:
        return jsonify({'error': 'Not connected'}), 401
    
    user = User.query.filter_by(wallet_address=wallet_address).first()
    
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    return jsonify({
        'balance': user.balance,
        'hash_rate': user.hash_rate,
        'total_mined': user.total_mined
    })

@app.route('/api/mining/join', methods=['POST'])
def join_mining_pool():
    """Join mining pool"""
    data = request.get_json()
    wallet_address = data.get('wallet_address')
    
    if not wallet_address:
        return jsonify({'error': 'Wallet address required'}), 400
    
    # Simulate joining pool
    return jsonify({
        'success': True,
        'message': 'Successfully joined mining pool',
        'pool_address': 'stratum.greenhash.ma:3333',
        'worker_name': f'{wallet_address}.worker1'
    })

@app.route('/api/exchange/swap', methods=['POST'])
def execute_swap():
    """Execute cryptocurrency swap"""
    data = request.get_json()
    
    from_currency = data.get('from_currency')
    to_currency = data.get('to_currency')
    amount = data.get('amount')
    
    if not all([from_currency, to_currency, amount]):
        return jsonify({'error': 'Missing parameters'}), 400
    
    # Simulate swap execution
    rate = random.uniform(0.8, 1.2)
    received_amount = amount * rate
    
    return jsonify({
        'success': True,
        'transaction_id': hashlib.md5(f'{time.time()}{amount}'.encode()).hexdigest(),
        'from_currency': from_currency,
        'to_currency': to_currency,
        'amount': amount,
        'received_amount': round(received_amount, 8),
        'rate': round(rate, 6)
    })

@app.route('/api/invest/create', methods=['POST'])
def create_investment():
    """Create new investment"""
    data = request.get_json()
    
    wallet_address = data.get('wallet_address')
    investment_type = data.get('investment_type')
    amount = data.get('amount')
    
    if not all([wallet_address, investment_type, amount]):
        return jsonify({'error': 'Missing parameters'}), 400
    
    user = User.query.filter_by(wallet_address=wallet_address).first()
    
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    # Create investment
    investment = Investment(
        user_id=user.id,
        investment_type=investment_type,
        amount=amount
    )
    
    db.session.add(investment)
    db.session.commit()
    
    return jsonify({
        'success': True,
        'investment_id': investment.id,
        'message': 'Investment created successfully'
    })

@app.route('/api/contact/send', methods=['POST'])
def send_contact_message():
    """Send contact message"""
    data = request.get_json()
    
    name = data.get('name')
    email = data.get('email')
    subject = data.get('subject')
    message = data.get('message')
    
    if not all([name, email, subject, message]):
        return jsonify({'error': 'Missing parameters'}), 400
    
    # Simulate sending email
    return jsonify({
        'success': True,
        'message': 'Message sent successfully. We will respond within 24 hours.'
    })

@app.route('/api/community/join', methods=['POST'])
def join_community():
    """Join community"""
    data = request.get_json()
    
    name = data.get('name')
    email = data.get('email')
    level = data.get('level')
    
    if not all([name, email, level]):
        return jsonify({'error': 'Missing parameters'}), 400
    
    return jsonify({
        'success': True,
        'message': 'Welcome to Green Hash community! Check your email for access links.'
    })

@app.route('/api/market/analysis')
def get_market_analysis():
    """Get market analysis data"""
    data = {
        'market_size_2025': 1200,  # millions USD
        'market_size_2030': 5000,  # millions USD
        'growth_rate': 300,  # percentage
        'africa_potential': 'High',
        'morocco_position': 'Leading'
    }
    
    return jsonify(data)

@app.route('/api/energy/production')
def get_energy_production():
    """Get energy production data"""
    data = {
        'current_production': round(random.uniform(2.3, 2.7), 2),
        'daily_average': 2.5,
        'efficiency': 94.2,
        'carbon_saved': 1250,  # tons CO2
        'renewable_percentage': 100
    }
    
    return jsonify(data)

# WebSocket for real-time updates (simplified)
@app.route('/api/ws/stats')
def websocket_stats():
    """WebSocket endpoint for real-time stats"""
    # This would normally use Flask-SocketIO
    # For now, return current stats
    return get_realtime_stats()

# Error handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Endpoint not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)