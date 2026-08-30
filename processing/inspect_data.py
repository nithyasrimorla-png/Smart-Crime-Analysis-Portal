import pandas as pd
import os

# Path to the raw dataset
file_path = r"C:\Users\Nithya\smart-crime-analysis-portal\data\raw\query.csv"

print("=" * 60)
print("SMART CRIME ANALYSIS PORTAL - DATASET INSPECTION")
print("=" * 60)

# Read only the first 10,000 rows for initial inspection
df = pd.read_csv(file_path, nrows=10000)

print("\n1. SAMPLE ROW COUNT")
print("-" * 60)
print(f"Rows loaded: {len(df)}")

print("\n2. COLUMN NAMES")
print("-" * 60)

for i, column in enumerate(df.columns, start=1):
    print(f"{i}. {column}")

print("\n3. DATA TYPES")
print("-" * 60)
print(df.dtypes)

print("\n4. FIRST 5 RECORDS")
print("-" * 60)
print(df.head())

print("\n5. MISSING VALUES")
print("-" * 60)
print(df.isnull().sum())

print("\n6. DUPLICATE RECORDS IN SAMPLE")
print("-" * 60)
print(f"Duplicates: {df.duplicated().sum()}")

print("\n7. DATASET MEMORY USAGE")
print("-" * 60)
memory_mb = df.memory_usage(deep=True).sum() / (1024 * 1024)
print(f"Sample memory usage: {memory_mb:.2f} MB")

print("\n8. BASIC INFORMATION")
print("-" * 60)
print(df.info())

print("\n" + "=" * 60)
print("INSPECTION COMPLETED")
print("=" * 60)