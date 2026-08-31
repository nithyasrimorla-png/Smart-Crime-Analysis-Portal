import pandas as pd
import psycopg2
from psycopg2.extras import execute_values
from pathlib import Path
import time

# ============================================================
# SMART CRIME ANALYSIS PORTAL - SUPABASE DATA UPLOAD
# ============================================================

# Put your Supabase database password here
DB_PASSWORD = "Nithyasri18"

DB_CONFIG = {
    "host": "aws-0-ap-south-1.pooler.supabase.com",
    "port": 5432,
    "database": "postgres",
    "user": "postgres.vubslheftdnyhabuzdyj",
    "password": DB_PASSWORD,
    "sslmode": "require",
    "connect_timeout": 30
}

# ============================================================
# FILE CONFIGURATION
# ============================================================

CSV_FILE = (
    Path(__file__).parent.parent
    / "data"
    / "processed"
    / "crime_data_cleaned.csv"
)

# Number of rows uploaded at a time
BATCH_SIZE = 5000

# ============================================================
# INTEGER COLUMNS
# ============================================================

INTEGER_COLUMNS = {
    "id",
    "beat",
    "district",
    "ward",
    "community_area",
    "year"
}

# ============================================================
# DATABASE CONNECTION
# ============================================================

def connect_database():

    while True:

        try:
            print("Connecting to Supabase...")

            conn = psycopg2.connect(**DB_CONFIG)

            conn.autocommit = False

            print("Connection successful!")

            return conn

        except psycopg2.OperationalError as e:

            print("\nConnection failed.")
            print(e)
            print("Retrying in 10 seconds...\n")

            time.sleep(10)


# ============================================================
# VALUE CLEANING
# ============================================================

def clean_value(column, value):

    # Handle pandas missing values
    if pd.isna(value):
        return None

    # Integer columns
    if column in INTEGER_COLUMNS:

        try:
            return int(float(value))

        except (ValueError, TypeError):
            # Invalid values such as "{", empty strings, etc.
            return None

    return value


# ============================================================
# DATABASE CONNECTION
# ============================================================

conn = connect_database()
cursor = conn.cursor()

total_processed = 0
total_skipped = 0

# ============================================================
# UPLOAD PROCESS
# ============================================================

try:

    for batch_number, df in enumerate(
        pd.read_csv(
            CSV_FILE,
            chunksize=BATCH_SIZE,
            low_memory=False
        ),
        start=1
    ):

        print("\n" + "=" * 60)
        print(f"Processing batch {batch_number}...")
        print(f"Rows in batch: {len(df)}")
        print("=" * 60)

        records = []

        skipped_in_batch = 0

        # ----------------------------------------------------
        # CLEAN RECORDS
        # ----------------------------------------------------

        for row in df.itertuples(index=False, name=None):

            record = tuple(
                clean_value(column, value)
                for column, value in zip(df.columns, row)
            )

            # ------------------------------------------------
            # ID IS REQUIRED
            # ------------------------------------------------

            if record[0] is None:

                skipped_in_batch += 1
                total_skipped += 1

                continue

            records.append(record)

        # ----------------------------------------------------
        # REPORT SKIPPED ROWS
        # ----------------------------------------------------

        if skipped_in_batch > 0:

            print(
                f"Skipped rows with missing/invalid ID: "
                f"{skipped_in_batch}"
            )

        # ----------------------------------------------------
        # NOTHING TO UPLOAD
        # ----------------------------------------------------

        if not records:

            print("No valid records in this batch.")
            continue

        # ----------------------------------------------------
        # UPLOAD WITH RETRY
        # ----------------------------------------------------

        while True:

            try:

                execute_values(
                    cursor,
                    """
                    INSERT INTO crimes (
                        id,
                        case_number,
                        date,
                        block,
                        iucr,
                        primary_type,
                        description,
                        location_description,
                        arrest,
                        domestic,
                        beat,
                        district,
                        ward,
                        community_area,
                        fbi_code,
                        x_coordinate,
                        y_coordinate,
                        year,
                        updated_on,
                        latitude,
                        longitude,
                        location
                    )
                    VALUES %s
                    ON CONFLICT (id) DO NOTHING
                    """,
                    records,
                    page_size=1000
                )

                conn.commit()

                total_processed += len(records)

                print("Batch completed.")
                print(
                    f"Valid rows processed: {total_processed}"
                )

                if total_skipped > 0:
                    print(
                        f"Invalid/missing ID rows skipped: "
                        f"{total_skipped}"
                    )

                break

            # ------------------------------------------------
            # CONNECTION ERROR
            # ------------------------------------------------

            except psycopg2.OperationalError as e:

                print("\nConnection lost.")
                print("Rolling back...")
                print("Reconnecting in 10 seconds...")

                try:
                    conn.rollback()
                except:
                    pass

                try:
                    cursor.close()
                except:
                    pass

                try:
                    conn.close()
                except:
                    pass

                time.sleep(10)

                conn = connect_database()
                cursor = conn.cursor()

            # ------------------------------------------------
            # OTHER DATABASE ERROR
            # ------------------------------------------------

            except psycopg2.Error as e:

                try:
                    conn.rollback()
                except:
                    pass

                print("\nDATABASE ERROR:")
                print(e)

                raise

# ============================================================
# GENERAL ERROR HANDLING
# ============================================================

except Exception as e:

    print("\n" + "=" * 60)
    print("UPLOAD ERROR")
    print("=" * 60)
    print(e)
    print("=" * 60)

    try:
        conn.rollback()
    except:
        pass

    try:
        cursor.close()
    except:
        pass

    try:
        conn.close()
    except:
        pass

    raise

# ============================================================
# SUCCESS
# ============================================================

else:

    try:
        cursor.close()
    except:
        pass

    try:
        conn.close()
    except:
        pass

    print("\n" + "=" * 60)
    print("UPLOAD COMPLETED SUCCESSFULLY")
    print("=" * 60)
    print(f"Valid rows processed: {total_processed}")
    print(f"Rows skipped due to invalid/missing ID: {total_skipped}")
    print("=" * 60)