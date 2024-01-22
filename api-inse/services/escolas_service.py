from banco_dados.search_sql import SearchSQL

class EscolasService:

    def get_escolas(self,estado):

        sql_query = "SELECT DISTINCT \"NO_ESCOLA\" FROM data_inse WHERE \"UF\" = \'" + estado + "\';"
        query_results = SearchSQL.read_data_from_postgres(sql_query)
        escolas = []

        if query_results:
            for row in query_results:
                escolas.append(str(row)
                               .replace("(\"", "").replace("('", "")
                               .replace("\",)", "").replace("',)", "")
                               )
        else:
            print("No results found.")

        return escolas

    def get_infos_escola(self, estado, escola):

        sql_query = "SELECT \"NO_MUNICIPIO\", \"TP_TIPO_REDE\", \"TP_LOCALIZACAO\", \"TP_CAPITAL\", \"QTD_ALUNOS_INSE\", \"MEDIA_INSE\", \"INSE_CLASSIFICACAO\", " \
                    "\"PC_NIVEL_1\", \"PC_NIVEL_2\", \"PC_NIVEL_3\", \"PC_NIVEL_4\", \"PC_NIVEL_5\", \"PC_NIVEL_6\", \"PC_NIVEL_7\", \"PC_NIVEL_8\" " \
                    "FROM data_inse " \
                    "WHERE \"UF\" = \'" + estado + "\' AND \"NO_ESCOLA\" = \'" + escola + "\';"

        query_results = SearchSQL.read_data_from_postgres(sql_query)[0]
        output = {}

        if query_results:
            output['municipio'] = query_results[0]
            output['rede'] = query_results[1]
            output['localizacao'] = query_results[2]
            output['capital'] = query_results[3]
            output['quantidade_alunos_inse'] = query_results[4]
            output['media'] = query_results[5]
            output['classificacao'] = query_results[6]
            output['nivel_1'] = query_results[7]
            output['nivel_2'] = query_results[8]
            output['nivel_3'] = query_results[9]
            output['nivel_4'] = query_results[10]
            output['nivel_5'] = query_results[11]
            output['nivel_6'] = query_results[12]
            output['nivel_7'] = query_results[13]
            output['nivel_8'] = query_results[14]
        else:
            print("No results found.")

        return output