from services.escolas_service import EscolasService

class EscolasController:

    def __init__(self):
        self.escolas_service = EscolasService()

    def get_infos_escola(self, estado, escola):

        return self.escolas_service.get_infos_escola(estado,escola)

    def get_escolas(self,estado):

        return self.escolas_service.get_escolas(estado)