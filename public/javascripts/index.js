const form = document.querySelector('.form-dialog');
form.addEventListener('submit', function (event) {
  event.preventDefault(); // 阻止表單的預設提交行為
  console.log('in');
  // 獲取表單數據
  const formData = new FormData(form);
  console.log(formData)
  // 將 FormData 對象轉換為 JavaScript 物件
  const formDataObject = {};
  for (const [key, value] of formData.entries()) {
    formDataObject[key] = value;
    console.log(`${key}:${value}`)
  }
  // 先判斷是否至少有一個 character set，若無，提醒需選取至少一類字元；若有，繼續生成密碼
  if (!formDataObject.lowerChars && !formDataObject.upperChars && !formDataObject.numbers && !formDataObject.symbols) {
    document.getElementById('notification').innerHTML = `<p id="description">Your password is:
          <span id="result">You must select as least one character set</span>
          </p>`;
    return;
  }
  // 將 FormData 對象轉換為 URL 字串，否則即使post時設定content-type為application/x-www-form-urlencoded，依然會使用multipart/formData格式傳輸
  const urlEncodedFormData = new URLSearchParams(formData).toString();
  // 使用 AJAX 發送 POST 請求
  fetch('/', {
    method: 'POST',
    body: urlEncodedFormData,
    //用formData時，預設使用multipart/form-data格式發送，但express無法解析，因此要改為application/x-www-form-urlencoded格式
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
    .then(response => response.json())
    .then(data => {
      // 在這裡更新前端畫面
      document.getElementById('notification').innerHTML = `<p id="description">Your password is:
          <span id="result">${data.password}</span>
          </p>`;
    })
    .catch(error => {
      console.error('Error:', error);
    });
});
