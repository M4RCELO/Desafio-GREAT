from services.estados_service import EstadosService

class EstadosController:

    def __init__(self):
        self.estado_service = EstadosService()

    def get_inse_classificacao_estados(self,nivel):

        return self.estado_service.get_inse_classificacao_estado(nivel)

    def get_ufs(self):

        return self.estado_service.get_uf()