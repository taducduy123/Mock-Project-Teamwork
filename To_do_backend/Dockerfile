FROM python:3.11-slim   

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    build-essential \
    libpq-dev \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*


# Copy requirements
COPY requirements ./requirements/
RUN pip install -r requirements/prod.txt \
    -r requirements/base.txt \
    -r requirements/dev.txt



# Copy application code
COPY . .

# Expose port
EXPOSE 8000

# Run the application
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]