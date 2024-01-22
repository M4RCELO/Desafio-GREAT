import React, { useState, useEffect, useRef } from 'react';
import PieChart from './chart/piechart';
import { CircularProgress } from '@material-ui/core';
import './App.css'

const App = () => {

  const [chartDataEstados, setChartDataEstados] = useState(null);
  const [chartDataMunicipios, setChartDataMunicipios] = useState(null);
  const initialized = useRef(false)
  const [loading, setLoading] = useState(true);
  const [loadingEstados, setLoadingEstados] = useState(false);
  const [loadingMunicipios, setLoadingMunicipios] = useState(false);
  const [tableData, setTableData] = useState();
  const [error, setError] = useState(null);

  const [selectedNivelEstado, setSelectedNivelEstado] = useState('Nível IV');
  const [selectedNivelMunicipio, setSelectedNivelMunicipio] = useState('Nível IV');
  const [selectedEstadoMunicipio, setSelectedEstadoMunicipio] = useState('RO');
  const [selectedEstadoEscola, setSelectedEstadoEscola] = useState('RO');
  const [selectedEscolas, setSelectedEscolas] = useState('EMEIF NOVA FLORESTA');
  const [listaEscolas, setListaEscolas] = useState('');

  const handleChangeNivelEstado = (event) => {
    setSelectedNivelEstado(event.target.value);
    updateNivelEstados(event.target.value)
  };

  const handleChangeNivelMunicipio = (event) => {
    setSelectedNivelMunicipio(event.target.value);
    updateNivelMunicipios(selectedEstadoMunicipio,event.target.value)
  };

  const handleChangeEstadoMunicipio = (event) => {
    setSelectedEstadoMunicipio(event.target.value);
    updateNivelMunicipios(event.target.value,selectedNivelMunicipio)
  };

  const handleChangeEstadoEscola = (event) => {
    setSelectedEstadoEscola(event.target.value);
    updateEscolasEstados(event.target.value)
  };

  const handleChangeEscolas = (event) => {
    setSelectedEscolas(event.target.value);
  };

  const updateNivelEstados = async (nivel) => {
    setLoadingEstados(true)
    const responseEstados = await fetch('http://127.0.0.1:5000/estados/'+nivel); // Replace with your API endpoint
    if (!responseEstados.ok) {
      throw new Error('Network response was not ok');
    }
    const resultEstados = await responseEstados.json();
    setChartDataEstados({
      labels: Object.keys(resultEstados),
      values: Object.values(resultEstados),
    })
    setLoadingEstados(false)
  }

  const updateNivelMunicipios = async (estado,nivel) => {
    setLoadingMunicipios(true)
    const responseMunicipios = await fetch('http://127.0.0.1:5000/municipios/'+estado+'/'+nivel); // Replace with your API endpoint
    if (!responseMunicipios.ok) {
      throw new Error('Network response was not ok');
    }
    const resultMunicipios = await responseMunicipios.json();
    setChartDataMunicipios({
      labels: Object.keys(resultMunicipios),
      values: Object.values(resultMunicipios),
    })
    setLoadingMunicipios(false)
  }

  const updateEscolasEstados = async (estado) => {
    const responseEscolas = await fetch('http://127.0.0.1:5000/escolas/'+estado); // Replace with your API endpoint
    if (!responseEscolas.ok) {
      throw new Error('Network response was not ok');
    }
    const resultEscolas = await responseEscolas.json();
    console.log(resultEscolas)
    setListaEscolas(resultEscolas)
  }

  const searchEscola = async () => {
    const infoEscolas = await fetch('http://127.0.0.1:5000/escolas/'+selectedEstadoEscola+'/'+selectedEscolas); // Replace with your API endpoint
    if (!infoEscolas.ok) {
      throw new Error('Network response was not ok');
    }
    const resultinfoEscolas = await infoEscolas.json();
    if(resultinfoEscolas['rede']==1)resultinfoEscolas['rede'] = "Federal"
    if(resultinfoEscolas['rede']==2)resultinfoEscolas['rede'] = "Estadual"
    if(resultinfoEscolas['rede']==3)resultinfoEscolas['rede'] = "Municipal"

    if(resultinfoEscolas['localizacao']==1)resultinfoEscolas['localizacao'] = "Urbana"
    if(resultinfoEscolas['localizacao']==2)resultinfoEscolas['localizacao'] = "Rural"

    if(resultinfoEscolas['capital']==1)resultinfoEscolas['capital'] = "Capital"
    if(resultinfoEscolas['capital']==2)resultinfoEscolas['capital'] = "Interior"

    setTableData(resultinfoEscolas)
  }
    

  useEffect(() => {

    if (!initialized.current) {
      initialized.current = true
      const fetch1 = async () => {
        try {
          const responseEstados = await fetch('http://127.0.0.1:5000/estados/'+selectedNivelEstado); // Replace with your API endpoint
          
          const responseMunicipios = await fetch('http://127.0.0.1:5000/municipios/'+selectedEstadoMunicipio+'/'+selectedNivelMunicipio); // Replace with your API endpoint
          
          const responseEscolas = await fetch('http://127.0.0.1:5000/escolas/'+selectedEstadoEscola); // Replace with your API endpoint

          const infoEscolas = await fetch('http://127.0.0.1:5000/escolas/'+selectedEstadoEscola+'/'+selectedEscolas); // Replace with your API endpoint
          
          const resultinfoEscolas = await infoEscolas.json();

          setTableData(resultinfoEscolas)
          
          if (!responseEstados.ok || !responseMunicipios.ok) {
            throw new Error('Network response was not ok');
          }
          const resultEstados = await responseEstados.json();
          setChartDataEstados({
            labels: Object.keys(resultEstados),
            values: Object.values(resultEstados),
          })
          const resultMunicipios = await responseMunicipios.json();
          setChartDataMunicipios({
            labels: Object.keys(resultMunicipios),
            values: Object.values(resultMunicipios),
          })
          const resultEscolas = await responseEscolas.json();
          setListaEscolas(resultEscolas)
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }

      };

      fetch1();
    }
    
  }, []); 

  if (loading) {
    return(
      <div className="centered-container">
        <div className="centered-content">
          <CircularProgress/>
        </div>
      </div>
    )
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div className='centered-container'>
      <div className='centered-content' style={{paddingTop:300}}>
        <h1>Desafio Desenvolvedor Full Stack</h1>
        <div className='row-container'>
          <div style={{width:500}}>
          <h1>{"Estados - "+selectedNivelEstado}</h1>
            <select id="mySelect" value={selectedNivelEstado} onChange={handleChangeNivelEstado}>
              <option value="Nível I">Nível I</option>
              <option value="Nível II">Nível II</option>
              <option value="Nível III">Nível III</option>
              <option value="Nível IV">Nível IV</option>
              <option value="Nível V">Nível V</option>
              <option value="Nível VI">Nível VI</option>
              <option value="Nível VII">Nível VII</option>
              <option value="Nível VIII">Nível VIII</option>
            </select>
            <br></br><br></br>
            {loadingEstados ? <CircularProgress/> : <PieChart data={chartDataEstados} /> }       
          </div>
          <div style={{width:500}}>
            <h1>{"Municipios - "+selectedEstadoMunicipio+" - "+selectedNivelMunicipio}</h1>
            <div className='row-container-junto'>
              <select id="mySelect" value={selectedEstadoMunicipio} onChange={handleChangeEstadoMunicipio}>
                <option value="RS">RS</option>
                <option value="SC">SC</option>
                <option value="DF">DF</option>
                <option value="MG">MG</option>
                <option value="SP">SP</option>
                <option value="RN">RN</option>
                <option value="GO">GO</option>
                <option value="AM">AM</option>
                <option value="PA">PA</option>
                <option value="PE">PE</option>
                <option value="PB">PB</option>
                <option value="ES">ES</option>
                <option value="AP">AP</option>
                <option value="TO">TO</option>
                <option value="MT">MT</option>
                <option value="PR">PR</option>
                <option value="PI">PI</option>
                <option value="RR">RR</option>
                <option value="BA">BA</option>
                <option value="CE">CE</option>
                <option value="RJ">RJ</option>
                <option value="AC">AC</option>
                <option value="MA">MA</option>
                <option value="AL">AL</option>
                <option value="RO">RO</option>
                <option value="MS">MS</option>
                <option value="SE">SE</option>
              </select>
              <select id="mySelect" value={selectedNivelMunicipio} onChange={handleChangeNivelMunicipio}>
                <option value="Nível I">Nível I</option>
                <option value="Nível II">Nível II</option>
                <option value="Nível III">Nível III</option>
                <option value="Nível IV">Nível IV</option>
                <option value="Nível V">Nível V</option>
                <option value="Nível VI">Nível VI</option>
                <option value="Nível VII">Nível VII</option>
                <option value="Nível VIII">Nível VIII</option>
              </select>
            </div>
            <br></br>
            {loadingMunicipios ? <CircularProgress/> : <PieChart data={chartDataMunicipios} /> }
          </div>
        </div>
        <br></br><br></br>
        <h1>Informações das Escolas</h1>
        <div className='row-container-junto'>
          <select id="mySelect" value={selectedEstadoEscola} onChange={handleChangeEstadoEscola}>
            <option value="RS">RS</option>
            <option value="SC">SC</option>
            <option value="DF">DF</option>
            <option value="MG">MG</option>
            <option value="SP">SP</option>
            <option value="RN">RN</option>
            <option value="GO">GO</option>
            <option value="AM">AM</option>
            <option value="PA">PA</option>
            <option value="PE">PE</option>
            <option value="PB">PB</option>
            <option value="ES">ES</option>
            <option value="AP">AP</option>
            <option value="TO">TO</option>
            <option value="MT">MT</option>
            <option value="PR">PR</option>
            <option value="PI">PI</option>
            <option value="RR">RR</option>
            <option value="BA">BA</option>
            <option value="CE">CE</option>
            <option value="RJ">RJ</option>
            <option value="AC">AC</option>
            <option value="MA">MA</option>
            <option value="AL">AL</option>
            <option value="RO">RO</option>
            <option value="MS">MS</option>
            <option value="SE">SE</option>
          </select>
          <select id="mySelect" value={selectedEscolas} onChange={handleChangeEscolas}>
            {listaEscolas.map((item,index) => (
              <option value={listaEscolas[index]}>{listaEscolas[index]}</option>
            ))}
          </select>
          <button onClick={searchEscola}>search</button>
        </div>
        <br></br>
        <div className="beautiful-table">
            <table>
              <thead>
                <tr>
                  <th>Município</th>
                  <th>Rede</th>
                  <th>Localização</th>
                  <th>Capital</th>
                  <th>Quantidade de Alunos INSE</th>
                  <th>Média</th>
                  <th>Classificação</th>
                  <th>Nível 1</th>
                  <th>Nível 2</th>
                  <th>Nível 3</th>
                  <th>Nível 4</th>
                  <th>Nível 5</th>
                  <th>Nível 6</th>
                  <th>Nível 7</th>
                  <th>Nível 8</th>
                </tr>
              </thead>
              <tbody>
                <tr key={selectedEscolas}>
                  <td>{tableData['municipio']}</td>
                  <td>{tableData['rede']}</td>
                  <td>{tableData['localizacao']}</td>
                  <td>{tableData['capital']}</td>
                  <td>{tableData['quantidade_alunos_inse']}</td>
                  <td>{tableData['media']}</td>
                  <td>{tableData['classificacao']}</td>
                  <td>{tableData['nivel_1']}</td>
                  <td>{tableData['nivel_2']}</td>
                  <td>{tableData['nivel_3']}</td>
                  <td>{tableData['nivel_4']}</td>
                  <td>{tableData['nivel_5']}</td>
                  <td>{tableData['nivel_6']}</td>
                  <td>{tableData['nivel_7']}</td>
                  <td>{tableData['nivel_8']}</td>
                </tr>
              </tbody>
            </table>
          </div>
      </div>
    </div>
  );
};

export default App;
