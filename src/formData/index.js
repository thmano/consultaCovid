import { useState } from "react";
import "./style.css";
import {
  Alert,
  Button,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import moment from "moment";

function FormData() {
  //states para receber os valores do formularios
  const [estados, setEstado] = useState("");
  const [casos, setCasos] = useState("");
  const [confirmados, setConfirmados] = useState("");
  const [mortes, setMortes] = useState("");
  const [recuperados, setRecuperados] = useState("");
  const [data, setDatas] = useState("");

  //states para validação de formulario
  const [estadosError, setEstadoError] = useState(false);
  const [casosError, setCasosError] = useState(false);
  const [confirmadosError, setConfirmadosError] = useState(false);
  const [mortesError, setMortesError] = useState(false);
  const [recuperadosError, setRecuperadosError] = useState(false);

  //state para exibir a menssagem de alerta de campos obrigatórios
  const [validatealert, setValidateAlert] = useState(false);

  //state para exibir a menssagem de data invalida
  const [dateAlertText, setDateAlertText] = useState(false);


  //essa função é responsavel pelo controle dos campos vazios ou invalidos, primeiro valido se os campos estão devidamente populados (o campo de data tem uma vaçidação diferente pois não usei o datepicker do material-ui, segundos minhas pesquisas esse input só esta disponivel para versão paga da biblioteca)
  function onSubmit(event) {
    event.preventDefault();
    let form;

    estados === "" ? setEstadoError(true) : setEstadoError(false);
    casos === "" ? setCasosError(true) : setCasosError(false);
    confirmados === "" ? setConfirmadosError(true) : setConfirmadosError(false);
    mortes === "" ? setMortesError(true) : setMortesError(false);
    recuperados === "" ? setRecuperadosError(true) : setRecuperadosError(false);
    data === ""
      ? (document.querySelector(".inputDateForm").style.border =
          "1px solid red")
      : (document.querySelector(".inputDateForm").style.border =
          "1px solid #b7b7b7");

    //aqui novamente verifico se os campos não estão vazios e além disso valido se o campo date não está com uma data futura, se todas validações passarem um objeto é montado e exibido no console do navegador
    if (
      estados === "" ||
      casos === "" ||
      confirmados === "" ||
      mortes === "" ||
      recuperados === "" ||
      data === ""
    ) {
      setValidateAlert(true);
    } else {
      var now = moment();
      var then = moment(data);

      if (now > then) {
        setDateAlertText(false);

        form = {
          country: estados,
          cases: casos,
          confirmed: confirmados,
          deaths: mortes,
          recovered: recuperados,
          updated_at: data,
        };
        console.log(form);
      } else {
        setDateAlertText(true);
      }
      setValidateAlert(false);
    }
  }

  const uf = [
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
    <div className="conteinerForm">
      {validatealert ? (
        <Stack spacing={2} width={"30%"} className="alertCampos">
          <Alert severity="error">
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              prencha todos os campos!
            </Typography>
          </Alert>
        </Stack>
      ) : (
        <></>
      )}
      <form onSubmit={onSubmit} className="formData">
        <TextField
          id="outlined-select-currency"
          select
          label="Estado"
          error={estadosError}
          variant="outlined"
          onChange={(event) => setEstado(event.target.value)}
          helperText={estadosError ? `Selecione um estado` : ""}
        >
          {uf.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          id="outlined-basic"
          label="Casos"
          variant="outlined"
          value={casos}
          error={casosError}
          inputProps={{ type: "number" }}
          onChange={(event) => setCasos(event.target.value)}
          helperText={casosError ? `digite apenas numeros` : ""}
        />
        <TextField
          variant="outlined"
          id="outlined-basic"
          label="Casos confirmados"
          value={confirmados}
          error={confirmadosError}
          inputProps={{ type: "number" }}
          onChange={(event) => setConfirmados(event.target.value)}
          helperText={confirmadosError ? `digite apenas numeros` : ""}
        />
        <TextField
          label="Mortes"
          variant="outlined"
          id="outlined-basic"
          value={mortes}
          error={mortesError}
          inputProps={{ type: "number" }}
          onChange={(event) => setMortes(event.target.value)}
          helperText={mortesError ? `digite apenas numeros` : ""}
        />
        <TextField
          id="outlined-basic"
          label="Recuperados"
          variant="outlined"
          value={recuperados}
          error={recuperadosError}
          inputProps={{ type: "number" }}
          onChange={(event) => setRecuperados(event.target.value)}
          helperText={recuperadosError ? `digite apenas numeros` : ""}
        />

        <input
          type="date"
          className="inputDateForm"
          onChange={(event) => setDatas(event.target.value)}
        />
        {dateAlertText ? (
          <div className="dateInvalid">
            A data não pode ser maior que a data de hoje!
          </div>
        ) : (
          <></>
        )}

        <Button type="submit" className="btn">
          Enviar
        </Button>
      </form>
    </div>
  );
}
export default FormData;
