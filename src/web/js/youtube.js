var startTime = 0,
endTime = 1

async function get_youtube_link(){
    const video = document.querySelector('video')
    const url_in = document.querySelector('input').value
    const res = await eel.get_youtube_link(url_in)()
    document.querySelector('.video-container').style.display = 'block'
    video.src = await res
}

function setStart(e) {
    const video = document.querySelector('video')
    startTime = parseInt(video.currentTime)
    e.target.textContent = startTime
    showDl()
}

function setEnd(e) {
    const video = document.querySelector('video')
    endTime = parseInt(video.currentTime)
    e.target.textContent = endTime
    showDl()
}

function download() {
    const video = document.querySelector('video')
    const fileName = document.querySelector('#filename')
    eel.download(video.src, startTime, endTime, fileName.value)()
}

eel.expose(complete)
function complete(msg) {
    const el = document.querySelector('#response')
    el.textContent += `${msg}\n`
    el.style.color = 'var(--green)'
    window.scrollTo(0, document.body.scrollHeight);
}

eel.expose(fail)
function fail(msg) {
    const el = document.querySelector('#response')
    el.textContent += `${msg}\n`
    el.style.color = 'red'
    window.scrollTo(0, document.body.scrollHeight);
}

function showDl() {
    document.querySelector('.dl-btn-container').style.display = 'grid';
}