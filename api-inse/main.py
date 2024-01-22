from flask import Flask
from flask_cors import CORS
from controller.estados_controller import EstadosController
from controller.municipios_controller import MunicipiosController
from controller.escolas_controller import EscolasController

estados_controller_instance = EstadosController()
municipios_controller_instance = MunicipiosController()
escolas_controller_instance = EscolasController()

app = Flask(__name__)
CORS(app)

app.add_url_rule('/estados', view_func=estados_controller_instance.get_ufs)
app.add_url_rule('/estados/<nivel>', view_func=estados_controller_instance.get_inse_classificacao_estados)

app.add_url_rule('/municipios/<estado>', view_func=municipios_controller_instance.get_municipios)
app.add_url_rule('/municipios/<estado>/<nivel>', view_func=municipios_controller_instance.get_inse_classificacao_municipio)

app.add_url_rule('/escolas/<estado>', view_func=escolas_controller_instance.get_escolas)
app.add_url_rule('/escolas/<estado>/<escola>', view_func=escolas_controller_instance.get_infos_escola)

if __name__ == '__main__':
    app.run()