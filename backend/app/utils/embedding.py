from sentence_transformers import SentenceTransformer
from qdrant_client import QdrantClient

model = SentenceTransformer('multi-qa-MiniLM-L6-cos-v1')  # or use 'all-MiniLM-L6-v2'
# client = QdrantClient(url="http://localhost:6333")
client = QdrantClient(host="qdrant", port=6333)


def getDocs(inp:str):
    inp_embedding = model.encode(inp)
    # print(operation_info)
    search_result = client.query_points(
        collection_name="scriptures",
        query=inp_embedding.tolist(),
        with_payload=True,
        limit=5
    ).points

    result = []
    for point in search_result:
        payload = point.payload
        if payload and "path" in payload:
            content = ""

            with open(payload["path"][7:],  "r") as f:
                content = f.readline()

            result.append({"path": payload["path"], "name" : content})
        else:
            result.append("No path found")

    return result
