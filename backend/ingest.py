import os
import fitz  # PyMuPDF
from langchain_core.documents import Document
from langchain_text_splitters import RecursiveCharacterTextSplitter


def load_documents(folder_path):
    """
    Read all PDFs and create LangChain Documents with metadata.
    """

    documents = []

    pdf_files = [
        f for f in os.listdir(folder_path)
        if f.endswith(".pdf")
    ]

    for pdf in pdf_files:

        pdf_path = os.path.join(folder_path, pdf)

        print(f"Reading {pdf}")

        doc = fitz.open(pdf_path)

        for page_number, page in enumerate(doc):

            text = page.get_text()

            if text.strip():

                documents.append(
                    Document(
                        page_content=text,
                        metadata={
                            "source": pdf,
                            "page": page_number + 1
                        }
                    )
                )

        doc.close()

    return documents


def split_documents(documents):

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=100
    )

    chunks = splitter.split_documents(documents)

    return chunks


if __name__ == "__main__":

    BASE_DIR = os.path.dirname(os.path.abspath(__file__))
    UPLOAD_FOLDER = os.path.join(BASE_DIR, "uploads")

    docs = load_documents(UPLOAD_FOLDER)

    chunks = split_documents(docs)

    print("=" * 70)
    print("Total Pages :", len(docs))
    print("Total Chunks :", len(chunks))
    print("=" * 70)

    print("\nExample Chunk:\n")

    print(chunks[0].page_content[:300])

    print("\nMetadata:")

    print(chunks[0].metadata)