Random Password Generator
===
This is a useful tool to generate customized random password within few steps.  
You can decide the length of the password, the types of elements to include (e.g., lowercase characters, uppercase characters, numbers), and the specific elements to be excluded.

To enhance user experience, the project utilizes AJAX to avoid redirecting the website each time a submission is made.  

The project could be enhanced by adding an alert for an empty password length field and by ensuring that the password length adheres to the specified range of 4-16 characters.
## Screen
![startPage](https://i.imgur.com/YD2I7PJ.png)
![generatedPassword](https://i.imgur.com/tS2wUYJ.png)

## Environment
node.js v18.15.0

## Installation
1. Git clone the project to local
  ```
  git clone https://github.com/Yujie-liang/passwordGenerator.git
  ```
2. Install packages in the local project folder
  ```
  npm i express
  npm i express-handlebars
  ```
3. Run the project with the command below:
  ```
  npm run dev
  ```
4. Now you can give it a try on http://localhost:3000
