$httpClient.get('https://api.my-ip.io/ip', function (error, response, data) {
  if (error) {
    $done({ title: 'IP Address', content: 'Error fetching IP', backgroundColor: '#ff0000' });
  } else {
    $done({ title: 'Current IP', content: data, backgroundColor: '#663399', icon: 'network' });
  }
});
