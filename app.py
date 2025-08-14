# app.py
from flask import Flask, render_template, request, jsonify
from mistral import ask_mistral  # Keep your mistral.py as is

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message", "").strip()

    if not user_message:
        return jsonify({"reply": "Please type a message."})

    try:
        reply = ask_mistral(user_message)  # Call your existing Mistral function
    except Exception as e:
        reply = f"Error: {str(e)}"

    return jsonify({"reply": reply})

if __name__ == "__main__":
    app.run(debug=True)
