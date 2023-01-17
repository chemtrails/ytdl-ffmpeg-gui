import subprocess
import eel
import youtube_dl

eel.init('web')

@eel.expose
def get_youtube_link(url_in):
    url_out = ''
    with youtube_dl.YoutubeDL({'format': 'best'}) as ydl:
        result = ydl.extract_info(url_in, download=False)
        video = result['entries'][0] if 'entries' in result else result
        url_out = video['url']
    return url_out

@eel.expose
def download(url, start, end, target):
    duration = end - start
    
    if duration < 1:
        eel.fail(f'{target}.mp4 - video too short')()
        return

    # print(f'ffmpeg -ss {start} -i "{url}" -t {duration} -c:v copy -c:a copy "{target}.mp4"')
    subprocess.call(f'ffmpeg -ss {start} -i "{url}" -t {duration} -c:v copy -c:a copy "{target}.mp4"')
    eel.complete(f'{target}.mp4 - saved')()

eel.start('main.html', size=(600, 700), position=(400, 200))
