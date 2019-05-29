# HiFIVE v3

HiFIVE website project. The website is made for client from Christchurch hospital.

## Getting Started

Get the project using git:

- git clone https://github.com/lindsayXue/HiFIVE-v3.git.
- Run npm install in both server and client directory to get project dependencies installed. Npm is installed when you install node.js.
- Cd server/config, add a default.json(development) file which include database secret, jwt secret, session secret, and google client ID and secret.
- Cd server/config, add passport_setup.js file which include passport google oauth2.0 setup.
- Run npm dev to test in development mode.
