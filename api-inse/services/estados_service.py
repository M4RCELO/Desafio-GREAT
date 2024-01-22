from banco_dados.search_sql import SearchSQL

class EstadosService:

    def get_uf(self):

        sql_query = "SELECT DISTINCT \"UF\" FROM data_inse;"
        query_results = SearchSQL.read_data_from_postgres(sql_query)
        estados = []

        if query_results:
            for row in query_results:
                estados.append(str(row).replace("('", "").replace("',)", ""))
        else:
            print("No results found.")

        return estados

    def get_inse_classificacao_estado(self,classificacao):

        output = {}

        for i in self.get_uf():
            sql_query = "SELECT * FROM data_inse WHERE \"INSE_CLASSIFICACAO\" = \'" + classificacao + "\' AND \"UF\" = \'" + i + "\';"
            query_results = SearchSQL.read_data_from_postgres(sql_query)
            output[i] = len(query_results)

        return output