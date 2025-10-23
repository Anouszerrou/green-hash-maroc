#!/usr/bin/env python3
"""
Green Hash Maroc - Development Server Runner
Simple script to run the Flask application with hot reload
"""

import os
import sys
from app import app

def main():
    print("🌿 Green Hash Maroc - Development Server")
    print("=" * 50)
    print("Starting Flask development server with hot reload...")
    print("\n📱 Access the website at: http://localhost:5000")
    print("🔧 Debug mode: ON")
    print("🔄 Hot reload: ON")
    print("\nPress Ctrl+C to stop the server\n")
    
    try:
        # Run the Flask application
        app.run(
            host='0.0.0.0',
            port=5000,
            debug=True,
            use_reloader=True,
            threaded=True
        )
    except KeyboardInterrupt:
        print("\n\n👋 Server stopped. Goodbye!")
        sys.exit(0)
    except Exception as e:
        print(f"\n❌ Error starting server: {e}")
        sys.exit(1)

if __name__ == '__main__':
    main()