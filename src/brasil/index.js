import {
  Alert,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import "./style.css";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import States from "../states";
import moment from "moment";

function Brasil() {
  const [brasilCases, setBrasilCases] = useState();
  const [allStatesBr, setAllStatesBr] = useState();

  const [states, setStates] = useState("");
  const [dateBr, setDateBr] = useState();

  //essa função serve para pegar qualquer atualização do select de estados, que por sua vez ao ser alterado dispara o useEffect que refaz as requisições à api
  const handleChange = (event) => {
    setStates(event.target.value);
    setDateBr(undefined);
  };

  //essa função fica escutando as alterações no campo date que por sua vez dispara o useEffect que refaz as requisições à api
  const dateCnage = (event) => {
    const newDate = moment(new Date(event.target.value)).add(1, 'days').format("YYYYMMDD");
    setDateBr(newDate);
  };

  //aqui acontece toda magica da tela, por esse useEffect validamos se as variaveis para fazer a requisição estão corretamentes preenchidas, após devidas validações as consultas à api são feitas e preenche os devidos 'states' para popular a tela
  useEffect(() => {
    api.get("brazil/").then((response) => setBrasilCases(response.data.data));
    if (
      dateBr !== "" &&
      dateBr !== null &&
      dateBr !== undefined &&
      dateBr !== "Invalid date"
    ) {
      api
        .get(`brazil/${dateBr}`)
        .then((response) => setAllStatesBr(response.data.data));
    } else {
      setAllStatesBr([]);
      if (states === "todos" && states !== null && states !== "") {
        api.get("").then((response) => setAllStatesBr(response.data.data));
      } else if (states !== null && states !== "") {
        api
          .get(`brazil/uf/${states}`)
          .then((response) => setAllStatesBr([response.data]));
      }
    }
  }, [states, dateBr]);

  const uf = [
    "todos",
    "AC",
    "AL",
    "AP",
    "AM",
    "BA",
    "CE",
    "ES",
    "GO",
    "MA",
    "MT",
    "MS",
    "MG",
    "PA",
    "PB",
    "PR",
    "PE",
    "PI",
    "RJ",
    "RN",
    "RS",
    "RO",
    "RR",
    "SC",
    "SP",
    "SE",
    "TO",
    "DF",
  ];

  return (
    <div className="contentBrasil">
      <div className="header">
        <Card sx={{ minWidth: 275, minHeight: 210 }} className="cardCases">
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              Numeros da covid no {brasilCases?.country}:
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Casos confirmados:{" "}
              {brasilCases?.confirmed?.toLocaleString("pt-BR")}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Mortes: {brasilCases?.deaths?.toLocaleString("pt-BR")}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Ultima atualização:{" "}
              {new Date(brasilCases?.updated_at)?.toLocaleDateString("pt-Br")}
            </Typography>
          </CardContent>
        </Card>
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="warning" className="alert">
            <Typography variant="h6" component="div" gutterBottom>
              Atenção:
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              O covid-19 ainda está por ai, todo cuidado é pouco, caso sinta
              algum sintoma como:
              <b>
                tosse, dor de garganta, coriza, febre, falta de ar, desconforto
                respiratório e dificuldade para se alimentar vá ao médico
              </b>
              , juntos vamos vencer mais essa batalha!
            </Typography>
          </Alert>
        </Stack>
      </div>
      <div className="states">
        <Typography variant="h5" component="div" gutterBottom>
          Veja também por cada estado:
        </Typography>
        <FormControl fullWidth className="formStates">
          <InputLabel id="demo-simple-select-label">Estados</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={states}
            label="Estados"
            className="selectUf"
            onChange={handleChange}
          >
            {uf.map((uf, index) => (
              <MenuItem value={uf} key={index}>
                {uf}
              </MenuItem>
            ))}
          </Select>
          <Typography variant="h6">ou por data</Typography>
          <input type="date" className="inputDate" onChange={dateCnage} />
        </FormControl>
        {allStatesBr !== undefined ? (
          <States allStates={allStatesBr} />
        ) : (
          <Typography variant="h5" component="div" gutterBottom>
            Não encontramos dados ainda nessa data ou nesse estado, por favor altere o valor de algum dos campos acima para verificar os dados sobre covid-19:
          </Typography>
        )}
      </div>
    </div>
  );
}
export default Brasil;
