let sites = {
  'YouTube': 'https://www.youtube.com',
  'Instagram': 'https://www.instagram.com',
  'OpenAI': 'https://openai.com',
  'KinoPub': 'https://kino.pub'
};

let statuses = [];
let checked = 0;

Object.keys(sites).forEach(site => {
  let startTime = Date.now();
  $httpClient.head(sites[site], function (error) {
    let pingTime = error ? 'N/A' : (Date.now() - startTime) + ' ms';
    statuses.push(`${site}: ${pingTime}`);
    checked++;

    if (checked === Object.keys(sites).length) {
      let content = statuses.join('\n');

      $done({
        title: 'Доступность сервисов',
        content: content,
        backgroundColor: '#4CAF50',
        icon: 'waveform.path.ecg',
      });
    }
  });
});
