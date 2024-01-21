Steps to up and running the client

1. Navigate to the client project directory
2. Remove node_modules
    rm -rf node_modules
3. Remove package_lock
    rm package-lock.json
4. Run npm install (optional force)
    npm install
    npm install --force

5. Start NPM server considering desired IP and port
    npm start -b 192.168.10.104 -p 3000
6. Browse the page at
    http://192.168.10.104:3000
