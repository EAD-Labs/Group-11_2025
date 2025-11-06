import sys
from youtube_transcript_api import YouTubeTranscriptApi, NoTranscriptFound
from youtube_transcript_api.proxies import GenericProxyConfig
import json
video_id = sys.argv[1]

try:
    # Try English first
    proxy_config = GenericProxyConfig(http_url="http://brd-customer-hl_3181ad46-zone-goqualify:3lcgog2ubf7o@brd.superproxy.io:33335",https_url="http://brd-customer-hl_3181ad46-zone-goqualify:3lcgog2ubf7o@brd.superproxy.io:33335")
    something = YouTubeTranscriptApi(proxy_config=proxy_config);
    transcript = something.get_transcript(video_id, languages=['en'])
    print(json.dumps(transcript))
except NoTranscriptFound:
    try:
        # Fallback to Hindi if English is not available
        transcript = YouTubeTranscriptApi.get_transcript(video_id, languages=['hi'])
        print(json.dumps(transcript))
    except NoTranscriptFound:
        print("No transcript available in English or Hindi for this video.")