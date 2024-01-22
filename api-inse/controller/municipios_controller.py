from services.municipios_service import MunicipiosService

class MunicipiosController:

    def __init__(self):
        self.municipios_service = MunicipiosService()

    def get_inse_classificacao_municipio(self,estado, nivel):

        return self.municipios_service.get_inse_classificacao_municipio(estado, nivel)

    def get_municipios(self,estado):

        return self.municipios_service.get_municipios(estado)