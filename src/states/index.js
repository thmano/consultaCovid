
import { Card, CardContent, Typography } from "@mui/material"
import "./style.css"

//essa tela recebe os dados da api para popular a consulta de todos estados ou algum em especifico 
function States({allStates}){
    return(
        <div className="statesCases">
        {allStates?.map((state, index) => (
          <Card
            key={index}
            sx={{ minWidth: 275, minHeight: 210 }}
            className="cardCases"
          >
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                Numeros da covid no {state?.state}:
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Casos confirmados: {state?.cases.toLocaleString("pt-BR")}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Casos suspeitos: {state?.suspects.toLocaleString("pt-BR")}
              </Typography>
              
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Mortes: {state?.deaths.toLocaleString("pt-BR")}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Ultima atualização:{" "}
                {new Date(state?.datetime).toLocaleDateString("pt-Br")}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    )
}
export default States