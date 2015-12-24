# bwi-aem-msite
Best Western AEM M-Site

 - Build Process - 
This project utilizes node.js to manage the compilation of assets (html, javascript, and less) from src to dist.

1. To begin, node.js must be installed. See:  http://nodejs.org/download/

2. Open the node.js command prompt and enter:   npm install -g bower 

3. Clone the github repository (if this has not been done already).

4. The packages utilized in this project are listed in package.json. To install all of these, open the node.js command prompt and set the working directory in the node.js command prompt to the location containing the package.json folder and enter: npm -d install 

5. The front-end packages utilized in this project are contained within the bower.json file. Bower relies on Git to manage packages, therefore if Git is not installed, this must be installed. See: http://git-scm.com/

6. Open the git shell and set the working directory to the location containing bower.json and enter: bower install.

7. Install gulp globally and locally, you may need to preface the commands with 'sudo '. If you are experiencing build issues, you may need to clear the cache (npm cache clean), delete and reinstall gulp-less (npm install gulp-less) or install an older version of gulp such as gulp@3.8.7
Global: npm install -g gulp
Local: npm install gulp

8. Once this is completed, all dependencies should be loaded. There are a few commands to assist in the development process that can be entered from the node.js command prompt at the base level directory.

gulp build:assets - Copies all of the assets in the src/assets directory and moves them to dist/assets.
gulp build:styles - Compiles the less styles in src/styles into css in the dist/styles directory.
gulp build:scripts - Copies all of the scripts in the src/scripts directory and moves them to dist/scripts.

gulp server - Starts a server and sets watchers on the assets/styles/scripts in the src folder and executes the build process for the approprite file changed (eg: a script change triggers build:scripts to run). The root level of the server is the "dist" directory. To serve the index page, you must navigate to localhost:8080/assets/index.html.

The server will refresh the page automatically on any change to the dist directory.

**NOTE** There is currently a bug in the logic for the server. If the less compilation fails, the server stops running tasks.