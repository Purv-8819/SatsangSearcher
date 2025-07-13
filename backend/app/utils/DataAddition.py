from qdrant_client import QdrantClient, models
from qdrant_client.models import PointStruct
import os
from sentence_transformers import SentenceTransformer
import uuid



client = QdrantClient(url="http://localhost:6333")

model = SentenceTransformer('paraphrase-MiniLM-L6-v2')  # or use 'all-MiniLM-L6-v2'

# client.create_collection(
#     collection_name="scriptures",
#     vectors_config=models.VectorParams(size=384, distance=models.Distance.COSINE),
# )
# print(client.get_collection(collection_name="scriptures"))

directory: str = "backend/storage/Vachanamrut"
for entry in os.scandir(directory):  
    if entry.is_file():  # check if it's a file
         #Get the basic path and name
         path: str = entry.path
         print(entry.path)
         name: str = entry.name[:-4].replace("  ", " ")
         print(name)

         #Open the file and get the embedding
         with open(entry.path, "r") as file:
            lines = file.readlines()
         paragraph = " ".join(lines)
         
         paragraph_embedding = model.encode(paragraph)


         # Use UUID namespace for URLs as a base for path-based UUIDs
         namespace = uuid.NAMESPACE_URL 

         # Generate a UUID based on the file path using SHA-1 hashing
         pathUUID = uuid.uuid5(namespace, path)

         print(f"UUID for '{path}': {pathUUID}")



         operation_info = client.upsert(
               collection_name="scriptures",
               wait=True,
               points=[
                  PointStruct(id=pathUUID.__str__(), vector=paragraph_embedding.tolist(), payload={"name": name, "path": path}),
               ],
         )

         print()