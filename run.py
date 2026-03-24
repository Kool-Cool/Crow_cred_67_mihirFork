import sys
import os

# Guarantee the root folder is part of the Python path so the "backend" package can be found
sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))

from backend.app import create_app

app = create_app()

if __name__ == '__main__':
    print("Starting CrowCred Backend Server...")
    app.run(debug=True, port=5000)
