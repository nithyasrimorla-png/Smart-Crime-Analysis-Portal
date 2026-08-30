import pandas as pd

file_path = r"C:\Users\Nithya\smart-crime-analysis-portal\data\processed\crime_data_cleaned.csv"

print("=" * 60)
print("SMART CRIME ANALYSIS PORTAL - DATA VALIDATION")
print("=" * 60)

df = pd.read_csv(file_path)

print("\n1. DATASET SIZE")
print("-" * 60)
print(f"Rows: {len(df)}")
print(f"Columns: {len(df.columns)}")

print("\n2. DUPLICATE IDs")
print("-" * 60)
print(f"Duplicate IDs: {df['id'].duplicated().sum()}")

print("\n3. DATE RANGE")
print("-" * 60)

df["date"] = pd.to_datetime(df["date"], errors="coerce")

print(f"Oldest date: {df['date'].min()}")
print(f"Newest date: {df['date'].max()}")

print("\n4. CRIME TYPES")
print("-" * 60)
print(df["primary_type"].value_counts().head(15))

print("\n5. DISTRICTS")
print("-" * 60)
print(f"Number of districts: {df['district'].nunique()}")

print("\n6. ARREST ANALYSIS")
print("-" * 60)
print(df["arrest"].value_counts())

print("\n7. DOMESTIC CRIME ANALYSIS")
print("-" * 60)
print(df["domestic"].value_counts())

print("\n8. MISSING VALUES")
print("-" * 60)
print(df.isnull().sum())

print("\n9. COORDINATE AVAILABILITY")
print("-" * 60)

valid_coordinates = df["latitude"].notna() & df["longitude"].notna()

print(f"Valid coordinates: {valid_coordinates.sum()}")
print(f"Missing coordinates: {(~valid_coordinates).sum()}")

print("\n10. TOP CRIME LOCATIONS")
print("-" * 60)
print(df["location_description"].value_counts().head(10))

print("\n" + "=" * 60)
print("DATA VALIDATION COMPLETED")
print("=" * 60)