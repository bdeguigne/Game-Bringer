import moment from "moment";

export function getVideoTrailer(videos) {
    var videoID = null;

    if (videos && videos.length > 0) {
        var video = videos.find(video => video.name === "Trailer");

        if (!video) {
            //If no trailer, take the first video
            videoID = videos[0].video_id;
        } else {
            videoID = video.video_id;
        }
    }

    return videoID;
}

export function getRandom(arr, n) {
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
}

export function findCompany(involved_companies, type = "developer") {
    let company = null;
    if (involved_companies) {
        involved_companies.forEach(involved_company => {
            if (type === "developer" && involved_company.developer === true) {
                company = {
                    name: involved_company.company.name,
                    logoID: involved_company.company.logo ? involved_company.company.logo.image_id : null
                }
            } else if (type === "publisher" && involved_company.publisher === true) {
                company = {
                    name: involved_company.company.name,
                    logoID: involved_company.company.logo ? involved_company.company.logo.image_id : null
                }
            }
        })
    }
    return company;
}


export function getElapsedTime(dates, firstReleaseDateUnix) {
    let releaseDate = null;

    if (dates && Array.isArray(dates) && firstReleaseDateUnix) {
        dates.forEach(date => {
            if (date.date === firstReleaseDateUnix) {
                if (date.category !== undefined && date.category === 0) {
                    releaseDate = {
                        elapsedTime: moment.unix(date.date).fromNow(),
                        date: date.human,
                        isReleased: moment().unix() < moment.unix(date.date)
                    }
                } else {
                    releaseDate = {
                        date: date.human,
                        isReleased: false
                    }
                }
                return releaseDate;

            }
        })
    } else if (dates) {
        if (dates.category !== undefined && dates.category === 0) {
            releaseDate = {
                elapsedTime: moment.unix(dates.date).fromNow(),
                date: dates.human,
                isReleased: moment().unix() < dates.date
            }
        } else {
            releaseDate = {
                date: dates.human,
                isReleased: false
            }
        }
        return releaseDate;
    }
    return releaseDate;
}
