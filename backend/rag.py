from dotenv import load_dotenv
load_dotenv()

from langchain_groq import ChatGroq
from retriever import get_retriever


llm = ChatGroq(
    model="llama-3.3-70b-versatile",
    temperature=0
)


def ask_pdf(question):

    # Load latest FAISS index every time
    retriever = get_retriever()

    docs = retriever.invoke(question)

    context = "\n\n".join(
        [doc.page_content for doc in docs]
    )

    prompt = f"""
You are an AI assistant.

Answer ONLY using the provided context.

If the answer is not available in the context,
reply:

"I couldn't find that information in the uploaded PDFs."

Context:

{context}

Question:

{question}

Answer:
"""

    response = llm.invoke(prompt)

    sources = []
    seen = set()

    for doc in docs:

        source = doc.metadata.get("source", "Unknown")
        page = doc.metadata.get("page", "?")

        key = (source, page)

        if key not in seen:
            seen.add(key)

            sources.append(
                {
                    "source": source,
                    "page": page
                }
            )

    return {
        "answer": response.content,
        "sources": sources
    }


if __name__ == "__main__":

    while True:

        question = input("\nAsk: ")

        if question.lower() == "exit":
            break

        result = ask_pdf(question)

        print("\nAnswer:\n")
        print(result["answer"])

        print("\nSources:\n")

        for source in result["sources"]:
            print(
                f'{source["source"]} | Page {source["page"]}'
            )