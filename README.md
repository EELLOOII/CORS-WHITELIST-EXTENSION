# CORS Whitelist Extension

A Chrome extension that allows you to easily enable CORS (Cross-Origin Resource Sharing) for specific websites by managing a whitelist of domains.

## Features

- Enable/disable CORS for specific websites with a single click
- Manage whitelist of domains through an options page
- Real-time CORS rule updates
- Includes a CORS testing tool
- Simple and intuitive user interface

## Installation

1. Clone this repository or download the source code
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the extension directory

## Usage

### Popup Interface
- Click the extension icon in your browser toolbar
- The current website's domain will be displayed
- Click the toggle button to enable/disable CORS for the current site

### Options Page
- Access the options page by right-clicking the extension icon and selecting "Options"
- View all whitelisted domains
- Add new domains manually
- Remove domains from the whitelist

### CORS Tester
- Open `cors-tester.html` to test CORS functionality
- Enter a URL to test
- Choose between GET and POST methods
- Add request body for POST requests
- View detailed response headers and status

## Technical Details

The extension uses Chrome's `declarativeNetRequest` API to modify headers for whitelisted domains. When a domain is whitelisted, the following headers are set:
- `Access-Control-Allow-Origin: *`
- `Access-Control-Allow-Methods: GET,POST,PUT,DELETE,OPTIONS`

## Files Structure

- `manifest.json` - Extension configuration
- `popup.html/js` - Main extension popup interface
- `options.html/js` - Whitelist management interface
- `background.js` - Background service worker for header modifications
- `cors-tester.html` - CORS testing utility

## Permissions

This extension requires the following permissions:
- `storage` - For saving whitelist data
- `declarativeNetRequest` - For modifying response headers
- `declarativeNetRequestWithHostAccess` - For host permissions
- Host permissions for all HTTP/HTTPS URLs

## License

This project is open source and available for use and modification.