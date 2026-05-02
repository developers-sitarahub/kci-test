"""
Run once to set the S3 CORS policy required for presigned-URL browser uploads.

Usage:
    cd backend
    python scripts/set_s3_cors.py
"""
import os
import sys
import json
import boto3
from pathlib import Path

# Load .env so we can pick up credentials locally
try:
    from dotenv import load_dotenv
    load_dotenv(Path(__file__).resolve().parent.parent / '.env')
except ImportError:
    pass

BUCKET  = os.environ['S3_BUCKET_NAME']
REGION  = os.environ.get('AWS_REGION', 'us-east-2')
KEY_ID  = os.environ['AWS_ACCESS_KEY_ID']
SECRET  = os.environ['AWS_SECRET_ACCESS_KEY']

CORS_RULES = {
    "CORSRules": [
        {
            # Allow the browser to PUT presigned-URL uploads from any origin.
            # Tighten AllowedOrigins to your actual domain in production.
            "AllowedHeaders": ["*"],
            "AllowedMethods": ["PUT", "GET", "HEAD"],
            "AllowedOrigins": ["*"],
            "ExposeHeaders":  ["ETag"],
            "MaxAgeSeconds":  3600,
        }
    ]
}

s3 = boto3.client(
    's3',
    region_name=REGION,
    aws_access_key_id=KEY_ID,
    aws_secret_access_key=SECRET,
)

s3.put_bucket_cors(
    Bucket=BUCKET,
    CORSConfiguration=CORS_RULES,
)

print(f"[OK] CORS policy applied to s3://{BUCKET}")
print(json.dumps(CORS_RULES, indent=2))
