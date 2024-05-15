import { Card, CardContent, Typography } from "@mui/material"
import "./style.css"
import { useEffect, useState } from "react"
import { api } from "../services/api";

function Countries(){
    const [allcountries, setAllcountries] = useState()

    useEffect(() => {
        api.get("countries/").then((response) => setAllcountries(response.data.data));
      }, []);

    return(
        <div className="countriesContainer"> 
        <Typography variant="h4">
            Lista de casos em todo o mundo:
        </Typography>
        <div className="listCases">
        {allcountries?.map((state, index) => (
          <Card
            key={index}
            sx={{ minWidth: 275, minHeight: 210 }}
            className="cardCases"
          >
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                Numeros da covid no {state?.country}:
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Casos confirmados: {state?.cases?.toLocaleString("pt-BR")}
              </Typography>
              
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Mortes: {state?.deaths?.toLocaleString("pt-BR")}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Ultima atualização:{" "}
                {new Date(state?.updated_at).toLocaleDateString("pt-Br")}
              </Typography>
            </CardContent>
          </Card>
        ))}
        </div>
        </div>
    )
}
export default Countries