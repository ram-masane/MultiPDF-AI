import os

from langchain_community.vectorstores import FAISS
from embeddings import get_embedding_model


def get_retriever():

    embedding_model = get_embedding_model()

    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    FAISS_PATH = os.path.join(BASE_DIR, "faiss_index")

    vector_store = FAISS.load_local(
        FAISS_PATH,
        embedding_model,
        allow_dangerous_deserialization=True
    )

    retriever = vector_store.as_retriever(
        search_kwargs={"k": 3}
    )

    return retriever


if __name__ == "__main__":

    retriever = get_retriever()

    docs = retriever.invoke("What is Mechanics?")

    print("=" * 80)

    for i, doc in enumerate(docs):

        print(f"\nResult {i+1}\n")
        print(doc.page_content)