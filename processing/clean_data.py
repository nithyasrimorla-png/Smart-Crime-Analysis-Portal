import pandas as pd
import os

# File paths
input_file = r"C:\Users\Nithya\smart-crime-analysis-portal\data\raw\query.csv"
output_file = r"C:\Users\Nithya\smart-crime-analysis-portal\data\processed\crime_data_cleaned.csv"

# Columns required by the Smart Crime Analysis Portal
required_columns = [
    "id",
    "case_number",
    "date",
    "block",
    "iucr",
    "primary_type",
    "description",
    "location_description",
    "arrest",
    "domestic",
    "beat",
    "district",
    "ward",
    "community_area",
    "fbi_code",
    "x_coordinate",
    "y_coordinate",
    "year",
    "updated_on",
    "latitude",
    "longitude",
    "location"
]

# Create processed directory if it doesn't exist
os.makedirs(os.path.dirname(output_file), exist_ok=True)

# Remove old processed file if it exists
if os.path.exists(output_file):
    os.remove(output_file)

print("=" * 60)
print("SMART CRIME ANALYSIS PORTAL - DATA CLEANING")
print("=" * 60)

total_rows = 0
total_duplicates = 0
total_missing_location = 0
first_chunk = True

# Process CSV in chunks
for chunk_number, df in enumerate(
    pd.read_csv(input_file, chunksize=50000),
    start=1
):
    print(f"\nProcessing chunk {chunk_number}...")

    original_rows = len(df)
    total_rows += original_rows

    # Keep only required columns
    df = df[required_columns].copy()

    # Remove duplicate crime IDs
    duplicates = df.duplicated(subset=["id"]).sum()
    total_duplicates += duplicates

    df = df.drop_duplicates(subset=["id"])

    # Convert date columns
    df["date"] = pd.to_datetime(df["date"], errors="coerce")
    df["updated_on"] = pd.to_datetime(df["updated_on"], errors="coerce")

    # Clean text columns
    text_columns = [
        "case_number",
        "block",
        "iucr",
        "primary_type",
        "description",
        "location_description",
        "fbi_code"
    ]

    for column in text_columns:
        df[column] = df[column].astype("string").str.strip()

    # Replace missing location descriptions
    missing_location = df["location_description"].isna().sum()
    total_missing_location += missing_location

    df["location_description"] = (
        df["location_description"].fillna("Unknown")
    )

    # Validate latitude and longitude
    df.loc[
        (df["latitude"] < -90) | (df["latitude"] > 90),
        "latitude"
    ] = pd.NA

    df.loc[
        (df["longitude"] < -180) | (df["longitude"] > 180),
        "longitude"
    ] = pd.NA

    # Write cleaned chunk
    df.to_csv(
        output_file,
        mode="w" if first_chunk else "a",
        header=first_chunk,
        index=False
    )

    first_chunk = False

    print(f"Rows in chunk: {original_rows}")
    print(f"Duplicates removed: {duplicates}")
    print(f"Cleaned rows: {len(df)}")

print("\n" + "=" * 60)
print("DATA CLEANING COMPLETED")
print("=" * 60)

print(f"Total rows processed: {total_rows}")
print(f"Duplicate IDs removed: {total_duplicates}")
print(f"Missing location descriptions handled: {total_missing_location}")
print(f"Output file: {output_file}")

print("=" * 60)