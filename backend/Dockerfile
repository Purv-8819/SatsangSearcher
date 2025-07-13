# Use a slim Python image
FROM python:3.13

# Set working directory
WORKDIR /app

# Install system dependencies (optional but recommended for faster builds and PDF parsing)
RUN apt-get update && apt-get install -y \
   build-essential \
   poppler-utils \
   && rm -rf /var/lib/apt/lists/*

# Copy dependency file and install Python packages
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy app source code
COPY /app /app

# Copy storage folder (make sure your build context includes it)
COPY /storage /storage

# Expose FastAPI port
EXPOSE 8000

# Run FastAPI app
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]