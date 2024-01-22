from banco_dados.search_sql import SearchSQL

class MunicipiosService:

    def get_municipios(self,estado):

        sql_query = "SELECT DISTINCT \"NO_MUNICIPIO\" FROM data_inse WHERE \"UF\" = \'" + estado + "\';"
        query_results = SearchSQL.read_data_from_postgres(sql_query)
        municipios = []

        if query_results:
            for row in query_results:
                municipios.append(str(row)
                                  .replace("(\"", "").replace("('", "")
                                  .replace("\",)", "").replace("',)", "")
                                  )
        else:
            print("No results found.")

        return municipios

    def get_inse_classificacao_municipio(self, estado, classificacao):

        output = {}

        for i in self.get_municipios(estado):
            municipio = i.replace("'", "''")
            sql_query = "SELECT * FROM data_inse WHERE \"INSE_CLASSIFICACAO\" = \'" + classificacao + "\' AND \"UF\" = \'" + estado + "\' AND \"NO_MUNICIPIO\" = \'" + municipio + "\';"
            query_results = SearchSQL.read_data_from_postgres(sql_query)
            output[i] = len(query_results)

        return output