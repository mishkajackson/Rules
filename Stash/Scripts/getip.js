$httpClient.get('https://ipapi.co/json/', function (error, response, data) {
  if (error) {
    $done({ title: 'IP', content: 'Error fetching data', backgroundColor: '#ff0000' });
  } else {
    let info = JSON.parse(data);
    
    // Выполняем ping до Cloudflare
    let startTime = Date.now();
    $httpClient.get('https://1.1.1.1/cdn-cgi/trace', function (pingError, pingResponse, pingData) {
      let pingTime = pingError ? 'N/A' : (Date.now() - startTime) + ' ms';
      
      let content = `${info.ip}\n${info.city}\n${info.org}\n${pingTime}`;
      
      $done({
        title: 'Информация',
        content: content,
        backgroundColor: '#696aad',
        icon: 'network',
      });
    });
  }
});