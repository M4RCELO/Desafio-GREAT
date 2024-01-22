import pandas as pd
import psycopg2
from sqlalchemy import create_engine

# Replace these with your PostgreSQL database connection details
db_config = {
    'host': 'localhost',
    'port': '5432',
    'database': 'inse',
    'user': 'postgres',
    'password': '1312'
}

excel_file_path = 'INSE_2021_escolas_1.xlsx'
table_name = 'data_inse'

def write_excel_to_postgres(excel_path, table_name, db_config):
    try:
        # Read Excel file into a Pandas DataFrame
        df = pd.read_excel(excel_path)

        # Create a PostgreSQL database connection using SQLAlchemy
        engine = create_engine(f'postgresql://{db_config["user"]}:{db_config["password"]}@{db_config["host"]}:{db_config["port"]}/{db_config["database"]}')

        # Write DataFrame to PostgreSQL table
        df.to_sql(table_name, engine, index=False, if_exists='replace')

        print(f'Data from Excel file written to PostgreSQL table: {table_name}')

    except Exception as e:
        print(f'Error: {e}')


write_excel_to_postgres(excel_file_path, table_name, db_config)
