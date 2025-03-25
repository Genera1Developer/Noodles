// ==UserScript==
// @name         Basic Webpage Defacement
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Replaces the content of the page with a custom message and styling.  Use with caution!
// @author       You (Edit this!)
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Customize these variables!
    const newTitle = "Hacked!";
    const newMessage = "This website has been defaced!  Consider this a demonstration of potential security vulnerabilities. Please improve your security measures.";
    const backgroundColor = "red";
    const textColor = "white";
    const fontSize = "24px";


    document.title = newTitle;

    // Clear the entire body
    document.body.innerHTML = '';

    // Apply styles to the body
    document.body.style.backgroundColor = backgroundColor;
    document.body.style.color = textColor;
    document.body.style.fontFamily = "Arial, sans-serif";
    document.body.style.fontSize = fontSize;
    document.body.style.textAlign = "center";
    document.body.style.padding = "50px";

    // Create a new element to hold the message
    const messageElement = document.createElement('div');
    messageElement.textContent = newMessage;

    // Append the message to the body
    document.body.appendChild(messageElement);

    //Optional: Add an image
    //const imageElement = document.createElement('img');
    //imageElement.src = "URL_OF_IMAGE_HERE"; // Replace with your image URL
    //document.body.appendChild(imageElement);


})();