import subprocess
import json


def ask_mistral(question):
    ollama_path = r"C:\Users\Nihar Gunaji Sawant\AppData\Local\Programs\Ollama\ollama.exe"

    process = subprocess.run(
        [ollama_path, "run", "mistral", question],
        capture_output=True,
        text=True,
        encoding="utf-8"   # Force UTF-8 decoding
    )

    return process.stdout.strip()

    try:
        output = json.loads(process.stdout)
        return output.get("completion", "")
    except json.JSONDecodeError:
        return "Error: Could not parse response."

if __name__ == "__main__":
    print("Type 'exit' or 'quit' to stop.")
    while True:
        q = input("You: ")
        if q.lower() in ["exit", "quit"]:
            break
        reply = ask_mistral(q)
        print("Mistral:", reply)
