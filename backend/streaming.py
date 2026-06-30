from langchain_groq import ChatGroq

from retriever import get_retriever
from dotenv import load_dotenv

load_dotenv()


def stream_answer(question):

    llm = ChatGroq(
        model="llama-3.3-70b-versatile",
        temperature=0,
        streaming=True,
    )

    retriever = get_retriever()

    docs = retriever.invoke(question)

    context = "\n\n".join(
        doc.page_content for doc in docs
    )

    prompt = f"""
You are MultiPDF AI, an intelligent study assistant.

Your job is to answer using ONLY the information available in the provided context.

Rules:

1. Never invent facts.
2. If the answer is not present in the context, reply exactly:
"I couldn't find that information in the uploaded PDFs."

3. Do NOT copy large paragraphs from the PDF.

4. Explain the answer in your own words.

5. Use Markdown formatting.

6. When applicable, structure your answer like this:

# Topic

## Definition
Explain clearly.

## Formula
Write formulas separately.

## Explanation
Explain the concept simply.

## Key Points
- Point 1
- Point 2
- Point 3

## Example
Give an example ONLY if supported by the context.

7. Keep answers concise unless the user requests detailed explanations.

Context:
--------------------
{context}
--------------------

Question:
{question}

Answer:
"""

    return llm.stream(prompt)