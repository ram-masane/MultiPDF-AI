def build_vector_store():

    BASE_DIR = os.path.dirname(os.path.abspath(__file__))

    uploads_folder = os.path.join(BASE_DIR, "uploads")
    faiss_folder = os.path.join(BASE_DIR, "faiss_index")

    print("=" * 80)
    print("Loading Documents...")
    print("=" * 80)

    documents = load_documents(uploads_folder)

    print(f"Loaded Documents : {len(documents)}")

    print("=" * 80)
    print("Splitting Documents...")
    print("=" * 80)

    chunks = split_documents(documents)

    print(f"Total Chunks : {len(chunks)}")

    if len(chunks) == 0:
        print("❌ No chunks created!")
        return

    print("=" * 80)
    print("Loading Embedding Model...")
    print("=" * 80)

    embedding_model = get_embedding_model()

    print("=" * 80)
    print("Creating FAISS Vector Store...")
    print("=" * 80)

    print(f"Chunks to embed: {len(chunks)}")

    try:
        vector_store = FAISS.from_documents(
            documents=chunks,
            embedding=embedding_model
        )

        print("FAISS.from_documents completed successfully.")

    except Exception as e:
        print("ERROR while creating FAISS index:")
        print(repr(e))
        raise

    os.makedirs(faiss_folder, exist_ok=True)

    vector_store.save_local(faiss_folder)

    print("=" * 80)
    print("✅ FAISS Index Created Successfully!")
    print("=" * 80)