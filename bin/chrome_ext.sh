
#!/bin/bash

# Remove any chrome-extension directory
rm -rf chrome-extension

# Create a new chrome-extension directory
mkdir chrome-extension

# Copy the index.html page into the chrome-extension directory
cp index.html chrome-extension

# Copy the files from the dist folder into the chrome-extension directory
cp -r dist chrome-extension

# Copy the chrome extension specific files into the chrome-extension directory
cp -r chrome-ext-files/* chrome-extension

# Compress the chrome-extension directory into a zip file
zip -r still.zip chrome-extension

