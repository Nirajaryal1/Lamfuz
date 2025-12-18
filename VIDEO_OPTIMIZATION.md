# Video Optimization Guide for Lamfuz

To ensure your website remains fast while having a beautiful video background, follow these steps to compress your video.

## 1. Install FFmpeg
If you don't have it, you can install it via:
- **macOS**: `brew install ffmpeg`
- **Windows**: Download from [ffmpeg.org](https://ffmpeg.org/download.html)
- **Linux**: `sudo apt install ffmpeg`

## 2. Recommended Compression Commands

Replace `input.mp4` with your actual video filename.

### Create an Optimized MP4 (H.264)
This is the standard format for broad compatibility.
```bash
ffmpeg -i input.mp4 -vcodec libx264 -crf 28 -preset veryslow -an -vf scale=1920:-1 hero-bg.mp4
```
- `-crf 28`: Quality setting (23 is default, higher means smaller file/lower quality. 28 is a good balance for backgrounds).
- `-preset veryslow`: Better compression efficiency.
- `-an`: Removes audio (crucial for background videos).
- `-vf scale=1920:-1`: Scales to 1080p width while maintaining aspect ratio.

### Create a WebM (VP9) - Highly Recommended
WebM usually offers much better compression than MP4. Modern browsers will prefer this.
```bash
ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 35 -b:v 0 -an hero-bg.webm
```

### Create a Poster Image
A poster image is shown while the video is loading or if the video fails/is disabled.
```bash
ffmpeg -i input.mp4 -ss 00:00:01 -vframes 1 hero-poster.jpg
```

## 3. Where to put the files?
Place the generated files in:
- `public/assets/video/hero-bg.mp4`
- `public/assets/video/hero-bg.webm`
- `public/assets/images/hero-poster.jpg`

## 4. Why these settings?
- **No Audio**: Background videos should never have sound. Removing the audio track can reduce file size by up to 50%.
- **CRF (Constant Rate Factor)**: This ensures the video looks good throughout without wasting bits on simple scenes.
- **WebM + MP4**: Providing both ensures all users get the best possible compression their browser supports.
