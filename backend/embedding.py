from sentence_transformers import SentenceTransformer


# Sentences we want sentence embeddings for
# sentences = ['This is an example sentence', 'Each sentence is converted']
# file = open("backend/storage/Vachanamrut/Vachanãmrut Amdãvãd  1  221.txt", "r")
# lines = file.readlines()
# paragraph = " ".join(lines)


model = SentenceTransformer('paraphrase-MiniLM-L6-v2')  # or use 'all-MiniLM-L6-v2'

inp = "How to do Bhakti"

# Get the embedding for the entire paragraph
# paragraph_embedding = model.encode(paragraph)
inp_embedding = model.encode(inp)

# Print the embedding
# print("Paragraph embedding:")
# print(paragraph_embedding)

from qdrant_client import QdrantClient, models
from qdrant_client.models import PointStruct

client = QdrantClient(url="http://localhost:6333")

# operation_info = client.upsert(
#     collection_name="scriptures",
#     wait=True,
#     points=[
#         PointStruct(id=2, vector=paragraph_embedding.tolist(), payload={"name": "Vachanãmrut Amdãvãd  1"}),
#     ],
# )

# print(operation_info)
search_result = client.query_points(
    collection_name="scriptures",
    query=inp_embedding.tolist(),
    with_payload=True,
    limit=1
).points

print(search_result)