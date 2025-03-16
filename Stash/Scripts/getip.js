$httpClient.get('https://ipapi.co/json/', function (error, response, data) {
  if (error) {
    $done({ title: 'IP', content: 'Error fetching data', backgroundColor: '#ff0000' });
  } else {
    let info = JSON.parse(data);

    // Выполняем ping до Cloudflare
    let startTime = Date.now();
    $httpClient.get('https://1.1.1.1/cdn-cgi/trace', function (pingError, pingResponse, pingData) {
      let pingTime = pingError ? 'N/A' : (Date.now() - startTime) + ' ms';

      // Проверяем пинг до сайтов
      let sites = {
        'YouTube': 'https://www.youtube.com',
        'Instagram': 'https://www.instagram.com',
        'OpenAI': 'https://openai.com'
      };

      let statuses = [];
      let checked = 0;

      Object.keys(sites).forEach(site => {
        let siteStartTime = Date.now();
        $httpClient.get(sites[site], function (siteError) {
          let sitePing = siteError ? 'N/A' : (Date.now() - siteStartTime) + ' ms';
          statuses.push(`${site}: ${sitePing}`);
          checked++;

          // Когда все сайты проверены, формируем контент и завершаем выполнение
          if (checked === Object.keys(sites).length) {
            let content = `${info.ip}\n${info.city}\n${info.org}\nCloudflare: ${pingTime}\n\n` + statuses.join('\n');
            
            $done({
              title: 'Информация',
              content: content,
              backgroundColor: '#696aad',
              icon: 'network',
            });
          }
        });
      });
    });
  }
});