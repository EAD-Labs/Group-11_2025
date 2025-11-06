import sys
from youtube_transcript_api import YouTubeTranscriptApi, NoTranscriptFound
import json
video_id = sys.argv[1]

try:
    # Try English first
    transcript = YouTubeTranscriptApi.get_transcript(video_id, languages=['en'])
    print(json.dumps(transcript))
except NoTranscriptFound:
    try:
        # Fallback to Hindi if English is not available
        transcript = YouTubeTranscriptApi.get_transcript(video_id, languages=['hi'])
        print(json.dumps(transcript))
    except NoTranscriptFound:
        print("No transcript available in English or Hindi for this video.")