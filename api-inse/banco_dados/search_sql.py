import psycopg2

class SearchSQL:

    def read_data_from_postgres(query):

        db_config = {
            'host': 'localhost',
            'port': '5432',
            'database': 'inse',
            'user': 'postgres',
            'password': '1312'
        }

        global connection, cursor
        try:

            connection = psycopg2.connect(**db_config)
            cursor = connection.cursor()
            cursor.execute(query)
            results = cursor.fetchall()

            return results

        except Exception as e:
            print(f'Error: {e}')

        finally:
            # Close the cursor and connection
            if connection:
                cursor.close()
                connection.close()