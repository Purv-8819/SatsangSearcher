from qdrant_client import QdrantClient, models

client = QdrantClient(url="http://localhost:6333")

# client.create_collection(
#     collection_name="scriptures",
#     vectors_config=models.VectorParams(size=384, distance=models.Distance.COSINE),
# )

