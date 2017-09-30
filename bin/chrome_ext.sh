
#!/bin/bash

# Remove any chrome-extension directory
rm -rf chrome-extension

# Remove any still.zip files
rm still.zip

# Create a new chrome-extension directory
mkdir chrome-extension

# Copy the index.html page into the chrome-extension directory
cp index.html chrome-extension

# Copy the dist folder into the chrome-extension directory
cp -r dist chrome-extension

# Copy the img folder into the chrome-extension directory
cp -r img chrome-extension

# Copy the chrome extension specific files into the chrome-extension directory
cp -r chrome-ext-files/* chrome-extension

# Remove all sourcemap files from the chrome-extension directory
find chrome-extension/dist -name '*.map' -type f -delete

# Remove all .DS_Store files from the chrome-extension directory
find chrome-extension -name '.DS_Store' -type f -delete

# Compress the chrome-extension directory into a zip file
zip -r still.zip chrome-extension

