import ollama

response = ollama.chat(model='llama2', messages=[
    {'role': 'user', 'content': 'What is pythnn programming language'}
])

print(response['message']['content'])

