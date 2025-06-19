from flask import Flask, render_template, jsonify
from transformers import pipeline
from apscheduler.schedulers.background import BackgroundScheduler
from collections import Counter
from textblob import TextBlob
import requests
import re

app = Flask(__name__)
summarizer = pipeline("summarization", model="sshleifer/distilbart-cnn-12-6")

API_KEY = "pub_309e141687284e298187739350cd3671"
latest_news = []

def clean_text(text):
    text = re.sub(r'http\S+', '', text)
    text = re.sub(r'[^A-Za-z\s]', '', text)
    return text.lower()

def fetch_news():
    global latest_news
    url = f"https://newsdata.io/api/1/news?apikey={API_KEY}&country=in&language=en&category=top"
    try:
        response = requests.get(url).json()
        latest_news = []

        for article in response.get("results", [])[:10]:
            title = article.get("title", "")
            content = article.get("description", "") or article.get("content", "")
            if content:
                summary = summarizer(content, max_length=60, min_length=10, do_sample=False)[0]['summary_text']
                cleaned = clean_text(content)
                sentiment = TextBlob(cleaned).sentiment.polarity
                if sentiment > 0.1:
                    sentiment_label = "positive"
                elif sentiment < -0.1:
                    sentiment_label = "negative"
                else:
                    sentiment_label = "neutral"
                latest_news.append({
                    "title": title,
                    "summary": summary,
                    "content": cleaned,
                    "sentiment": sentiment_label
                })
    except Exception as e:
        latest_news = [{"title": "Error fetching news", "summary": str(e), "sentiment": "neutral"}]

fetch_news()
scheduler = BackgroundScheduler()
scheduler.add_job(fetch_news, 'interval', seconds=60)
scheduler.start()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/stats')
def api_stats():
    sentiments = Counter([n['sentiment'] for n in latest_news])
    all_words = ' '.join([n['content'] for n in latest_news]).split()
    common_words = Counter(all_words).most_common(10)
    top_keywords = [word for word, _ in common_words]

    return jsonify({
        "sentiment": sentiments,
        "keywords": top_keywords,
        "top_news": latest_news[:5]
    })

if __name__ == '__main__':
    app.run(debug=True)