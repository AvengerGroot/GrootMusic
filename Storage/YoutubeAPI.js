var google = require('googleapis');

module.exports = {
    getVideo: function (query) {
        return new Promise(function (resolve, reject) {
            var service = google.youtube('v3');
            service.search.list({
                auth: `	AIzaSyAwCiZ_BYxYPjyVyaRsU-16NGWfHq5BBSE`,
                part: 'id,snippet',
                type: `video`,
                q: query,
            }, function (err, response) {
                if (err) {
                    reject('The API returned an error: ' + err);
                }
             else {
                    var video = {
                        title: response.items[0].snippet.title,
                        url: `https://www.youtube.com/watch?v=${response.items[0].id.videoId}`,
                        thumbnail: response.items[0].snippet.thumbnails.high.url,
                        description: response.items[0].snippet.description,
                        publishedDate: response.items[0].snippet.publishedAt
                    };
                    resolve(video);
                }
            });
        });
    }
}
