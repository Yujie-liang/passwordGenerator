const express = require('express');
const { engine } = require('express-handlebars');
const app = express();
const port = 3000;

app.engine('.hbs', engine({ extname: 'hbs' }))
app.set('view engine', '.hbs');
app.set('views', './views');

app.use(express.static('public'));
app.use(express.urlencoded({ extend: true }));

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  const formData = req.body;
  let result = '';
  result = generateRandomPassword(formData);
  res.json({ status: 200, password: result });
})

function generateRandomPassword(formData) {
  let passwordElement = '';
  let password = '';
  // 判斷passwordElement
  if (formData.lowerChars === 'on') {
    passwordElement += 'abcdefghijklmnopqrstuvwxyz';
  }
  if (formData.upperChars === 'on') {
    passwordElement += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  }
  if (formData.numbers === 'on') {
    passwordElement += '1234567890';
  }
  if (formData.symbols === 'on') {
    passwordElement += '!@#$%^&*()_+-=[]{}|;:,.<>?';
  }
  // 排除特定字元
  if (formData.exChars) {
    console.log(passwordElement);
    const escapedChars = escapeRegExp(formData.exChars); // 避免受正則表達式影響
    const re = new RegExp(`[${escapedChars}]`, 'g'); // 使用'g'確保escapeChars每次出現都被排除
    passwordElement = passwordElement.replace(re, '');
    console.log(passwordElement);
    console.log(formData.exChars);
  }

  // 生成password
  for (let i = 0; i < formData.passwordLength; i++) {
    password += passwordElement.charAt(Math.floor(Math.random() * passwordElement.length));
  }
  return password;
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

app.listen(port, () => {
  console.log(`express server is running on http://localhost:${port}`);
})